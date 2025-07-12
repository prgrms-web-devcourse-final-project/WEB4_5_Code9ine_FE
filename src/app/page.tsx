'use client';
import ColoredBox from '@/components/layout/coloredBox';
import AuthorizedMain from '@/components/main/AuthorizedMain';
import UnAuthorizedMain from '@/components/main/UnAuthorizedMain';
import { useState } from 'react';

export default function Page() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const handleLogin = (login: boolean) => {
    setLoginState(login);
  };
  return (
    <>
      <ColoredBox changeLogin={handleLogin} />
      {/* <h1>Home Component</h1> */}
      {!loginState ? <UnAuthorizedMain /> : <AuthorizedMain />}
    </>
  );
}
