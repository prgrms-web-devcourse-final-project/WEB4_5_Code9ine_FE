import profile1 from '../../assets/profile.png';
import Image from 'next/image';
export default function DefaultProfile() {
  return (
    <>
      <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[2px] border-[var(--main-color-3)]">
        <Image
          src={profile1}
          alt="기본 프로필 이미지"
          className="object-cover"
        />
      </div>
    </>
  );
}
