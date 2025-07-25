const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

//회원가입
export interface SignUpPayload {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  inviteCode: string;
}

export interface SignUpResponse {
  userId: number;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export async function signUp(
  payload: SignUpPayload,
): Promise<{ message: string; data: SignUpResponse }> {
  const res = await fetch(`${API_BASE}/api/members/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json: ApiResponse<SignUpResponse> = await res.json();

  if (!res.ok || json.code !== '0001') {
    throw new Error(json.message || '회원가입에 실패했습니다.');
  }

  return {
    message: json.message,
    data: json.data,
  };
}
/* 로그인 */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  grantType: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export async function login(
  payload: LoginPayload,
): Promise<{ message: string; data: LoginResponse }> {
  const res = await fetch(`${API_BASE}/api/members/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '0000') {
    throw new Error(json.message || '로그인에 실패했습니다.');
  }

  return {
    message: json.message,
    data: json.data.data,
  };
}

//닉네임 중복

export interface NicknameCheckPayload {
  nickname: string;
}

export interface NicknameCheckResponse {
  available: boolean;
}

export async function checkNickname(
  payload: NicknameCheckPayload,
): Promise<NicknameCheckResponse> {
  const res = await fetch(`${API_BASE}/api/members/nickname/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || '닉네임 중복 확인에 실패했습니다.');
  }
  // json.data = { available: boolean }
  return json.data;
}

//이메일 중복확인
export interface EmailCheckPayload {
  email: string;
}

export interface EmailCheckResponse {
  available: boolean;
}

export async function checkEmail(
  payload: EmailCheckPayload,
): Promise<EmailCheckResponse> {
  const res = await fetch(`${API_BASE}/api/members/email/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || '이메일 중복 확인에 실패했습니다.');
  }
  return json.data;
}

// 비밀번호찾기

export interface PasswordFindPayload {
  email: string;
}

export interface PasswordFindResponse {
  code: number;
  message: string;
}

export async function findPassword(
  payload: PasswordFindPayload,
): Promise<PasswordFindResponse> {
  const res = await fetch(`${API_BASE}/api/members/password/find`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '0000') {
    throw new Error(json.message || '비밀번호 찾기에 실패했습니다.');
  }

  // json.data = { code: 2000, message: "비밀번호 찾기 메일이 발송되었습니다." }
  return json.data;
}

//이메일인증코드요청
export interface EmailSendResponse {
  code: number;
  message: string;
  data: null;
}

export async function sendEmailVerification(
  email: string,
): Promise<ApiResponse<EmailSendResponse>> {
  const res = await fetch(`${API_BASE}/api/members/email/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const json: ApiResponse<EmailSendResponse> = await res.json();

  if (!res.ok || json.code !== '0000') {
    throw new Error(json.data?.message || json.message || '이메일 전송 실패');
  }

  return json;
}

// 요청코드 검증
export interface EmailVerifyPayload {
  email: string;
  code: string;
}

export interface ApiNestedResponse {
  code: number;
  message: string;
  data: string;
}

export async function verifyEmailCode(
  payload: EmailVerifyPayload,
): Promise<{ message: string; data: { message: string } }> {
  const res = await fetch(`${API_BASE}/api/members/email/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '0000') {
    throw new Error(
      json.data?.message || json.message || '이메일 인증에 실패했습니다.',
    );
  }

  return {
    message: json.message,
    data: json.data,
  };
}

// 아이디찾기
export interface FindEmailPayload {
  name: string;
  phoneNumber: string;
}

export interface FindEmailResponse {
  emails: string[];
}

export async function findEmail(
  payload: FindEmailPayload,
): Promise<{ message: string; data: FindEmailResponse }> {
  const res = await fetch(`${API_BASE}/api/members/email/find`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '0000') {
    throw new Error(json.message || '아이디 찾기에 실패했습니다.');
  }

  return {
    message: json.message,
    data: json.data,
  };
}

// 로그아웃
export async function logout(): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/members/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const json = await res.json();

  if (!res.ok || json.code !== '0000') {
    throw new Error(json.message || '로그아웃 실패');
  }

  return { message: json.message };
}

// 구글로그인
// export async function getGoogleLoginRedirect(): Promise<void> {
//   try {
//     const res = await fetch(`${API_BASE}/oauth2/authorization/google`, {
//       method: 'GET',
//       credentials: 'include',
//     });

//     // 리다이렉트 응답이 오면 URL로 이동
//     if (res.redirected) {
//       window.location.href = res.url;
//     } else {
//       const data = await res.json();
//       console.error('리다이렉트되지 않음:', data);
//     }
//   } catch (error) {
//     console.error('구글 로그인 리다이렉트 실패', error);
//   }
// }

export function getGoogleLoginRedirect(): void {
  window.location.href = `${API_BASE}/oauth2/authorization/google`;
}
