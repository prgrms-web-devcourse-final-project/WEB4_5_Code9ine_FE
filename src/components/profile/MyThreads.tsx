'use client';
import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
import PostWriteForm from '../board/PostWriteForm';
import ThreadsTab from './ThreadsTab';
import ThreadsTabSkeleton from './ThreadsTabSkeleton';
import DetailBox from '../godplaces/detail/DetailBox';
import DetailCardSkeleton from '../godplaces/detail/DetailCardSkeleton';
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
import { BookmarkPostData, Post, BookmarkItem } from '@/types/userType';
import { PostRes } from '../../types/boardType';
import TopButton from '../board/TopButton';
import Empty from './Empty';
import PostItemSkeleton from '../board/PostItemSkeleton';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { convertGodplacesBookmarkType } from '@/lib/utils/convertGodplacesBookmarkType';

interface ThreadsProps {
  profileData?: UserData;
  memberId: string;
}

export default function Threads({ profileData, memberId }: ThreadsProps) {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [myData, setMyData] = useState<UserData | null>(null);
  const [isMyDataLoaded, setIsMyDataLoaded] = useState(false);
  const queryClient = useQueryClient();
  const setBookmarked = useGodplacesStore((state) => state.setBookmarked);

  // 내 정보 가져오기 (memberId와 비교하기 위해)
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await getMyPage();
        setMyData(res.data.data);
      } catch (err) {
        console.log('내 정보 조회 실패', err);
      } finally {
        setIsMyDataLoaded(true);
      }
    };
    fetchMyData();
  }, []);

  // 내 프로필인지 판단
  const isMyProfile = Boolean(
    !memberId || (myData && String(myData.memberId) === String(memberId)),
  );

  // 다른 유저 프로필 데이터 쿼리
  const {
    data: otherUserData,
    isLoading: isLoadingOtherUser,
    error: otherUserError,
  } = useQuery({
    queryKey: ['userProfile', memberId],
    queryFn: () => getUserProfile(memberId),
    enabled: Boolean(
      memberId && !isMyProfile && isMyDataLoaded && !profileData,
    ),
    select: (res) => res.data?.data || res.data || res,
    staleTime: 5 * 60 * 1000,
  });

  // 최종 사용할 유저 데이터 결정
  const userData = isMyProfile ? myData : profileData || otherUserData;

  // 유저 데이터 로딩 상태
  const userDataLoading = isMyProfile
    ? !isMyDataLoaded
    : !profileData && isLoadingOtherUser;

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
    enabled: Boolean(selectedTab === 'thread' && isMyProfile && isMyDataLoaded),
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
      enabled: Boolean(
        selectedTab === 'saved' && isMyProfile && isMyDataLoaded,
      ),
    });

  // 찜한 갓플 (내 프로필일 때만)
  const { data: bookmarkedPlaces = [], isLoading: isLoadingBookmarked } =
    useQuery({
      queryKey: ['bookmarkedPlaces'],
      queryFn: getBookmarkedPlaces,
      enabled: Boolean(
        selectedTab === 'place' && isMyProfile && isMyDataLoaded,
      ),
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

  useEffect(() => {
    if (isMyProfile && isMyDataLoaded) {
      getBookmarkedPlaces().then((res) => {
        setBookmarked(convertGodplacesBookmarkType(res.data));
      });
    }
  }, [isMyProfile, setBookmarked, isMyDataLoaded]);

  useEffect(() => {
    if (selectedTab === 'place' && isMyProfile) {
      queryClient.invalidateQueries({ queryKey: ['bookmarkedPlaces'] });
    }
  }, [isMyProfile, selectedTab, queryClient]);

  // 표시할 데이터 추출
  const getDisplayData = () => {
    if (isMyProfile) {
      return {
        threads: getUniqueThreads(),
        savedThreads: savedThreads?.data || [],
        bookmarkedPlaces,
      };
    }

    // 다른 유저 프로필 - 로딩 중이면 빈 배열이 아닌 현재 상태 유지
    if (userDataLoading || !userData) {
      return { threads: [], savedThreads: [], bookmarkedPlaces: [] };
    }

    // 갓플 데이터 매핑
    const mappedPlaces = (
      (userData.bookmarkedPlaces ?? []) as BookmarkItem[]
    ).map((item) => {
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
      threads: userData.myPosts || [],
      savedThreads: userData.bookmarkedPosts || [],
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
    return {
      ...post,
      postId: post.postId,
      category: categoryEng(post.category),
      challengeCategory: isValidChallengeCategory(post.challengeCategory)
        ? post.challengeCategory
        : 'NO_MONEY',
    };
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

  // 빈 상태 체크 함수들 - 로딩이 완전히 끝났을 때만 empty 표시
  const isThreadsEmpty =
    !isLoading &&
    !userDataLoading &&
    userData &&
    displayData.threads.length === 0;
  const isSavedEmpty =
    !isLoading &&
    !userDataLoading &&
    userData &&
    displayData.savedThreads.length === 0;
  const isPlacesEmpty =
    !isLoading &&
    !userDataLoading &&
    userData &&
    displayData.bookmarkedPlaces.length === 0;

  // 에러 상태 (다른 유저 프로필일 때)
  if (!isMyProfile && otherUserError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">프로필을 불러올 수 없습니다.</p>
      </div>
    );
  }

  const scrollTargetId = isMyProfile
    ? 'myThreads-scroll-to-top'
    : 'userThreads-scroll-to-top';

  return (
    <>
      <SetGoal
        profileData={{
          goalStuff:
            typeof userData?.goalStuff === 'string'
              ? userData.goalStuff
              : undefined,
          remainPrice:
            typeof userData?.remainPrice === 'number'
              ? userData.remainPrice
              : undefined,
        }}
        memberId={memberId}
        isMyProfile={isMyProfile}
        userName={userData?.nickname}
      />

      {userDataLoading || (!isMyProfile && !userData?.nickname) ? (
        <ThreadsTabSkeleton />
      ) : (
        <ThreadsTab
          selectedTab={selectedTab}
          onChange={setSelectedTab}
          isMyProfile={isMyProfile}
          userName={userData?.nickname}
        />
      )}

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
            {isLoading ? (
              <>
                {[...Array(3)].map((_, idx) => (
                  <PostItemSkeleton key={`skeleton-thread-${idx}`} />
                ))}
              </>
            ) : isThreadsEmpty ? (
              <Empty />
            ) : (
              displayData.threads.map((post) => {
                const postRes = convertPostToPostRes(post);
                return (
                  <div key={post.postId}>
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
            {isMyProfile && hasNextPage && (
              <div ref={observerRef} className="min-h-[1px]" />
            )}
          </>
        )}

        {/* 찜한 글 탭 */}
        {selectedTab === 'saved' && (
          <>
            {isLoading ? (
              <>
                {[...Array(3)].map((_, idx) => (
                  <PostItemSkeleton key={`skeleton-saved-${idx}`} />
                ))}
              </>
            ) : isSavedEmpty ? (
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
            {isLoading || userDataLoading ? (
              <>
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={`skeleton-place-${idx}`}
                    className="rounded-[10px] shadow dark:shadow-md"
                  >
                    <DetailCardSkeleton />
                  </div>
                ))}
              </>
            ) : isPlacesEmpty ? (
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
