import { deleteAccount, setData } from '@/api/accountApi';
import { useAccountData } from '@/stores/accountStore';
import { PayList } from '@/types/payData';

export default function MobileCardMenu({
  index,
  value,
}: {
  index: number;
  value: PayList;
}) {
  const {
    setIsAccount,
    setInsert,
    setIsId,
    setTotaldata,
    setRewriteData,
    setMobileMenuOpen,
  } = useAccountData();

  const handleDelete = async () => {
    deleteAccount(index);
    const totalData = await setData(0);
    setTotaldata(totalData);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const handleChange = () => {
    setIsAccount('수정');
    setInsert(true);
    setIsId(index);
    setRewriteData(value);
    setMobileMenuOpen(false);
    scrollToTop();
  };
  return (
    <>
      <div className="flex h-full w-full flex-col gap-[5px] rounded-[5px] bg-[var(--background)] py-[5px]">
        <button className="cursor-pointer px-[30px]" onClick={handleChange}>
          수정
        </button>
        <div className="w-full border-1"></div>
        <button className="cursor-pointer px-[30px]" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </>
  );
}
