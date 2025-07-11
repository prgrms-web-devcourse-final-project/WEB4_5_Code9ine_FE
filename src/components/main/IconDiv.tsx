import food from '../../assets/icons/gimbab.png';
import transport from '../../assets/icons/bus.png';
import relax from '../../assets/icons/video_game.png';
import celebration from '../../assets/icons/celebration.png';
import shopping from '../../assets/icons/apple.png';
import education from '../../assets/icons/note.png';
import health from '../../assets/icons/health.png';
import etc from '../../assets/icons/guitar.png';
import life from '../../assets/icons/life.png';
import house from '../../assets/icons/house.png';
import Image, { StaticImageData } from 'next/image';

const iconMap: Record<number, { src: StaticImageData; alt: string }> = {
  0: { src: food, alt: '식비' },
  1: { src: transport, alt: '교통' },
  2: { src: relax, alt: '여가' },
  3: { src: celebration, alt: '경조사' },
  4: { src: shopping, alt: '쇼핑' },
  5: { src: education, alt: '교육' },
  6: { src: health, alt: '건강' },
  7: { src: etc, alt: '기타' },
  8: { src: life, alt: '생활' },
  9: { src: house, alt: '주거/통신' },
};

export default function IconDiv({ id }: { id: number }) {
  const icon = iconMap[id];

  return (
    <>
      <Image src={icon.src} alt={icon.alt} width={22} height={22} />
    </>
  );
}
