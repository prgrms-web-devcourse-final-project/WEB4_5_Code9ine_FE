'use client';
import Title from './Title';
import styles from '../../css/TitleSwiper.module.css';

const titles = [
  '소통왕',
  '짧은',
  '엄청엄청긴제목입니다',
  '길이가 다름 다름 다름',
  '짧음',
];

export default function TitleSwiper() {
  return (
    <div className={styles.container}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {titles.map((text, i) => (
            <Title key={`1-${i}`} text={text} />
          ))}

          {titles.map((text, i) => (
            <Title key={`2-${i}`} text={text} />
          ))}
        </div>
      </div>
    </div>
  );
}
