// import pic1 from '../../assets/title1.png';
// import Image from 'next/image';
export default function Title({ text }: { text: string }) {
  return (
    <>
      {/* <Image
          src={pic1}
          alt="소통왕"
          className="h-auto w-[12px] align-middle"
        /> */}
      <p className="mx-[20px] inline-block text-[20px]">{text}</p>
    </>
  );
}
