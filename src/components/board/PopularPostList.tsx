import Image from 'next/image';

const posts = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  nickname: '다람이',
  role: '노느카페 마스터',
  date: '25.07.09',
  title: '제목',
}));

export default function PopularPostList() {
  return (
    <div className="h-[869px] w-full rounded-[10px] bg-[var(--background-full)] text-[var(--text-color-white)] shadow">
      <div className="mt-[23px] mb-[20px] text-center text-[22px]">인기글</div>
      <div className="flex flex-1 flex-col">
        {posts.map((post) => (
          <div
            key={post.id}
            className="mx-auto mb-[7px] h-[72px] w-[320px] border-b border-[var(--main-color-2)] px-2 last:border-b-0"
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
                <div className="flex items-center">
                  <span className="mr-2 text-[18px]">{post.nickname}</span>
                  <span className="text-[14px] text-[var(--gray-color-2)]">
                    {post.role}
                  </span>
                  <span className="ml-auto text-[14px] text-[var(--gray-color-2)]">
                    {post.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-1 flex w-full">
              <span className="text-[18px]">{post.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
