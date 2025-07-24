'use client';
import { getAllUsers, searchUserByNickname } from '@/api/admin';
import {
  ChangeEvent,
  KeyboardEvent,
  startTransition,
  useEffect,
  useState,
} from 'react';
import UserCard from './UserCard';
import { User } from '@/types/admin';
import { CiSearch } from 'react-icons/ci';

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [selectedUserPerPage, setSelectedUserPerPage] = useState(10);
  const [username, setUsername] = useState('');
  const [totalData, setTotalData] = useState(0);

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers(page, selectedUserPerPage);
      if (response.code === '0000') {
        // console.log(response);
        setTotalData(response.data.total);
        setUsers(response.data.users);
      } else {
        console.error('All Users Fetch Error');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pageSize = 10;
  const totalPages = Math.ceil(totalData / selectedUserPerPage);
  const currentBlock = Math.floor((page - 1) / pageSize);
  const startPage = currentBlock * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  const slicedPages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  useEffect(() => {
    startTransition(async () => {
      await fetchAllUsers();
    });
  }, [selectedUserPerPage, page]);

  const blockActivatedHandler = (id: number, newIsAvtivated: boolean) => {
    setUsers((prev) =>
      prev?.map((user) =>
        user.memberId === id ? { ...user, activated: newIsAvtivated } : user,
      ),
    );
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const searchHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (username.trim() === '') await fetchAllUsers();
      else {
        startTransition(async () => {
          const response = await searchUserByNickname(username);
          // console.log(response);
          if (response.code === '0000') {
            setUsers([response.data]);
          } else {
            setUsers([]);
          }
        });
      }
    }
  };

  console.log(username);

  return (
    <>
      <div className="hide-scrollbar flex h-[335px] flex-col gap-[15px] overflow-y-scroll rounded-[10px] bg-[var(--white-color)] px-[20px] py-[15px] shadow-[var(--shadow-md)]">
        <div className="flex justify-between">
          <h1 className="font-bold">유저 조회</h1>
          <div className="flex items-center gap-[10px] rounded-[10px] px-[10px] shadow-[var(--shadow-md)]">
            <CiSearch />
            <input
              type="text"
              placeholder="닉네임으로 검색"
              className="focus:outline-none"
              onChange={inputHandler}
              value={username}
              onKeyDown={searchHandler}
            />
          </div>

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
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-[6px]">
          {users.length > 0 &&
            users.map((user) => (
              <UserCard
                key={user.memberId}
                {...user}
                blockActivatedHandler={blockActivatedHandler}
              />
            ))}
          {users.length === 0 && (
            <div className="text-center">유저가 없습니다.</div>
          )}
        </div>

        <div className="flex items-center justify-center gap-[10px]">
          {page > 1 && (
            <button className="cursor-pointer" onClick={() => setPage(1)}>
              {'<<'}
            </button>
          )}

          {startPage > 1 && (
            <button
              className="cursor-pointer"
              onClick={() => setPage(startPage - 1)}
            >
              {'<'}
            </button>
          )}

          {slicedPages.map((item) => (
            <button
              key={item}
              type="button"
              className={`cursor-pointer ${item === page && 'font-extrabold text-[var(--main-color-2)]'}`}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}

          {endPage < totalPages && (
            <button
              className="cursor-pointer"
              onClick={() => setPage(endPage + 1)}
            >
              {'>'}
            </button>
          )}

          {page < totalPages && (
            <button
              className="cursor-pointer"
              onClick={() => setPage(totalPages)}
            >
              {'>>'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
