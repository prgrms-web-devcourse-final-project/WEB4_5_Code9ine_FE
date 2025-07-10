import DefaultProfile from './DefaultProfile';
// import Title from './Title';
import ProgressBar from '../common/ProgressBar';
import Button from './Button';

export default function Profile() {
  return (
    <>
      <div className="my-[20px] flex flex-col items-center justify-center">
        <DefaultProfile />
        <p className="mt-[10px] text-[20px] font-semibold text-[var(--main-color-3)]">
          유저 닉네임{' '}
          <span className="text-[16px] font-normal text-[var(--gray-color-2)]">
            LV.1
          </span>{' '}
        </p>
        <p className="mt-[5px] mb-[7px] text-[20px]">절약왕</p>
        <span className="ml-[120px] text-[12px] text-[var(--gray-color-2)]">
          다음 레벨까지
        </span>
        <ProgressBar
          completed={70}
          width="200px"
          height="20px"
          bgColor="var(--main-color-3)"
          baseBgColor="var(--white-color)"
          labelVisible={true}
        />
        <div className="mt-[10px] flex items-center gap-[10px]">
          <Button title="내 정보 수정하기" />
          <Button title="내 초대 코드 복사" />
        </div>
      </div>
    </>
  );
}
