import Image from 'next/image';
import titae from '../../assets/TiTae.svg';

export default function TiTaeProfile() {
  return (
    <>
      <div className="flex size-[40px] items-center justify-center overflow-hidden rounded-full border-1 border-[var(--main-color-2)]">
        <Image src={titae} alt="titae" />
      </div>
    </>
  );
}
