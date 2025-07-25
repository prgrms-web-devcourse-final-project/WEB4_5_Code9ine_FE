// import AiChat from '@/components/accountbook/AiChat';
// import Calander from '@/components/accountbook/Calander';
// import ListArea from '@/components/accountbook/ListArea';

import { API_ADD } from '@/api/accountApi';
import Page from '@/components/accountbook/Page';
import { cookies } from 'next/headers';

export default async function page() {
  const accessToken = (await cookies())
  console.log(accessToken);
  const setData = await fetch(`${API_ADD}/api/budget/totaldetails`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });

  const receivedTotalData = await setData.json();

  console.log(receivedTotalData);
  return (
    <div className="h-[702px] min-w-[350px] md:h-[870px] md:w-[1121px]">
      <Page totalData={receivedTotalData} />
    </div>
  );
}
