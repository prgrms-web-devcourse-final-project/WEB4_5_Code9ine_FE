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
import toast from 'react-hot-toast';
import { MyInfo } from '@/types/boardType';
import defaultProfile from '../../assets/profile.png';

interface PostWriteFormProps {
  category: 'MY_STORE' | 'CHALLENGE' | 'FREE';
  onSuccess?: () => void;
}

export default function PostWriteForm({
  category,
  onSuccess,
}: PostWriteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [challengeOption, setChallengeOption] = useState<string | null>(null);

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [showPreview, setShowPreview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [imagesPreview, setImagesPreview] = useState<
    { original: string; uploaded?: string }[]
  >([]);
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const me = await boardApi.getMyInfo();
        setMyInfo(me);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMe();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('제목을 입력해주세요!');
      titleRef.current?.focus();
      return;
    }

    if (!content.trim()) {
      toast.error('내용을 입력해주세요!');
      contentRef.current?.focus();
      return;
    }

    if (category === 'CHALLENGE' && !challengeOption) {
      toast.error('챌린지 종류를 선택해주세요!');
      return;
    }

    try {
      await boardApi.postBoardCreate({
        title,
        content,
        category,
        imageUrls,
        challengeCategory: challengeOption,
      });
      toast.success('게시글이 등록되었어요!');
      onSuccess?.();
      setTitle('');
      setContent('');
      setImageUrls([]);
      setImagesPreview([]);
      setChallengeOption(null);
    } catch (err) {
      console.error(err);
      toast.error('게시글 작성에 실패했어요');
    }
  };

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const totalImages = imageUrls.length + files.length;
    if (totalImages > 5) {
      toast.error('이미지는 최대 5장까지 업로드할 수 있어요');
      return;
    }

    const today = new Date();
    const yyyyMMdd = today.toISOString().slice(0, 10).replace(/-/g, '');
    const folderPath = 'uploads/board/' + yyyyMMdd;

    const newPreviews: { original: string; uploaded?: string }[] = [];
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      const localPreview = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      newPreviews.push({ original: localPreview });

      try {
        const imageUrl = await boardApi.uploadToCloudinary(file, folderPath);
        newUrls.push(imageUrl);
      } catch (err) {
        console.log(err);
        toast.error('이미지 업로드에 실패했어요');
      }
    }

    setImagesPreview((prev) => [...prev, ...newPreviews]);
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

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
          src={myInfo?.userProfileImg || defaultProfile}
          alt="프로필"
          width={70}
          height={70}
          className="h-[30px] w-[30px] rounded-full border-2 border-[var(--main-color-2)] object-cover md:h-[70px] md:w-[70px]"
        />

        <div className="flex flex-row items-baseline gap-1 whitespace-nowrap md:flex-col md:items-center">
          <div className="ml-[8px] text-center text-[20px] leading-none">
            {myInfo?.userNickname || ''}
          </div>
          <div className="text-center text-[14px] leading-none text-[var(--text-color-2)] md:text-[16px]">
            {myInfo?.userTitle || ''}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="relative">
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-[50px] w-full rounded-[10px] border border-[var(--main-color-1)] bg-[var(--white-color)] p-4 text-[18px] placeholder:text-[var(--gray-color-2)] focus:border-[var(--main-color-2)] focus:outline-none"
            placeholder="제목을 입력해 주세요."
          />
          {category === 'CHALLENGE' && (
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
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="hide-scrollbar absolute inset-0 z-0 h-full w-full resize-none rounded-[10px] border border-[var(--main-color-1)] bg-[var(--white-color)] p-4 pr-[80px] text-[18px] placeholder:text-[var(--gray-color-2)] focus:border-[var(--main-color-2)] focus:outline-none"
            placeholder={
              category === 'MY_STORE'
                ? '가게: \n메뉴: \n가격: \n위치: '
                : '내용을 입력해 주세요.'
            }
          />

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
                              setImagesPreview((prev) => {
                                const newPreviews = [...prev];
                                newPreviews.splice(index, 1);

                                if (newPreviews.length === 0) {
                                  setShowPreview(false);
                                } else if (currentIndex >= newPreviews.length) {
                                  setCurrentIndex(newPreviews.length - 1);
                                }

                                return newPreviews;
                              });

                              setImageUrls((prev) => {
                                const newUrls = [...prev];
                                newUrls.splice(index, 1);
                                return newUrls;
                              });
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
            onChange={handleFileChange}
            className="hidden"
            multiple
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
