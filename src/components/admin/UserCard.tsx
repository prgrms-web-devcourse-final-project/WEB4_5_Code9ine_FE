'use client';
import { User } from '@/types/admin';
import Button from './Button';
import { blockUser } from '@/api/admin';
import { startTransition, useOptimistic } from 'react';
import toast from 'react-hot-toast';

type Props = User & {
  blockActivatedHandler: (id: number, newIsAvtivated: boolean) => void;
};

export default function UserCard({
  memberId,
  nickname,
  email,
  activated,
  blockActivatedHandler,
}: Props) {
  const [optimisticIsBlock, addOptimisticIsBlock] = useOptimistic(
    activated,
    (prev, action: boolean | null) => {
      if (action === null) return !prev;
      return action;
    },
  );

  const userHandler = () => {
    addOptimisticIsBlock(null);

    startTransition(async () => {
      try {
        const response = await blockUser(memberId);

        if (response.code === '0000') {
          blockActivatedHandler(memberId, !activated);
          toast.success('차단 완료');
        } else {
          addOptimisticIsBlock(activated);
          toast.error('차단 실패');
        }
      } catch (e) {
        addOptimisticIsBlock(activated);
        console.error('유저 차단 실패: ', e);
      }
    });
  };

  return (
    <div className="flex">
      <div className="flex-[15%]">{memberId}</div>
      <div className="flex-[25%]">{nickname}</div>
      <div className="flex-[45%]">{email}</div>
      <div className="flex-[15%] text-right">
        {optimisticIsBlock ? (
          <Button onClick={userHandler}>유저 차단</Button>
        ) : (
          <div>차단된 유저입니다</div>
        )}
      </div>
    </div>
  );
}
