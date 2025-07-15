'use client';
import ColoredBox from '@/components/layout/coloredBox';
import AuthorizedMain from '@/components/main/AuthorizedMain';
import UnAuthorizedMain from '@/components/main/UnAuthorizedMain';
import { useDummyData } from '@/stores/dummyStore';
import { useEffect, useState } from 'react';

export default function Page() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const {isLogin} = useDummyData()
  useEffect(() => {
    setLoginState(isLogin)
  },[isLogin])
  return (
    <>
      <ColoredBox />
      {/* <h1>Home Component</h1> */}
      {!loginState ? <UnAuthorizedMain /> : <AuthorizedMain />}
    </>
  );
}
