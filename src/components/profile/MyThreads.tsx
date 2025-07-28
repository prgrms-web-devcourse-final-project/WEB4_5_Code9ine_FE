'use client';
import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
import PostWriteForm from '../board/PostWriteForm';
import ThreadsTab from './ThreadsTab';
import DetailBox from '../godplaces/detail/DetailBox';
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getMyThreads,
  getBookmarkedThreads,
  getBookmarkedPlaces,
  getUserProfile,
  getMyPage,
} from '@/api/profile';
import type { UserData } from '@/types/userType';
import { BookmarkPostData, Post } from '@/types/userType';
import { PostRes } from '../../types/boardType';
import TopButton from '../board/TopButton';
import Empty from './Empty';
interface ThreadsProps {
  profileData?: {
    nickname?: string;
    myPosts?: Post[];
    bookmarkedPosts?: Post[];
    bookmarkedPlaces?: {
      type: string;
      storeId?: string;
      festivalId?: string;
      libraryId?: string;
      name: string;
    }[];
    [key: string]: unknown;
  }; // 서버에서 받아온 프로필 데이터
  memberId?: string; // 유저 ID
}

export default function Threads({ profileData, memberId }: ThreadsProps) {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [userData, setUserData] = useState<
    ThreadsProps['profileData'] | UserData | null
  >(profileData || null);
  const [userDataLoading, setUserDataLoading] = useState(!profileData);
  const [userDataError, setUserDataError] = useState<string | null>(null);
  const [myData, setMyData] = useState<UserData | null>(null);
  const queryClient = useQueryClient();

  // 내 정보 가져오기 (memberId와 비교하기 위해)
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await getMyPage();
        setMyData(res.data.data);
      } catch (err) {
        console.log('내 정보 조회 실패', err);
      }
    };
    fetchMyData();
  }, []);

  // 내 프로필인지 판단
  const isMyProfile = Boolean(
    !memberId || (myData && String(myData.memberId) === String(memberId)),
  );

  // profileData가 있으면 바로 사용
  useEffect(() => {
    if (profileData && !isMyProfile) {
      setUserData(profileData);
      setUserDataLoading(false);
    }
  }, [profileData, isMyProfile, myData]); // myData 의존성 추가

  // 다른 유저 데이터 가져오기 (fallback, profileData가 없을 때만)
  const fetchUserData = async () => {
    if (!memberId || isMyProfile || profileData) return;

    try {
      setUserDataLoading(true);
      setUserDataError(null);

      console.log('Fetching user profile for memberId:', memberId);
      const res = await getUserProfile(memberId);
      console.log('User profile response:', res);

      const user = res.data?.data || res.data || res;
      setUserData(user);
    } catch (err) {
      console.error('프로필 데이터 에러:', err);
      setUserDataError('프로필을 불러올 수 없습니다.');
    } finally {
      setUserDataLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [memberId, isMyProfile, profileData, myData]); // myData 의존성 추가

  // 내가 쓴 글 (내 프로필일 때만)
  const {
    data: myThreads,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingMyThreads,
  } = useInfiniteQuery({
    queryKey: ['myThreads'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getMyThreads(pageParam, 10),
    getNextPageParam: (lastPage, pages) => {
      if (
        !lastPage?.data ||
        lastPage.data.length === 0 ||
        lastPage.data.length < 10
      ) {
        return undefined;
      }
      return pages.length;
    },
    initialPageParam: 0,
    enabled: Boolean(selectedTab === 'thread' && isMyProfile),
    // staleTime: 5 * 60 * 1000,
    // gcTime: 10 * 60 * 1000,
  });

  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        selectedTab === 'thread' &&
        isMyProfile
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage, selectedTab, isMyProfile],
  );

  useEffect(() => {
    const currentObserverRef = observerRef.current;
    if (!currentObserverRef || selectedTab !== 'thread' || !isMyProfile) {
      return;
    }

    if (!hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(currentObserverRef);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, handleObserver, selectedTab, fetchNextPage, isMyProfile]);

  // 찜한 글 (내 프로필일 때만)
  const { data: savedThreads, isLoading: isLoadingSaved } =
    useQuery<BookmarkPostData>({
      queryKey: ['saveThreads'],
      queryFn: getBookmarkedThreads,
      enabled: Boolean(selectedTab === 'saved' && isMyProfile),
    });

  // 찜한 갓플 (내 프로필일 때만)
  const { data: bookmarkedPlaces = [], isLoading: isLoadingBookmarked } =
    useQuery({
      queryKey: ['bookmarkedPlaces'],
      queryFn: getBookmarkedPlaces,
      enabled: Boolean(selectedTab === 'place' && isMyProfile),
      select: (res) =>
        res.data.map((item) => {
          let id = '';
          switch (item.type) {
            case 'store':
              id = item.storeId;
              break;
            case 'festival':
              id = item.festivalId;
              break;
            case 'library':
              id = item.libraryId;
              break;
          }
          return {
            type: item.type,
            id,
            name: item.name,
          };
        }),
    });

  // 표시할 데이터 추출
  const getDisplayData = () => {
    if (isMyProfile) {
      return {
        threads: getUniqueThreads(),
        savedThreads: savedThreads?.data || [],
        bookmarkedPlaces,
      };
    }

    // profileData 또는 userData 사용
    const data = profileData || userData;
    if (!data) return { threads: [], savedThreads: [], bookmarkedPlaces: [] };

    // 갓플 데이터 매핑
    const mappedPlaces = (data.bookmarkedPlaces || []).map((item: any) => {
      let id = '';
      switch (item.type) {
        case 'store':
          id = item.storeId;
          break;
        case 'festival':
          id = item.festivalId;
          break;
        case 'library':
          id = item.libraryId;
          break;
      }
      return {
        type: item.type,
        id,
        name: item.name,
      };
    });

    return {
      threads: data.myPosts || [],
      savedThreads: data.bookmarkedPosts || [],
      bookmarkedPlaces: mappedPlaces,
    };
  };

  const categoryEng = (
    korCategory: string,
  ): 'CHALLENGE' | 'FREE' | 'MY_STORE' => {
    switch (korCategory) {
      case '챌린지':
        return 'CHALLENGE';
      case '자유':
        return 'FREE';
      case '나가게':
        return 'MY_STORE';
      default:
        return 'FREE';
    }
  };

  const isValidChallengeCategory = (
    value: string | null,
  ): value is PostRes['challengeCategory'] => {
    return (
      value === 'NO_MONEY' ||
      value === 'KIND_CONSUMER' ||
      value === 'DETECTIVE' ||
      value === 'MASTER' ||
      value === 'COOK_KING'
    );
  };

  const convertPostToPostRes = (
    post: Post | BookmarkPostData['data'][number],
  ): PostRes => {
    if (isMyProfile) {
      // 내 프로필: Post 타입에서 PostRes로 변환
      return {
        ...post,
        postId: post.postId,
        category: categoryEng(post.category),
        challengeCategory: isValidChallengeCategory(post.challengeCategory)
          ? post.challengeCategory
          : 'NO_MONEY',
      };
    } else {
      // 다른 유저 프로필: API 응답 데이터 변환
      return {
        ...post,
        postId: post.postId, // bookmarkedPosts는 postid로 옴
        category: categoryEng(post.category),
        challengeCategory: isValidChallengeCategory(post.challengeCategory)
          ? post.challengeCategory
          : 'NO_MONEY',
      };
    }
  };

  // 중복 제거를 위한 함수 (내 프로필에서만 사용)
  const getUniqueThreads = () => {
    if (!myThreads?.pages) return [];

    const allThreads: Post[] = [];
    const seenIds = new Set<number>();

    myThreads.pages.forEach((page) => {
      page.data.forEach((post) => {
        if (!seenIds.has(post.postId)) {
          seenIds.add(post.postId);
          allThreads.push(post);
        }
      });
    });

    return allThreads;
  };

  const displayData = getDisplayData();

  // 로딩 상태 체크
  const isLoading = isMyProfile
    ? selectedTab === 'thread'
      ? isLoadingMyThreads
      : selectedTab === 'saved'
        ? isLoadingSaved
        : isLoadingBookmarked
    : userDataLoading;

  // 빈 상태 체크 함수들
  const isThreadsEmpty = !isLoading && displayData.threads.length === 0;
  const isSavedEmpty = !isLoading && displayData.savedThreads.length === 0;
  const isPlacesEmpty = !isLoading && displayData.bookmarkedPlaces.length === 0;

  // 에러 상태 (다른 유저 프로필일 때)
  if (!isMyProfile && userDataError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">{userDataError}</p>
      </div>
    );
  }

  // 로딩 상태 (다른 유저 프로필일 때)
  if (!isMyProfile && userDataLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[var(--text-color)]">프로필을 불러오는 중...</p>
      </div>
    );
  }

  const scrollTargetId = isMyProfile
    ? 'myThreads-scroll-to-top'
    : 'userThreads-scroll-to-top';

  return (
    <>
      {/* SetGoal은 모든 프로필에서 표시 (편집은 내 프로필에서만) */}
      <SetGoal
        profileData={profileData}
        memberId={memberId}
        isMyProfile={isMyProfile}
        userName={userData?.nickname}
      />

      <ThreadsTab
        selectedTab={selectedTab}
        onChange={setSelectedTab}
        isMyProfile={isMyProfile}
        userName={userData?.nickname}
      />

      <div
        id={scrollTargetId}
        className={`hide-scrollbar mt-[40px] w-full gap-[20px] p-[20px] ${
          selectedTab === 'place'
            ? 'grid grid-cols-1 md:grid-cols-2'
            : 'flex flex-col'
        }`}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        {/* 작성한 글 탭 */}
        {selectedTab === 'thread' && (
          <>
            {isThreadsEmpty ? (
              <Empty />
            ) : (
              displayData.threads.map((post) => {
                const postRes = convertPostToPostRes(post);
                return (
                  <div key={post.postId} className="">
                    {/* 편집 모드 (내 프로필에서만) */}
                    {isMyProfile && editingPostId === post.postId ? (
                      <PostWriteForm
                        mode="edit"
                        category={postRes.category}
                        editData={postRes}
                        onSuccess={() => {
                          setEditingPostId(null);
                          queryClient.invalidateQueries({
                            queryKey: ['myThreads'],
                          });
                        }}
                        onCancel={() => setEditingPostId(null)}
                      />
                    ) : (
                      <PostItem
                        post={postRes}
                        onEdit={
                          isMyProfile
                            ? () => setEditingPostId(post.postId)
                            : undefined
                        }
                        onDelete={
                          isMyProfile
                            ? () => {
                                queryClient.invalidateQueries({
                                  queryKey: ['myThreads'],
                                });
                              }
                            : undefined
                        }
                      />
                    )}
                  </div>
                );
              })
            )}
            {/* 무한 스크롤 옵저버 (내 프로필에서만) */}
            {isMyProfile && hasNextPage && (
              <div ref={observerRef} className="min-h-[1px]" />
            )}
          </>
        )}

        {/* 찜한 글 탭 */}
        {selectedTab === 'saved' && (
          <>
            {isSavedEmpty ? (
              <Empty />
            ) : (
              displayData.savedThreads.map((post) => (
                <PostItem key={post.postId} post={convertPostToPostRes(post)} />
              ))
            )}
          </>
        )}

        {/* 찜한 갓플 탭 */}
        {selectedTab === 'place' && (
          <>
            {isPlacesEmpty ? (
              <Empty />
            ) : (
              displayData.bookmarkedPlaces.map((place) => (
                <div
                  key={place.id}
                  className="rounded-[10px] shadow dark:shadow-md"
                >
                  <DetailBox
                    type={place.type}
                    id={place.id}
                    showBackButton={false}
                    forceBookmarked={true}
                  />
                </div>
              ))
            )}
          </>
        )}
      </div>

      <TopButton scrollTargetId={scrollTargetId} />
    </>
  );
}
