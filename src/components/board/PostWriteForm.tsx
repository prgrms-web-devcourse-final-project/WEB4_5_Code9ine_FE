import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import boardUploadIcon from '../../assets/board_upload_image.svg';
import { boardApi } from '@/api/boardApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaTrash } from 'react-icons/fa';
import ChallengeSeleteBox from './ChallengeSeleteBox';

interface PostWriteFormProps {
  category: 'myHiddenStore' | 'challenge' | 'freeBoard';
}

export default function PostWriteForm({ category }: PostWriteFormProps) {
  console.log('카테고리 : ', category);
  const [title, setTitle] = useState('');
  const [challengeOption, setChallengeOption] = useState('challenge1');
  const [content, setContent] = useState('');
  // const [imageUrls, setImageUrls] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [showPreview, setShowPreview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [imagesPreview, setImagesPreview] = useState([
    {
      original: 'https://picsum.photos/id/1015/800/600',
    },
    {
      original: 'https://picsum.photos/id/1016/800/600',
    },
    {
      original: 'https://picsum.photos/id/1015/800/600',
    },
    {
      original: 'https://picsum.photos/id/1016/800/600',
    },
  ]);

  const handleSubmit = async () => {
    try {
      await boardApi.postBoardCreate({
        title,
        content,
        category,
        imageUrls: [],
        //challengeCategory: challengeOption,
      });
      alert('게시글이 작성되었습니다!');
    } catch (err) {
      console.error(err);
      alert('작성 실패');
    }
  };

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  // 이미지 url 로직 → S3

  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPreview]);

  return (
    <div className="flex w-full max-w-[724px] flex-col items-start gap-4 rounded-[10px] bg-[var(--background)] p-4 text-[20px] text-[var(--text-color-white)] shadow md:flex-row">
      <div className="flex min-w-[80px] flex-row items-center justify-center md:w-[120px] md:flex-col">
        <Image
          src="/profileTest.png"
          alt="프로필"
          width={70}
          height={70}
          className="h-[30px] w-[30px] rounded-full border-2 border-[var(--main-color-2)] md:h-[70px] md:w-[70px]"
        />

        <div className="flex flex-row items-baseline gap-1 whitespace-nowrap md:flex-col md:items-center">
          <div className="ml-[8px] text-center text-[20px] leading-none">
            스펀지밥
          </div>
          <div className="text-center text-[14px] leading-none text-[var(--text-color-2)] md:text-[16px]">
            노노커피 마스터
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="relative">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-[50px] w-full rounded-[10px] border border-[var(--main-color-1)] bg-[var(--white-color)] p-4 text-[18px] placeholder:text-[var(--gray-color-2)] focus:border-[var(--main-color-2)] focus:outline-none"
            placeholder="제목을 입력해 주세요."
          />
          {category === 'challenge' && (
            <div className="absolute top-[8px] right-[10px] z-20">
              <ChallengeSeleteBox
                selected={challengeOption}
                onChange={setChallengeOption}
              />
            </div>
          )}
        </div>
        <div className="relative min-h-[140px] w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="hide-scrollbar absolute inset-0 z-0 h-full w-full resize-none rounded-[10px] border border-[var(--main-color-1)] bg-[var(--white-color)] p-4 pr-[80px] text-[18px] placeholder:text-[var(--gray-color-2)] focus:border-[var(--main-color-2)] focus:outline-none"
            placeholder={
              category === 'myHiddenStore'
                ? '가게: \n메뉴: \n가격: \n위치: '
                : '내용을 입력해 주세요.'
            }
          />

          {/* <Image
            src={boardUploadIcon}
            alt="미리보기"
            width={24}
            height={24}
            className="absolute top-[10px] right-[50px] z-10 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setShowPreview(true)}
          /> */}
          <button
            onClick={() => setShowPreview(true)}
            className="absolute top-[10px] right-[50px] z-10 cursor-pointer text-[14px] hover:text-[var(--point-color-2)]"
          >
            이미지 미리보기
          </button>

          {showPreview && imagesPreview.length && (
            <div
              onClick={() => setShowPreview(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-[70%] max-w-[300px] rounded-[10px] bg-[var(--white-color)] p-4"
              >
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={1}
                  onSlideChange={(swiper) =>
                    setCurrentIndex(swiper.activeIndex)
                  }
                >
                  {imagesPreview.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative mt-[20px] mb-[20px] flex flex-col items-center">
                        <div className="relative">
                          <Image
                            src={item.original}
                            width={150}
                            height={200}
                            alt="미리보기"
                            className="mx-auto h-[200px] w-[150px] rounded-[10px] object-cover"
                          />
                          <button
                            onClick={() => {
                              const newImages = [...imagesPreview];
                              newImages.splice(index, 1);
                              setImagesPreview(newImages);
                              if (newImages.length === 0) {
                                setShowPreview(false);
                              } else if (currentIndex >= newImages.length) {
                                setCurrentIndex(newImages.length - 1);
                              }
                            }}
                            className="absolute top-2 right-2 text-[var(--point-color-1)] hover:text-[var(--point-color-2)]"
                          >
                            <FaTrash size={15} />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            //onChange={handleFileChange}
            className="hidden"
          />
          <Image
            onClick={handleImageClick}
            src={boardUploadIcon}
            alt="이미지 업로드"
            width={24}
            height={24}
            className="absolute top-[10px] right-[10px] z-10 cursor-pointer opacity-70 hover:opacity-100"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-[10px] bottom-[10px] z-10 h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--main-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--main-color-2)] md:text-[16px]"
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
}
