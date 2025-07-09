import pic1 from '../../assets/title1.png';
import Image from 'next/image';
export default function Title() {
  return (
    <>
      <div className="flex w-[45px] items-center justify-between">
        <Image
          src={pic1}
          alt="소통왕"
          className="h-auto w-[12px] align-middle"
        />
        <p className="text-[10px]">소통왕</p>
      </div>
    </>
  );
}
