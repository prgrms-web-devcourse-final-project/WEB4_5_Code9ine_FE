'use client';
import DefaultProfile from './DefaultProfile';
import ProgressBar from '../common/ProgressBar';
import Button from './Button';
import { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { UserData } from '@/types/userType';
import { getMyCode, getMyPage, getUserProfile } from '@/api/profile';
import Modal from '../common/Modal';
import Image from 'next/image';
import ProfileSkeleton from './ProfileSkeletion';
import { useTitleStore } from '@/stores/titleStore';

interface ProfileProps {
  profileData?: UserData;
  memberId?: string;
  isPersonal?: boolean;
}

export default function Profile({
  profileData,
  memberId,
  isPersonal = false,
}: ProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(
    profileData || null,
  );
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(!profileData);
  const [error, setError] = useState<string | null>(null);
  const [myData, setMyData] = useState<UserData | null>(null);

  const { equippedTitle } = useTitleStore();

  // 내 정보 가져오기
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await getMyPage();
        setMyData(res.data.data);
      } catch (err) {
        console.log('내 정보 조회 실패', err);
      }
    };
    fetchMyData();
  }, []);

  // 내 프로필인지 판단
  const isMyProfile = Boolean(
    !memberId || (myData && String(myData.memberId) === String(memberId)),
  );

  const showButtons = isMyProfile && !isPersonal;

  useEffect(() => {
    if (profileData) {
      setUserData(profileData);
      if (profileData?.profileImage) {
        setImageUrl(profileData.profileImage);
      } else {
        setImageUrl(null);
      }
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [profileData, memberId]);

  // 유저 데이터 가져오기
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      let res;
      if (memberId && !isMyProfile) {
        // 다른 유저의 프로필 조회
        res = await getUserProfile(memberId);
        // console.log('Other user profile:', res);
      } else {
        // 내 프로필 조회
        res = await getMyPage();
        console.log('My profile:', res);
      }

      const user = res.data?.data || res.data || res;
      setUserData(user);

      if (user?.profileImage) {
        setImageUrl(user.profileImage);
      } else {
        setImageUrl(null);
      }
    } catch (err) {
      console.error('프로필 데이터 에러:', err);
      setError('프로필을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 초대 코드 복사
  const handleCopy = async () => {
    if (!isMyProfile) return;

    try {
      const res = await getMyCode();
      const invitedCode = res.data.inviteCode;
      await navigator.clipboard.writeText(invitedCode);
      setShowCopyModal(true);
    } catch (err) {
      console.log('내 초대 코드 에러', err);
    }
  };

  // 로딩 상태
  if (loading) {
    return <ProfileSkeleton />;
  }

  // 에러 상태
  if (error || !userData) {
    return (
      <div
        className={`${isPersonal ? 'mt-[40px]' : 'mt-[20px]'} ${!showButtons ? 'mt-[45px]' : ''} mb-[20px] flex w-full flex-col items-center justify-center`}
      >
        <p className="text-red-500">{error || '프로필을 찾을 수 없습니다.'}</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={` ${isPersonal ? 'mt-[40px]' : 'mt-[20px]'} ${!showButtons ? 'mt-[45px]' : ''} mb-[20px] flex w-full flex-col items-center justify-center`}
      >
        {/* 프로필 이미지 */}
        {userData.profileImage && imageUrl ? (
          <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[2px] border-[var(--main-color-3)]">
            <Image
              width={120}
              height={120}
              src={imageUrl}
              alt="유저 프로필 이미지"
              priority
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <DefaultProfile />
        )}

        {/* 닉네임과 레벨 */}
        <p className="mt-[10px] text-[20px] font-semibold text-[var(--main-color-3)]">
          {userData.nickname}{' '}
          <span className="text-[16px] font-normal text-[var(--gray-color-2)]">
            LV.{userData.level}
          </span>
        </p>

        {/* 칭호 */}
        <p
          className={`mt-[5px] mb-[7px] text-[16px] ${
            userData.equippedTitle
              ? 'font-semibold text-[var(--text-color)]'
              : 'text-[var(--gray-color-2)]'
          }`}
        >
          {equippedTitle
            ? equippedTitle.name
            : isMyProfile
              ? '칭호를 획득해 보세요!'
              : '칭호가 없습니다'}
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

        {/* 내 프로필이고 개인 페이지가 아닐 때만 표시 */}
        {showButtons && (
          <div className="mt-[10px] flex items-center gap-[10px] text-[16px]">
            <Button
              button={
                <button
                  onClick={() => setIsEditProfile(true)}
                  className="h-[40px] w-[150px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-[#2b2e34] hover:bg-[var(--main-color-2)]"
                >
                  프로필 수정하기
                </button>
              }
            />
            <Button
              button={
                <button
                  onClick={handleCopy}
                  className="h-[40px] w-[150px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-[#2b2e34] hover:bg-[var(--main-color-2)]"
                >
                  내 초대 코드 복사
                </button>
              }
            />
          </div>
        )}

        {/* 프로필 편집 모달 */}
        {isEditProfile && (
          <EditProfile
            onClose={() => setIsEditProfile(false)}
            currentUser={{
              nickname: userData?.nickname || '',
              profileImageUrl: imageUrl || '',
            }}
            onSuccess={() => {
              fetchUserData();
              setIsEditProfile(false);
            }}
          />
        )}

        {/* 초대 코드 복사 완료 모달 */}
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
