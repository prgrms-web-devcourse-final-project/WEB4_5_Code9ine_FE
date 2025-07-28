import GoogleLoginCallbackPage from '@/components/GoogleLoginCallbackPage/page';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>로그인 처리 중...</p>}>
      <GoogleLoginCallbackPage />
    </Suspense>
  );
}
