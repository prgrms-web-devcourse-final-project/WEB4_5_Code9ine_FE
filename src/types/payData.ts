export interface PayList {
  id: number;
  type: string;
  category: string;
  categoryIcon: string;
  content: string;
  date: string;
  price: number;
  repeatCycle: string;
}

export interface DataList {
  yearMonth: string;
  totalIncome: number;
  totalExpense: number;
  totalDifference: number;
  dummy: PayList[];
}

export interface DummyData {
  id: number;
  type: string;
  category: string;
  categoryIcon: string;
  content: string;
  date: string;
  price: number;
  repeatCycle: string;
}

export interface DailySummary {
  date: string;
  income: number;
  expense: number;
  difference: number;
}

export interface CalendarList {
  code: string;
  message: string;
  data: {
    month: string;
    totalIncome: number;
    totalExpense: number;
    days: DailySummary[];
  };
}

export interface totalData {
  code: string;
  message: string;
  data: {
    yearMonth: string;
    totalIncome: number;
    totalExpense: number;
    details: PayList[];
  };
}

export interface Chatting {
  user: boolean;
  message: string;
}

export interface Response {
  savingTips: string;
  aboveAverageSpending: string;
  overIncomeSpending: string;
  highestSpendingCategory: string;
  savableCategories: string;
  moneySavingAreas: string;
}
