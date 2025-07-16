const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://34.60.162.230';

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface AverageSavingResponse {
  totalsaving: number;
}

export interface TopSaver {
  name: string;
}

export interface TopChallenge {
  level: number;
  nickname: string;
  name: string;
}

//평균 지출액
export async function getAverageSaving(): Promise<AverageSavingResponse> {
  const res = await fetch(`${API_BASE}/api/users/average-saving`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const json = (await res.json()) as ApiResponse<AverageSavingResponse>;

  if (!res.ok) {
    throw new Error(json.message || '평균 저축액 조회에 실패했습니다.');
  }

  return json.data;
}

//유저들이 많이 달성한 챌린지3
export async function getTopSavers(): Promise<TopSaver[]> {
  const res = await fetch(`${API_BASE}/api/users/top-savers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const json = (await res.json()) as ApiResponse<TopSaver[]>;

  if (!res.ok) {
    throw new Error(json.message || '상위 세이버 목록 조회에 실패했습니다.');
  }

  return json.data;
}

//티태왕 TOP3
export async function getTopChallenges(): Promise<TopChallenge[]> {
  const res = await fetch(`${API_BASE}/api/users/top-challenges`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<TopChallenge[]>;

  if (!res.ok) {
    throw new Error(json.message || '상위 챌린지 목록 조회에 실패했습니다.');
  }

  return json.data;
}
