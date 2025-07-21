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

  return (
    <>
      <div className="rounded-[10px] bg-[var(--white-color)] px-[20px] py-[15px] shadow-[var(--shadow-md)]">
        <div className="flex justify-between">
          <h1>모든 유저 조회</h1>
          <label>
            페이지당 유저 수
            <select
              value={selectedUserPerPage}
              onChange={(e) => setSelectedUserPerPage(Number(e.target.value))}
            >
              <option value={10}>10명</option>
              <option value={30}>30명</option>
              <option value={50}>50명</option>
              <option value={100}>100명</option>
            </select>
          </label>
        </div>

        {users && users.map((user) => <UserCard key={user.userId} {...user} />)}
      </div>
    </>
  );
}
