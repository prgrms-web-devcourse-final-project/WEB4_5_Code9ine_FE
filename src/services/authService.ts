const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

//회원가입
export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
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
): Promise<ApiResponse<SignUpResponse>> {
  const res = await fetch(`${API_BASE}/api/members/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '2010') {
    throw new Error(json.message || '회원가입에 실패했습니다.');
  }

  return json; // { code, message, data: { userId } }
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
): Promise<ApiResponse<LoginResponse>> {
  const res = await fetch(`${API_BASE}/api/members/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '2000') {
    throw new Error(json.message || '로그인에 실패했습니다.');
  }

  return json;
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
): Promise<ApiResponse<ApiNestedResponse>> {
  const res = await fetch(`${API_BASE}/api/members/email/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '0000' || json.data.code !== 2000) {
    throw new Error(
      json.data?.message || json.message || '이메일 인증에 실패했습니다.',
    );
  }

  return json;
}

// 아이디찾기
export interface FindEmailRequest {
  name: string;
  phoneNumber: string;
}

export interface FindEmailResponse {
  emails: string[];
}

export async function findEmail(
  payload: FindEmailRequest,
): Promise<FindEmailResponse> {
  const res = await fetch(`${API_BASE}/api/members/email/find`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.code !== '2000') {
    throw new Error(json.message || '이메일 찾기에 실패했습니다.');
  }

  return json.data as FindEmailResponse;
}
