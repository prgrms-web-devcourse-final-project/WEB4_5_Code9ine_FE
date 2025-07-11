import Button from '../../components/profile/Button';
import { MdCancel } from 'react-icons/md';
export default function SetGoalModal() {
  const goalData = [
    { icon: '', name: '무선 헤드폰', price: '30만원' },
    { icon: '', name: '애플 워치', price: '50만원' },
    { icon: '', name: '게임기', price: '70만원' },
    { icon: '', name: '태블릿 PC', price: '100만원' },
    { icon: '', name: '카메라', price: '150만원' },
    { icon: '', name: '노트북', price: '200만원' },
    { icon: '', name: '명품 가방', price: '300만원' },
    { icon: '', name: '유럽 여행', price: '800만원' },
    { icon: '', name: '자동차', price: '6000만원' },
    { icon: '', name: '서울 아파트', price: '10억원' },
  ];
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative h-[600px] w-[350px] items-center justify-center rounded-[10px] bg-[var(--white-color)] p-[20px] shadow-[var(--shadow-md)]">
          <MdCancel className="absolute top-4 right-4 cursor-pointer text-[30px] text-[var(--gray-color-2)]" />
          <h1 className="p-[25px] text-center text-[20px] font-semibold">
            <span className="text-[var(--main-color-3)]">목표</span>를
            설정해보세요!
          </h1>
          <div className="w-[250px]r h-[42px]">
            {goalData.map((goal, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between border-b border-[var(--main-color-3)] p-[5px] hover:text-[var(--main-color-3)]"
              >
                <span className="text-[20px]">{goal.name}</span>
                <span className="text-[20px]">{goal.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-[395px] flex justify-center">
            <Button
              button={
                <>
                  <button className="h-[35px] w-[80px] rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-3)]">
                    선택 완료
                  </button>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
