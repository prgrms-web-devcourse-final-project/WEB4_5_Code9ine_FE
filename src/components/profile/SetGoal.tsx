'use client';
import { MdEdit } from 'react-icons/md';
import SetGoalModal from './SetGoalModal';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPage, getUserProfile } from '@/api/profile';
import GoalSkeleton from './GoalSkeleton';

interface ProfileData {
  goalStuff?: string;
  remainPrice?: number;
}

interface SetGoalProps {
  profileData?: ProfileData;
  memberId?: string;
  isMyProfile?: boolean;
  userName?: string;
}

export default function SetGoal({
  profileData,
  memberId,
  isMyProfile = true,
  userName,
}: SetGoalProps) {
  const [isSetModal, setIsSetModal] = useState(false);
  const [otherUserData, setOtherUserData] = useState<ProfileData | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(!isMyProfile);

  // 내 데이터: React Query로 가져옴
  const {
    data: myData,
    isLoading: myLoading,
    refetch,
  } = useQuery({
    queryKey: ['MyPageGoal'],
    queryFn: getMyPage,
    enabled: isMyProfile,
  });

  // 다른 유저 데이터 처리
  useEffect(() => {
    if (isMyProfile) {
      setShowSkeleton(false);
      return;
    }

    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
      if (profileData) {
        setOtherUserData(profileData);
      }
    }, 2000);

    // memberId가 있고 profileData가 없으면 API 호출
    if (memberId && !profileData) {
      const fetchData = async () => {
        try {
          const res = await getUserProfile(memberId);
          const data = res.data?.data || res.data || res;
          setOtherUserData(data);
        } catch (err) {
          console.error('다른 유저 목표 조회 실패', err);
          setOtherUserData(null);
        }
      };
      fetchData();
    }

    return () => clearTimeout(skeletonTimer);
  }, [isMyProfile, profileData, memberId]);

  const loading = isMyProfile ? myLoading : showSkeleton;
  const goalData = isMyProfile ? myData?.data?.data : otherUserData;
  const goalName = goalData?.goalStuff;
  const remainAmount = goalData?.remainPrice;

  if (loading) return <GoalSkeleton />;

  const getMessage = () => {
    if (goalName && remainAmount !== undefined) {
      if (isMyProfile) {
        return (
          <>
            {goalName}까지
            <span className="text-[var(--main-color-3)]">
              {' '}
              {Math.floor(remainAmount).toLocaleString()}원
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
            </span>
          </>
        );
      }
    } else {
      return isMyProfile
        ? '아직 목표가 없어요. 목표를 설정해보아요!'
        : `${userName || '사용자'}님은 아직 설정한 목표가 없어요.`;
    }
  };

  return (
    <div className="relative mt-[20px] flex h-[40px] w-full items-center justify-center bg-[var(--main-color-1)]">
      <h1 className="ml-[10px] gap-[40px] text-[16px] text-[#2b2e34] md:text-[20px]">
        {getMessage()}
      </h1>

      {isMyProfile && (
        <button
          className="absolute right-3 cursor-pointer text-[var(--white-color)] hover:text-[var(--main-color-3)] dark:text-[var(--gray-color-2)]"
          onClick={() => setIsSetModal(true)}
        >
          <MdEdit size={20} />
        </button>
      )}

      {isMyProfile && isSetModal && (
        <SetGoalModal
          onClose={() => setIsSetModal(false)}
          onGoalSet={() => {
            refetch();
            setIsSetModal(false);
          }}
        />
      )}
    </div>
  );
}
