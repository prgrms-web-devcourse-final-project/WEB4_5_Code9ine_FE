// import AiChat from '@/components/accountbook/AiChat';
// import Calander from '@/components/accountbook/Calander';
// import ListArea from '@/components/accountbook/ListArea';

import Page from '@/components/accountbook/Page';
import { API_ADD } from '@/lib/api/api';

export async function setData() {
  const res = await fetch(API_ADD + 'api/budget/totaldetails', {
    cache: 'force-cache',
  });
  return res.json();
}

export default async function page() {
  const receivedTotalData = await setData();

  return (
    <div className="h-[702px] min-w-[350px] md:h-[870px] md:w-[1121px]">
      <Page totalData={receivedTotalData} />
    </div>
  );
}
