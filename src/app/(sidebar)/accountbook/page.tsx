// import AiChat from '@/components/accountbook/AiChat';
// import Calander from '@/components/accountbook/Calander';
// import ListArea from '@/components/accountbook/ListArea';

import Page from '@/components/accountbook/Page';
import { cookies } from 'next/headers';

export default async function page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const setData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL2}/api/budget/totaldetails`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const receivedTotalData = await setData.json();
  return (
    <div className="h-[702px] min-w-[350px] md:h-[870px] md:w-[1121px]">
      <Page totalData={receivedTotalData} />
    </div>
  );
}
