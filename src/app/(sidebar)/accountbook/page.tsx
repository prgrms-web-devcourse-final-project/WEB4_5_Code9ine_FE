// import AiChat from '@/components/accountbook/AiChat';
// import Calander from '@/components/accountbook/Calander';
// import ListArea from '@/components/accountbook/ListArea';

import { API_ADD, setData } from '@/api/accountApi';
import Page from '@/components/accountbook/Page';

export default async function page() {
  const receivedTotalData = await setData();

  fetch(API_ADD + `/api/members/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'testuser1@example.com',
      password: 'test',
    }),
  });

  console.log(receivedTotalData);
  return (
    <div className="h-[702px] min-w-[350px] md:h-[870px] md:w-[1121px]">
      <Page totalData={receivedTotalData} />
    </div>
  );
}
