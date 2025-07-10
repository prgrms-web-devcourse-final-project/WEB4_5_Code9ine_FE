import Image from 'next/image';
import profile1 from '../../assets/profile.png';

export default function ProfileImg() {
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
