import { ChallengeData } from '@/types/userType';
export async function getChallenge(): Promise<ChallengeData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members/mypage/challenges/dashboard`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  );
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}
