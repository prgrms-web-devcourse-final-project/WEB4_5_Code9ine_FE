import Image from 'next/image';
import { useState } from 'react';

export default function CommentList() {
  const [input, setInput] = useState('');

  const comments = [
    {
      id: 1,
      writer: '다람이',
      content: '이 사이트 최고네요!',
      date: '2024-07-10',
      avatar: '/profileTest.png',
      role: '노노커피 마스터',
    },
    {
      id: 2,
      writer: '도토리',
      content: '알뜰 다람쥐는 오늘도 출석~',
      date: '2024-07-10',
      avatar: '/profileTest.png',
      role: '',
    },
    {
      id: 3,
      writer: '도토리',
      content: '알뜰 다람쥐는 오늘도 출석~',
      date: '2024-07-10',
      avatar: '/profileTest.png',
      role: '',
    },
    {
      id: 4,
      writer: '도토리',
      content: '알뜰 다람쥐는 오늘도 출석~',
      date: '2024-07-10',
      avatar: '/profileTest.png',
      role: '',
    },
  ];

  return (
    <div className="mt-[10px] text-[var(--text-color-white)]">
      <form className="mb-4 flex items-center gap-2 py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="flex w-[487px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-4 py-2 outline-none focus:border-[var(--main-color-2)]"
        />
        <button
          type="submit"
          className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--main-color-1)] text-[16px] text-black transition-colors hover:bg-[var(--main-color-2)]"
        >
          작성
        </button>
      </form>

      {comments.map((c) => (
        <div
          key={c.id}
          className="flex items-start gap-3 border-t border-[var(--main-color-2)] py-4"
        >
          <Image
            src={c.avatar}
            alt={`${c.writer} 프로필`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <b className="text-[16px]">{c.writer}</b>
              {c.role && (
                <span className="text-xs text-gray-400">{c.role}</span>
              )}
              <span className="ml-1 text-xs text-gray-400">
                {c.date.replaceAll('-', '.').slice(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="mt-1 block text-[16px] break-all">
                {c.content}
              </span>

              <button className="h-[28px] w-[58px] rounded-[20px] bg-[var(--point-color-1)] text-[16px] text-black transition-colors hover:bg-[var(--point-color-2)]">
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
