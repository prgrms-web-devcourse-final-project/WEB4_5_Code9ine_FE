'use client';
import { getAllUsers } from '@/api/admin';
import { startTransition, useEffect, useState } from 'react';
import UserCard from './UserCard';
import { User } from '@/types/admin';

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>();
  const [page, setPage] = useState(1);
  const [selectedUserPerPage, setSelectedUserPerPage] = useState(10);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getAllUsers(page, selectedUserPerPage);
        if (response.code === '0000') {
          setUsers(response.data);
        } else {
          console.error('All Users Fetch Error');
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, [selectedUserPerPage, page]);

  const blockActivatedHandler = (id: number, newIsAvtivated: boolean) => {
    setUsers((prev) =>
      prev?.map((user) =>
        user.memberId === id ? { ...user, activated: newIsAvtivated } : user,
      ),
    );
  };

  return (
    <>
      <div className="rounded-[10px] bg-[var(--white-color)] px-[20px] py-[15px] shadow-[var(--shadow-md)]">
        <div className="mb-[10px] flex justify-between">
          <h1 className="font-bold">모든 유저 조회</h1>
          <div></div>
          <label>
            페이지당 유저 수
            <select
              value={selectedUserPerPage}
              onChange={(e) => setSelectedUserPerPage(Number(e.target.value))}
              className="ml-[10px]"
            >
              <option value={10}>10명</option>
              <option value={30}>30명</option>
              <option value={50}>50명</option>
              <option value={100}>100명</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-[6px]">
          {users &&
            users.map((user) => <UserCard key={user.memberId} {...user} blockActivatedHandler={blockActivatedHandler} />)}
        </div>
      </div>
    </>
  );
}
