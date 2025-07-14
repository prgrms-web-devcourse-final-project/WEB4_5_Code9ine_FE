// src/services/authService.ts

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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://34.60.162.230';

async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  const res = await fetch(`${API_BASE}/api/members/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    // 서버에서 내려준 message를 에러로 던집니다.
    throw new Error(json.message || '회원가입에 실패했습니다.');
  }
  return json.data;
}

export { signUp };
