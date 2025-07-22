import { Store } from '@/types/admin';
import Button from './Button';

export default function StoreCard({ name, address, category, menus }: Store) {
  const modifyHandler = () => {
    
  };
  const deleteHandler = () => {};
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
      </div>
      <div className="flex-[5%]">
        <Button onClick={deleteHandler} className="bg-[var(--point-color-1)]">
          삭제
        </Button>
      </div>
    </div>
  );
}
