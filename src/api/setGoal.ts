import { SetGoalData } from '@/types/userType';
export async function setGoal(
  goalStuff: string,
  goalAmount: number,
): Promise<SetGoalData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members/mypage/goal`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ goalStuff, goalAmount }),
    },
  );
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}
// "goal" : [
//     goalStuff:string;
//     goalAmount : string;
// ]
