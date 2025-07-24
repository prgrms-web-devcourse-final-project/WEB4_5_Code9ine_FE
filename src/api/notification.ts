const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const Access_Token = process.env.NEXT_PUBLIC_API_KEY;

export interface NotificationTitle {
  notificationId: number;
  message: string;
  read: boolean;
  type: string;
}

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export async function getNotificationTitles(): Promise<NotificationTitle[]> {
  const res = await fetch(`${API_BASE}/api/notifications/title`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Access_Token}`,
    },
  });

  const json = (await res.json()) as ApiResponse<NotificationTitle[]>;

  if (!res.ok || json.code !== '2000') {
    throw new Error(json.message || '칭호 알림을 불러오지 못했습니다.');
  }

  return json.data;
}
