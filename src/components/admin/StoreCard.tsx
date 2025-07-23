'use client';
import { Store } from '@/types/admin';
import Button from './Button';
import { startTransition, useState } from 'react';
import AddModifyModal from './AddModifyModal';
import { deleteStore } from '@/api/admin';
import toast from 'react-hot-toast';

type Props = Store & {
  onSuccess: () => void;
};

export default function StoreCard({
  name,
  address,
  category,
  menus,
  storeId,
  onSuccess,
}: Props) {
  const [isShowModal, setIsShowModal] = useState(false);

  const modifyHandler = () => {
    setIsShowModal(true);
  };

  const deleteHandler = () => {
    startTransition(async () => {
      try {
        const response = await deleteStore(storeId);
        if (response.code === '0000') {
          toast.success('장소 삭제 완료');
          onSuccess();
        }
      } catch (e) {
        toast.error('장소 삭제 실패');
        console.error(e);
      }
    });
  };

  return (
    <div className="flex">
      <div className="flex-[10%]">{category}</div>
      <div className="flex-[20%]">{name}</div>
      <div className="flex-[40%]">{address}</div>
      <div className="flex-[20%]">
        {menus.map((menu, idx) => (
          <div key={idx}>
            {menu.name} - {menu.price}원
          </div>
        ))}
      </div>
      <div className="flex-[5%]">
        <Button onClick={modifyHandler} className={'bg-[var(--main-color-2)]'}>
          수정
        </Button>
        {isShowModal && (
          <AddModifyModal
            setIsShowModal={setIsShowModal}
            name={name}
            address={address}
            category={category}
            menus={menus}
            storeId={storeId}
            type="modify"
            onSuccess={onSuccess}
          />
        )}
      </div>
      <div className="flex-[5%]">
        <Button onClick={deleteHandler} className="bg-[var(--point-color-1)]">
          삭제
        </Button>
      </div>
    </div>
  );
}
