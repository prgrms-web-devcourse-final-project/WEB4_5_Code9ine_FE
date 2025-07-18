import moneyIcon from '@/assets/icons/money1.png';
import receipt from '@/assets/icons/receipt.png';
import zeroFood from '@/assets/icons/zero_food _expenses.png';
import zeroTransition from '@/assets/icons/zero_public_transportation.png';
// import prediction from '@/assets/icons/prediction.png';
import heart from '@/assets/icons/10heart.png';
import oneMonth from '@/assets/icons/1_month.png';
import saveMoney from '@/assets/icons/save_money.png';
import friend from '@/assets/icons/friend.png';
import oneMonthAccount from '@/assets/icons/1_month_account.png';
import salary from '@/assets/icons/salary.png';
import noMoney from '@/assets/icons/0_1day.png';
import angel from '@/assets/icons/angel.png';
import detective from '@/assets/icons/detective.png';
import noCafe from '@/assets/icons/no_cafe.png';
import cook from '@/assets/icons/cook.png';

export const missionData = {
  daily: [
    {
      icon: moneyIcon,
      des: '만원으로 하루 살아보기',
      missionTitle: '만원의 행복',
    },
    {
      icon: receipt,
      des: '오늘 사용한 영수증 인증하기',
      missionTitle: '찐 기록러',
    },
    {
      icon: zeroFood,
      des: '하루 식비 0원 달성',
      missionTitle: '소비 단식러',
    },
    {
      icon: zeroTransition,
      des: '하루 교통비 0원 달성',
      missionTitle: '강철 다리',
    },
  ],
  monthly: [
    {
      icon: heart,
      des: '댓글, 좋아요 10개',
      missionTitle: '소통왕',
    },
    {
      icon: oneMonth,
      des: '한 달 출석 체크',
      missionTitle: '개근왕',
    },
    {
      icon: saveMoney,
      des: '지난 달 나보다 덜 쓰기',
      missionTitle: '절약왕',
    },
    {
      icon: friend,
      des: '친구 초대 이벤트',
      missionTitle: '인싸왕',
    },
    {
      icon: oneMonthAccount,
      des: '한달 연속으로 가계부 작성하기',
      missionTitle: '기록 장인',
    },
    {
      icon: salary,
      des: '월급 입력하기',
      missionTitle: '머니 매니저',
    },
  ],
  community: [
    {
      icon: noMoney,
      des: '하루 0원으로 이거까지?',
      missionTitle: '제로 마스터',
    },
    {
      icon: angel,
      des: '착한 가게 방문 인증',
      missionTitle: '착한 소비러',
    },
    {
      icon: detective,
      des: '나가게 글 5개 이상 작성하기',
      missionTitle: '숨.맛.탐',
    },
    {
      icon: noCafe,
      des: '노노 카페 데이',
      missionTitle: '노노 카페',
    },
    {
      icon: cook,
      des: '집밥 세끼',
      missionTitle: '냉털 요리왕',
    },
  ],
};
