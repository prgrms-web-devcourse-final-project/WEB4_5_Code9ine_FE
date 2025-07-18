export async function deleteProfile(): Promise<{
  code: string;
  message: string;
  data: object;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members/withdraw`,
    {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        //  Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}
