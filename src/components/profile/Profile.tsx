'use client';
import DefaultProfile from './DefaultProfile';
// import Title from './Title';
import ProgressBar from '../common/ProgressBar';
import Button from './Button';
import { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { UserData } from '@/types/userType';
import { getMyCode, getMyPage } from '@/api/profile';
import Modal from '../common/Modal';
import Image from 'next/image';
import { getProfileImg } from '@/lib/utils/getImageUrl';

export default function Profile({
  isPersonal = false,
}: {
  isPersonal?: boolean;
}) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // 유저 데이터
  useEffect(() => {
    getMyPage()
      .then((res) => {
        const user = res.data.data;
        setUserData(user);
        if (user?.profileImage) {
          const url = getProfileImg(user.profileImage);
          console.log('이미지 URL:', url);
          setImageUrl(url);
        } else {
          console.log('이미지 없음');
        }
      })
      .catch((err) => console.log('마이데이터 에러', err));
  }, []);

  // 초대 코드 복사
  const handleCopy = async () => {
    try {
      const res = await getMyCode();
      const invitedCode = res.data.inviteCode;
      // console.log(invitedCode);
      await navigator.clipboard.writeText(invitedCode);
      setShowCopyModal(true);
    } catch (err) {
      console.log('내 초대 코드 에러', err);
    }
  };

  return (
    <>
      <div className="my-[20px] flex w-full flex-col items-center justify-center">
        {userData ? (
          <>
            {userData.profileImage && imageUrl ? (
              <>
                <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[2px] border-[var(--main-color-3)]">
                  <Image
                    width={120}
                    height={120}
                    src={imageUrl}
                    alt="유저 프로필 이미지"
                    priority
                    className="object-cover"
                  />
                </div>
              </>
            ) : (
              <DefaultProfile />
            )}
            <p className="mt-[10px] text-[20px] font-semibold text-[var(--main-color-3)]">
              {userData.nickname}{' '}
              <span className="text-[16px] font-normal text-[var(--gray-color-2)]">
                LV.{userData.level}
              </span>{' '}
            </p>
            <p className="mt-[5px] mb-[7px] text-[16px] font-semibold">
              {/* {userData.equippedTitle} */}
            </p>
            <span className="ml-[120px] text-[12px] text-[var(--gray-color-2)]">
              다음 레벨까지
            </span>
            <ProgressBar
              completed={userData.expProgress}
              width="200px"
              height="20px"
              bgColor="var(--main-color-3)"
              baseBgColor="var(--white-color)"
              labelVisible={true}
            />
          </>
        ) : (
          <p>불러오는 중</p>
        )}

        {!isPersonal && (
          <div className="mt-[10px] flex items-center gap-[10px] text-[16px]">
            <Button
              button={
                <>
                  <button
                    onClick={() => setIsEditProfile(true)}
                    className="h-[40px] w-[150px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] hover:bg-[var(--main-color-2)] dark:text-[#2b2e34]"
                  >
                    프로필 수정하기
                  </button>
                </>
              }
            />
            <Button
              button={
                <>
                  <button
                    onClick={handleCopy}
                    className="h-[40px] w-[150px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] hover:bg-[var(--main-color-2)] dark:text-[#2b2e34]"
                  >
                    내 초대 코드 복사
                  </button>
                </>
              }
            />
          </div>
        )}
        {isEditProfile && (
          <EditProfile onClose={() => setIsEditProfile(false)}></EditProfile>
        )}

        {showCopyModal && (
          <Modal
            title="초대 코드가 복사되었어요!"
            buttons={
              <button
                onClick={() => setShowCopyModal(false)}
                className="cursor-pointer rounded-[10px] bg-[var(--main-color-1)] px-4 py-1 hover:bg-[var(--main-color-3)] dark:text-[#2b2e34]"
              >
                확인
              </button>
            }
          />
        )}
      </div>
    </>
  );
}
