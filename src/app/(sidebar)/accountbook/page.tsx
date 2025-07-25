// import AiChat from '@/components/accountbook/AiChat';
// import Calander from '@/components/accountbook/Calander';
// import ListArea from '@/components/accountbook/ListArea';

import { API_ADD } from '@/api/accountApi';
import Page from '@/components/accountbook/Page';

export default async function page() {
  const setData = await (
    await fetch(`${API_ADD}/api/budget/totaldetails`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    })
  ).json();

  const receivedTotalData = setData;

  console.log(receivedTotalData);
  return (
    <div className="h-[702px] min-w-[350px] md:h-[870px] md:w-[1121px]">
      <Page totalData={receivedTotalData} />
    </div>
  );
}
