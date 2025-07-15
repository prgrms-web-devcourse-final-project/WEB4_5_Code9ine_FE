import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface ApiResponse {
  code: string;
  message: string;
  data: PopularPost[];
}

export interface PopularPost {
  postId: number; // 게시글 아이디
  title: string; // 게시글 제목
  writerNickname: string; // 작성자 닉네임
  writerProfileImage: string; // 프로필 이미지
  writerSymbol: string; // 휘장
  writerTitle: string; // 칭호
  createdAt: string; // 작성일
  //category: string; // 카테고리
}

export default function PopularPostList() {
  const [posts, setPosts] = useState<PopularPost[]>([]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/api/community/posts/top',
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );
        if (!res.ok) throw new Error('인기글 요청 실패');

        const json: ApiResponse = await res.json();
        console.log(json.data);
        setPosts(json.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPopularPosts();
  }, []);

  return (
    <div className="h-[869px] w-full rounded-[10px] bg-[var(--background-full)] text-[var(--text-color-white)] shadow">
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
                      {post.createdAt}
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
