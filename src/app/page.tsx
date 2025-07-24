'use client';
import { API_ADD } from '@/api/accountApi';
import ColoredBox from '@/components/layout/coloredBox';
import AuthorizedMain from '@/components/main/AuthorizedMain';
import UnAuthorizedMain from '@/components/main/UnAuthorizedMain';
import { useAccountData } from '@/stores/accountStore';
import { useEffect, useState } from 'react';

export default function Page() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const { isLogin } = useAccountData();
  useEffect(() => {
    setLoginState(isLogin);
  }, [isLogin]);

  fetch(API_ADD + `/api/members/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'testuser1@example.com',
      password: 'test',
    }),
  });

  return (
    <>
      <ColoredBox />
      {/* <h1>Home Component</h1> */}
      {!loginState ? <UnAuthorizedMain /> : <AuthorizedMain />}
    </>
  );
}
