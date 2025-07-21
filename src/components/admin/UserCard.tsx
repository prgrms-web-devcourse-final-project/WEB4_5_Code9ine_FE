import { User } from '@/types/admin';

export default function UserCard({ userId, nickname, email, activated }: User) {
  return (
    <div className="flex">
      <div className="flex-[10%]">{userId}</div>
      <div className="flex-[25%]">{nickname}</div>
      <div className="flex-[55%]">{email}</div>
      <div className="flex-[10%]">{activated}</div>
    </div>
  );
}
