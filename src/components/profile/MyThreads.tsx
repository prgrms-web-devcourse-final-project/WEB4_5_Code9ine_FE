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
} from '@/api/profile';
import { BookmarkPostData, Post } from '@/types/userType';
import { PostRes } from '../../types/boardType';
import TopButton from '../board/TopButton';

export default function MyThreads() {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // 내가 쓴 글, 내가 찜한 글, 내가 찜한 갓플
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
      // const isLastPage = lastPage.data.length < 10;
      // return isLastPage ? undefined : pages.length;
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
    enabled: selectedTab === 'thread',
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        selectedTab === 'thread'
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage, selectedTab],
  );

  useEffect(() => {
    const currentObserverRef = observerRef.current;
    if (!currentObserverRef || selectedTab !== 'thread') {
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
  }, [hasNextPage, handleObserver, selectedTab, fetchNextPage]);

  const { data: savedThreads, isLoading: isLoadingSaved } =
    useQuery<BookmarkPostData>({
      queryKey: ['saveThreads'],
      queryFn: getBookmarkedThreads,
      enabled: selectedTab === 'saved',
    });

  const { data: bookmarkedPlaces = [], isLoadingBookmarked } = useQuery({
    queryKey: ['bookmarkedPlaces'],
    queryFn: getBookmarkedPlaces,
    enabled: selectedTab === 'place',
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
  const convertPostToPostRes = (post: Post): PostRes => ({
    ...post,
    postId: post.postId,
    category: categoryEng(post.category),
    challengeCategory: isValidChallengeCategory(post.challengeCategory)
      ? post.challengeCategory
      : 'NO_MONEY',
  });

  // 중복 제거를 위한 함수
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

  const uniqueThreads = getUniqueThreads();
  return (
    <>
      <SetGoal />
      <ThreadsTab selectedTab={selectedTab} onChange={setSelectedTab} />
      <div
        id="myThreads-scroll-to-top"
        className={`hide-scrollbar mt-[40px] w-full gap-[20px] p-[20px] ${
          selectedTab === 'place'
            ? 'grid grid-cols-1 md:grid-cols-2'
            : 'flex flex-col'
        }`}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        {selectedTab === 'thread' &&
          uniqueThreads.map((post) => {
            const postRes = convertPostToPostRes(post);
            return (
              <div key={post.postId} className="">
                {editingPostId === post.postId ? (
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
                    onEdit={() => setEditingPostId(post.postId)}
                    onDelete={() => {
                      queryClient.invalidateQueries({
                        queryKey: ['myThreads'],
                      });
                    }}
                  />
                )}
              </div>
            );
          })}

        {selectedTab === 'thread' && hasNextPage && (
          <div ref={observerRef} className="min-h-[1px]" />
        )}

        {selectedTab === 'saved' &&
          savedThreads?.data.map((post) => (
            <PostItem key={post.postId} post={convertPostToPostRes(post)} />
          ))}
        {selectedTab === 'place' &&
          bookmarkedPlaces.map((place) => (
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
          ))}
      </div>

      <TopButton scrollTargetId="myThreads-scroll-to-top" />
    </>
  );
}
