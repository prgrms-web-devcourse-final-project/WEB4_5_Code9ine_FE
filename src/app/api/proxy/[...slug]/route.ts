import { NextRequest, NextResponse } from 'next/server';

// 실제 백엔드 주소
const REAL_BACKEND_URL = 'https://titae.cedartodo.uk';

/**
 * 모든 HTTP 메서드를 처리하는 공통 핸들러 함수
 */
const handler = async (
  req: NextRequest,
  { params }: { params: { slug: string[] } },
) => {
  // 1. slug 배열을 합쳐서 경로를 만듭니다. (예: ['members', '123'] -> 'members/123')
  const path = params.slug.join('/');

  // 2. 백엔드가 기대하는 최종 URL 경로를 재구성합니다. '/api/'를 다시 붙여줍니다.
  const finalPath = `/api/${path}`;
  const url = new URL(finalPath, REAL_BACKEND_URL);

  url.search = req.nextUrl.search;

  // 3. (디버깅용) 최종 요청 URL이 올바른지 터미널에서 확인합니다.
  console.log('➡️ Forwarding request to:', url.href);

  // 4. 실제 백엔드로 요청을 보냅니다.
  const realBackendResponse = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
    redirect: 'manual', // 리다이렉트는 수동으로 처리
    duplex: 'half',
  } as any);

  // 5. 백엔드의 응답 헤더를 기반으로 새로운 헤더 객체를 생성합니다.
  const responseHeaders = new Headers(realBackendResponse.headers);
  // 기존의 Set-Cookie 헤더는 직접 수정하기 위해 일단 삭제합니다.
  responseHeaders.delete('set-cookie');

  // 6. 백엔드가 보낸 모든 Set-Cookie 헤더를 배열로 가져옵니다.
  //    Next.js의 Node.js 런타임 환경에서 .getSetCookie()를 사용합니다.
  const cookies = (realBackendResponse.headers as any).getSetCookie?.();

  // 7. 쿠키가 있다면 각 쿠키를 순회하며 속성을 수정합니다.
  if (cookies && Array.isArray(cookies)) {
    cookies.forEach((cookie: string) => {
      const modifiedCookie = cookie
        .replace(/domain=.*?(;|$)/gi, '') // Domain 속성 제거
        .replace(/samesite=none;?/gi, 'SameSite=Lax;') // Secure 속성 제거 (http://localhost 용)
        .replace(/path=.*?(;|$)/gi, 'path=/;'); // Path를 최상위 경로 '/'로 강제 설정

      // 수정된 쿠키를 새로운 헤더에 '추가'합니다 (덮어쓰기 방지).
      responseHeaders.append('set-cookie', modifiedCookie);
    });
  }

  // 8. 최종적으로 수정된 헤더와 함께 응답을 생성하여 클라이언트에 전달합니다.
  return new NextResponse(realBackendResponse.body, {
    status: realBackendResponse.status,
    statusText: realBackendResponse.statusText,
    headers: responseHeaders,
  });
};

// GET, POST, PUT, DELETE 등 필요한 모든 메서드에 동일한 핸들러를 연결합니다.
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
