'use client';
import { MdEdit } from 'react-icons/md';
import SetGoalModal from './SetGoalModal';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPage, getUserProfile } from '@/api/profile';

interface ProfileData {
  goalStuff?: string;
  remainPrice?: number;
}

interface SetGoalProps {
  profileData?: ProfileData; // 서버에서 받아온 프로필 데이터
  memberId?: string; // 다른 유저의 ID
  isMyProfile?: boolean; // 내 프로필 여부
  userName?: string; // 다른 유저의 이름
}

export default function SetGoal({
  profileData,
  memberId,
  isMyProfile = true,
  userName,
}: SetGoalProps) {
  const [isSetmodal, setIsSetModal] = useState(false);
  const [otherUserData, setOtherUserData] = useState<ProfileData | null>(
    profileData || null,
  );
  const [otherUserLoading, setOtherUserLoading] = useState(
    !profileData && !isMyProfile,
  );

  // 내 프로필 데이터
  const {
    data: myData,
    isLoading: myLoading,
    refetch,
  } = useQuery({
    queryKey: ['MyPageGoal'],
    queryFn: getMyPage,
    enabled: Boolean(isMyProfile),
  });

  // profileData
  useEffect(() => {
    if (profileData && !isMyProfile) {
      setOtherUserData(profileData);
      setOtherUserLoading(false);
    }
  }, [profileData, isMyProfile]);

  // 다른 유저 데이터 가져오기
  useEffect(() => {
    const fetchOtherUserData = async () => {
      if (!memberId || isMyProfile || profileData) return;

      try {
        setOtherUserLoading(true);
        const res = await getUserProfile(memberId);
        setOtherUserData(res.data?.data || res.data || res);
      } catch (err) {
        console.log('다른 유저 목표 조회 실패', err);
      } finally {
        setOtherUserLoading(false);
      }
    };

    fetchOtherUserData();
  }, [memberId, isMyProfile, profileData]);

  // 데이터 결정
  const goalData = isMyProfile ? myData?.data?.data : otherUserData;
  const loading = isMyProfile ? myLoading : otherUserLoading;

  const goalName = goalData?.goalStuff;
  const remainAmount = goalData?.remainPrice;

  // 로딩 상태
  if (loading) {
    return (
      <div className="relative mt-[20px] flex h-[40px] w-full animate-pulse items-center justify-center bg-[var(--background)]">
        <div className="h-[20px] w-[70%] rounded bg-[var(--skeleton-bg)]" />
      </div>
    );
  }
  // 메시지 결정
  const getMessage = () => {
    if (goalName && remainAmount) {
      if (isMyProfile) {
        return (
          <>
            {goalName}까지
            <span className="text-[var(--main-color-3)]">
              {' '}
              {(remainAmount / 10000).toLocaleString()}만원
            </span>{' '}
            남았어요. 끝까지 화이팅!
          </>
        );
      } else {
        const displayName = userName || '사용자';
        return (
          <>
            {displayName}님의 목표: {goalName}까지
            <span className="text-[var(--main-color-3)]">
              {' '}
              {(remainAmount / 10000).toLocaleString()}만원
            </span>{' '}
          </>
        );
      }
    } else {
      if (isMyProfile) {
        return '아직 목표가 없어요. 목표를 설정해보아요!';
      } else {
        const displayName = userName || '사용자';
        return `${displayName}님은 아직 목표가 없어요.`;
      }
    }
  };

  return (
    <>
      <div className="relative mt-[20px] flex h-[40px] w-full items-center justify-center bg-[var(--main-color-1)] md:items-center md:justify-center">
        <h1 className="ml-[10px] gap-[40px] text-[16px] md:text-[20px] dark:text-[#2b2e34]">
          {getMessage()}
        </h1>

        {/* 편집 버튼 (내 프로필에서만 표시) */}
        {isMyProfile && (
          <button className="absolute right-3 cursor-pointer text-[var(--white-color)] hover:text-[var(--main-color-3)] dark:text-[var(--gray-color-2)]">
            <MdEdit size={20} onClick={() => setIsSetModal(true)} />
          </button>
        )}

        {/* 목표 설정 모달 (내 프로필에서만) */}
        {isMyProfile && isSetmodal && (
          <SetGoalModal
            onClose={() => {
              setIsSetModal(false);
            }}
            onGoalSet={() => {
              refetch();
              setIsSetModal(false);
            }}
          />
        )}
      </div>
    </>
  );
}
