const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export interface NotificationTitle {
  notificationId: number;
  message: string;
  read: boolean;
  type: string;
  aTId: number;
  senderId?: number;
}

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// 칭호 알림
export async function getNotificationTitles(): Promise<NotificationTitle[]> {
  const res = await fetch(`${API_BASE}/api/notifications/title`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<NotificationTitle[]>;

  if (!res.ok || json.code !== '2000') {
    throw new Error(json.message || '칭호 알림을 불러오지 못했습니다.');
  }

  return json.data;
}

// 커뮤니티 좋아요
export async function getLikeNotifications(): Promise<NotificationTitle[]> {
  const res = await fetch(`${API_BASE}/api/notifications/like`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<NotificationTitle[]>;

  if (!res.ok || json.code !== '2000') {
    throw new Error(json.message || '좋아요 알림을 불러오지 못했습니다.');
  }

  return json.data;
}

// 커뮤니티 댓글
export async function getCommentNotifications(): Promise<NotificationTitle[]> {
  const res = await fetch(`${API_BASE}/api/notifications/comment`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<NotificationTitle[]>;

  if (!res.ok || json.code !== '2000') {
    throw new Error(json.message || '댓글 알림을 불러오지 못했습니다.');
  }

  return json.data;
}

// 알림 읽음처리
export async function markNotificationAsRead(
  notificationId: number,
): Promise<void> {
  const res = await fetch(
    `${API_BASE}/api/notifications/${notificationId}/read`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const json = (await res.json()) as ApiResponse<null>;
  if (!res.ok || json.code !== '2000') {
    throw new Error(json.message || '알림 읽음 처리에 실패했습니다.');
  }
}

// 칭호 즉시장착

export interface EquippedTitleResponse {
  equippedTitle: string;
  achievedTitles: string[];
}

export async function equipTitle(aTId: number): Promise<EquippedTitleResponse> {
  const res = await fetch(`${API_BASE}/api/members/titles/equip`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ aTId: aTId }),
  });

  const json = (await res.json()) as ApiResponse<EquippedTitleResponse>;

  if (!res.ok) {
    throw new Error(json.message || '칭호 장착에 실패했습니다.');
  }

  return json.data;
}

// 알림 전체 읽음 처리
export async function markAllNotificationsAsRead(): Promise<void> {
  const res = await fetch(`${API_BASE}/api/notifications/read-all`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<null>;

  if (!res.ok) {
    throw new Error(json.message || '전체 알림 읽음 처리에 실패했습니다.');
  }
}
