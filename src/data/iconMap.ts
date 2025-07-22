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
import type { StaticImageData } from 'next/image';

export const iconMap: Record<string, StaticImageData> = {
  moneyIcon,
  receipt,
  zeroFood,
  zeroTransition,
  heart,
  oneMonth,
  saveMoney,
  friend,
  oneMonthAccount,
  salary,
  noMoney,
  angel,
  detective,
  noCafe,
  cook,
} as const;
