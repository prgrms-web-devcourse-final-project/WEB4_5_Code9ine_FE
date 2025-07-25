import profile1 from '../../assets/profile.png';
import Image from 'next/image';

interface DefaultProfileProps {
  className?: string;
}

export default function DefaultProfile({ className }: DefaultProfileProps) {
  const defaultSize = 'h-[120px] w-[120px]';
  return (
    <div
      className={`overflow-hidden rounded-full border-[2px] border-[var(--main-color-3)] ${
        className || defaultSize
      }`}
    >
      <Image
        src={profile1}
        alt="기본 프로필 이미지"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
