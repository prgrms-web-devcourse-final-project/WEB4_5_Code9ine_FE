'use client';
import { getAllStores } from '@/api/admin';
import { Store } from '@/types/admin';
import { startTransition, useEffect, useState } from 'react';
import StoreCard from './StoreCard';

const PAGES = [1, 2, 3, 4];

export default function ManageStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [page, setPage] = useState(1);
  const [selectedStorePerPage, setSelectedStorePerPage] = useState(10);

  const fetchAllStores = async () => {
    try {
      const response = await getAllStores(page, selectedStorePerPage);
      if (response.code === '0000') {
        setStores(response.data);
      } else {
        console.error('Stores Fetch Error');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      await fetchAllStores();
    });
  }, [selectedStorePerPage, page]);

  return (
    <>
      <div className="hide-scrollbar flex flex-col gap-[15px] overflow-y-scroll rounded-[10px] bg-[var(--white-color)] px-[20px] py-[15px] shadow-[var(--shadow-md)]">
        <div className="flex justify-between">
          <h1 className="font-bold">갓플레이스 조회</h1>
          {/* <div className="flex items-center gap-[10px] rounded-[10px] px-[10px] shadow-[var(--shadow-md)]"></div> */}

          <label>
            페이지당 갓플 수
            <select
              value={selectedStorePerPage}
              onChange={(e) => setSelectedStorePerPage(Number(e.target.value))}
              className="ml-[10px]"
            >
              <option value={10}>10개</option>
              <option value={30}>30개</option>
              <option value={50}>50개</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-[6px]">
          {stores.length > 0 &&
            stores.map((store) => (
              <StoreCard key={store.storeId} {...store} />
              // <UserCard
              //   key={user.memberId}
              //   {...user}
              //   blockActivatedHandler={blockActivatedHandler}
              // />
            ))}
          {stores.length === 0 && (
            <div className="text-center">갓플이 없습니다.</div>
          )}
        </div>

        <div className="flex justify-center gap-[10px]">
          {PAGES &&
            PAGES.map((item) => (
              <button
                key={item}
                type="button"
                className={`cursor-pointer ${item === page && 'font-extrabold text-[var(--main-color-2)]'}`}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
