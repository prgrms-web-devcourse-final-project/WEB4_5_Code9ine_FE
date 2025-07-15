const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://34.60.162.230';

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface AverageSavingResponse {
  totalsaving: number;
}

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
