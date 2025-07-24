'use client';

import CommunityTab from '../../../components/board/CommunityTab';
import PopularPostList from '../../../components/board/PopularPostList';
import PostItem from '../../../components/board/PostItem';
import PostWriteForm from '../../../components/board/PostWriteForm';
import TopButton from '../../../components/board/TopButton';
import { boardApi } from '@/api/boardApi';
import { PostRes } from '@/types/boardType';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<
    'MY_STORE' | 'CHALLENGE' | 'FREE'
  >('MY_STORE');
  const [posts, setPosts] = useState<PostRes[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async () => {
    try {
      const data = await boardApi.getPostsByCategory(selectedTab, 1, 1);
      setPosts(data);
      setPage(1);
      setHasMore(data.length > 0);
    } catch (err) {
      console.error('게시글 초기 로딩 실패:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedTab]);

  const loadMorePosts = async () => {
    try {
      const nextPage = page + 1;
      const data = await boardApi.getPostsByCategory(selectedTab, nextPage, 1);
      setPosts((prev) => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length > 0);
    } catch (err) {
      console.error('다음 게시글 로딩 실패:', err);
    }
  };
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, page]);

  return (
    <>
      <div className="flex w-full max-w-screen flex-col px-[15px] md:flex-row md:px-[0px]">
        <div className="hide-scrollbar order-1 ml-0 flex max-h-[310px] flex-1 flex-col overflow-y-auto rounded-[10px] shadow md:order-2 md:ml-[15px] md:h-[869px] md:max-h-none md:w-[350px]">
          <PopularPostList />
        </div>

        <div
          id="scrollTop-content"
          className="hide-scrollbar relative order-2 mt-[15px] flex h-[869px] w-full flex-col overflow-y-auto rounded-[10px] bg-[var(--white-color)] p-4 shadow md:order-1 md:mt-0 md:w-[756px]"
        >
          <div className="mb-[25px]">
            <div className="mt-[15px] mb-[30px]">
              <CommunityTab
                selectedTab={selectedTab}
                onChange={setSelectedTab}
              />
            </div>
            <PostWriteForm category={selectedTab} onSuccess={fetchPosts} />
          </div>
          {posts.map((post) => (
            <div key={post.postId} className="mb-[15px]">
              <PostItem post={post} />
            </div>
          ))}
          {hasMore && <div ref={observerRef} className="mt-4 min-h-10" />}
          <TopButton scrollTargetId="scrollTop-content" />
        </div>
      </div>
    </>
  );
}
