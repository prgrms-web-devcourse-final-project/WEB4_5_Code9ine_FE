// /auth/kakao/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function KakaoCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      toast.error('인가 코드가 없습니다.');
      router.push('/login');
      return;
    }

    const kakaoLogin = async () => {
      try {
        console.log(code);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members/login/kakao`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          },
        );

        const json = await res.json();

        if (json.code !== '0000') throw new Error(json.message);

        // 로그인 성공 시 토큰 저장
        const { accessToken, refreshToken, nickname } = json.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        toast.success(`${nickname}님 환영합니다!`);
        router.push('/');
      } catch (err) {
        const msg = err instanceof Error ? err.message : '카카오 로그인 실패';
        toast.error(msg);
        router.push('/login');
      }
    };

    kakaoLogin();
  }, [router]);

  return <p className="mt-10 text-center text-lg">로그인 중입니다...</p>;
}
