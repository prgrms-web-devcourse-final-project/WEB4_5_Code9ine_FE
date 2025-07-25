import {
  BookmarkData,
  GetMyPageData,
  myCodeCopy,
  ChallengeData,
  SetGoalData,
  BookmarkPostData,
  changeInfoData,
} from '@/types/userType';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const AUTHORIZATION = process.env.NEXT_PUBLIC_API_KEY;

// 유저데이터 조회
export async function getMyPage(): Promise<GetMyPageData> {
  const res = await fetch(`${API_BASE_URL}/api/members/mypage`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${AUTHORIZATION}`,
    },
  });
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

// 내 초대 코드
export async function getMyCode(): Promise<myCodeCopy> {
  const res = await fetch(`${API_BASE_URL}/api/members/invite-code`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${AUTHORIZATION}`,
    },
  });
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

// 챌린지 전체 조회
export async function getChallenge(): Promise<ChallengeData> {
  const res = await fetch(
    `${API_BASE_URL}/api/members/mypage/challenges/dashboard`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        // Authorization: `Bearer ${AUTHORIZATION}`,
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

// 목표 설정
export async function setGoal(
  goalStuff: string,
  goalAmount: number,
): Promise<SetGoalData> {
  const res = await fetch(`${API_BASE_URL}/api/members/mypage/goal`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${AUTHORIZATION}`,
    },
    body: JSON.stringify({ goalStuff, goalAmount }),
  });
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

// 내가 쓴 글
export async function getMyThreads(): Promise<BookmarkPostData> {
  const res = await fetch(
    `${API_BASE_URL}/api/members/mypage/posts?page=0&size=10`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        // Authorization: `Bearer ${AUTHORIZATION}`,
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
// 내가 찜한 글
export async function getBookmarkedThreads(): Promise<BookmarkPostData> {
  const res = await fetch(`${API_BASE_URL}/api/members/bookmarks/posts`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      accept: 'application/json',

      // Authorization: `Bearer ${AUTHORIZATION}`,
    },
  });
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

// 내가 찜한 갓플
export async function getBookmarkedPlaces(): Promise<BookmarkData> {
  const res = await fetch(`${API_BASE_URL}/api/members/bookmarks/places`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${AUTHORIZATION}`,
    },
  });
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

// 계정 삭제
export async function deleteProfile(): Promise<{
  code: string;
  message: string;
  data: object;
}> {
  const res = await fetch(`${API_BASE_URL}/api/members/withdraw`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      //  Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

// 프로필 정보 변경
export async function changeInfo(
  nickname: string,
  profileImage: string,
  newPassword: string,
): Promise<changeInfoData> {
  const res = await fetch(`${API_BASE_URL}/api/members/mypage/profile`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${AUTHORIZATION}`,
    },
    body: JSON.stringify({
      nickname,
      profileImage,
      newPassword,
    }),
  });

  if (!res.ok) {
    throw new Error(`프로필 정보 변경 실패: ${res.status}`);
  }

  const result = await res.json();
  return result;
}
