import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { boardApi } from '../../api/boardApi';
import { CommentRes } from '../../types/boardType';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface CommentListProps {
  postId: number;
  myMemberId: number | null;
  onAddComment?: () => void;
  onDeleteComment?: () => void;
}

export default function CommentList({
  postId,
  myMemberId,
  onAddComment,
  onDeleteComment,
}: CommentListProps) {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState<CommentRes[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await boardApi.getCommentlist(postId);
        setComments(data);
      } catch (err) {
        console.error('댓글 불러오기 실패:', err);
      } finally {
        //setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error('댓글을 입력해주세요!');
      return;
    }

    try {
      await boardApi.postCommentCreate(postId, input);
      toast.success('댓글이 등록되었어요!');
      setInput('');
      onAddComment?.();
      const data = await boardApi.getCommentlist(postId);
      setComments(data);
    } catch (err) {
      console.error(err);
      toast.error('댓글 작성에 실패했어요');
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      await boardApi.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
      onDeleteComment?.();
      toast.success('댓글이 삭제되었어요!');
    } catch (err) {
      console.error(err);
      toast.error('댓글이 삭제에 실패했어요');
    }
  };

  return (
    <div className="mt-[10px] text-[var(--text-color-white)]">
      <form onSubmit={handleSubmit} className="mb-4 flex items-center py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="mr-[10px] flex w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-4 py-2 outline-none focus:border-[var(--main-color-2)] md:w-[500px]"
        />
        <button
          type="submit"
          className="h-[28px] w-[48px] shrink-0 cursor-pointer rounded-[20px] bg-[var(--main-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--main-color-2)] md:w-[58px] md:text-[16px]"
        >
          작성
        </button>
      </form>

      {comments.map((c) => (
        <div
          key={c.commentId}
          className="flex items-start gap-3 border-t border-[var(--main-color-2)] py-4"
        >
          <Link href={`/profile/${c.memberId}`}>
            <Image
              src={'/profileTest.png'}
              alt={'댓글 작성자 프로필'}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link href={`/profile/${c.memberId}`}>
                <b className="text-[16px]">{c.writerNickname}</b>
              </Link>
              {c.writerTitle && (
                <Link href={`/profile/${c.memberId}`}>
                  <span className="text-xs text-gray-400">{c.writerTitle}</span>
                </Link>
              )}

              <span className="ml-1 text-xs text-gray-400">
                {format(parseISO(c.createdAt), 'yy.MM.dd')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="mt-1 block text-[16px] break-all">
                {c.content}
              </span>

              {myMemberId === c.memberId && (
                <button
                  onClick={() => handleDelete(c.commentId)}
                  className="h-[28px] w-[48px] shrink-0 rounded-[20px] bg-[var(--point-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--point-color-2)] md:w-[58px] md:text-[16px]"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
