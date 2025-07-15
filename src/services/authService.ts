export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  accessToken: string;
  grantType: string;
  expiresIn: number;
}

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

export interface NicknameCheckPayload {
  nickname: string;
}

export interface NicknameCheckResponse {
  available: boolean;
}

export interface EmailCheckPayload {
  email: string;
}

export interface EmailCheckResponse {
  available: boolean;
}
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://34.60.162.230';

/* 회원가입 */
export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  const res = await fetch(`${API_BASE}/api/members/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || '회원가입에 실패했습니다.');
  }
  return json.data;
}

/* 로그인 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/members/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || '로그인에 실패했습니다.');
  }
  return json.data.data as LoginResponse;
}

//닉네임 중복
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
