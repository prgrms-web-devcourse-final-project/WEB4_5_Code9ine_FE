'use client';
import { getAllStores, getStroesByCategory } from '@/api/admin';
import { Store } from '@/types/admin';
import { startTransition, useEffect, useState } from 'react';
import StoreCard from './StoreCard';
import Button from './Button';
import AddModifyModal from './AddModifyModal';

export default function ManageStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [page, setPage] = useState(1);
  const [selectedStorePerPage, setSelectedStorePerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isShowModal, setIsShowModal] = useState(false);
  const [totalData, setTotalData] = useState(0);

  const fetchAllStores = async () => {
    try {
      const response = await getAllStores(page, selectedStorePerPage);
      if (response.code === '0000') {
        // console.log(response);
        setTotalData(response.data.total);
        setStores(response.data.stores);
      } else {
        console.error('Stores Fetch Error');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pageSize = 10;
  const totalPages = Math.ceil(totalData / selectedStorePerPage);
  const currentBlock = Math.floor((page - 1) / pageSize);
  const startPage = currentBlock * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  const slicedPages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const fetchStoresByCategory = async () => {
    try {
      const response = await getStroesByCategory(
        selectedCategory,
        page,
        selectedStorePerPage,
      );
      if (response.code === '0000') {
        setTotalData(response.data.total);
        setStores(response.data.stores);
      } else {
        console.error('Stores By Category fetch error');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const refreshStores = () => {
    if (selectedCategory === '전체') fetchAllStores();
    else fetchStoresByCategory();
  };

  useEffect(() => {
    startTransition(async () => {
      refreshStores();
    });
  }, [selectedStorePerPage, page, selectedCategory]);

  const addHandler = () => {
    setIsShowModal(true);
  };

  return (
    <>
      <div className="hide-scrollbar flex h-[415px] flex-col gap-[15px] overflow-y-scroll rounded-[10px] bg-[var(--white-color)] px-[20px] py-[15px] shadow-[var(--shadow-md)]">
        <div className="flex justify-between">
          <h1 className="font-bold">착한가게 조회</h1>

          <Button className="bg-[var(--main-color-2)]" onClick={addHandler}>
            착한가게 추가
          </Button>

          <label>
            카테고리
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="ml-[10px]"
            >
              <option value={'전체'}>전체</option>
              <option value={'한식'}>한식</option>
              <option value={'중식'}>중식</option>
              <option value={'일식'}>일식</option>
              <option value={'양식'}>양식</option>
              <option value={'미용업'}>미용</option>
              <option value={'세탁업'}>세탁</option>
              <option value={'숙박업'}>숙박</option>
            </select>
          </label>

          <label>
            페이지당 착한가게 수
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
              <StoreCard
                key={store.storeId}
                {...store}
                onSuccess={refreshStores}
              />
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
      {isShowModal && (
        <AddModifyModal
          setIsShowModal={setIsShowModal}
          type="add"
          onSuccess={refreshStores}
        />
      )}
    </>
  );
}
