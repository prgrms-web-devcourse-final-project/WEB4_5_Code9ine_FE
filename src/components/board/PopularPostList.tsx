import Image from 'next/image';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { boardApi } from '@/api/boardApi';
import { PopularPostRes } from '../../types/boardType';

export default function PopularPostList() {
  const [posts, setPosts] = useState<PopularPostRes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await boardApi.getPopularPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[869px] w-full rounded-[10px] bg-[var(--white-color)] text-[var(--text-color-white)] shadow">
      <div className="mt-[22px] mb-[22px] text-center text-[22px]">인기글</div>
      <div className="flex flex-1 flex-col">
        {posts.map((post) => (
          <div
            key={post.postId}
            className="mx-auto mb-[7px] h-[72px] w-full border-b border-[var(--main-color-2)] px-2 last:border-b-0 md:max-w-[320px]"
          >
            <div className="flex items-start">
              <Image
                src="/profileTest.png"
                alt="프로필"
                width={36}
                height={36}
                className="mr-3 h-[36px] w-[36px] rounded-full border border-[var(--main-color-2)] object-cover"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="mr-2 text-[18px]">
                      {post.writerNickname}
                    </span>
                    <span className="text-[14px] text-[var(--gray-color-2)]">
                      {post.writerTitle}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="ml-auto text-[14px] text-[var(--gray-color-2)]">
                      {format(parseISO(post.createdAt), 'yy.MM.dd')}
                    </span>
                    <span className="mt-[1px] text-[14px] text-[var(--main-color-3)]">
                      자유게시판
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-[1px] flex w-full">
              <span className="text-[18px]">{post.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
