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
  dummy: {
    id: number;
    type: string;
    category: string;
    categoryIcon: string;
    content: string;
    date: string;
    price: number;
    repeatCycle: string;
  }[];
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

export interface CalendarList {
  totalIncome: number;
  totalExpense: number;
  month: string;
  days: {
    id: number;
    date: string;
    income: number;
    expense: number;
    difference: number;
  }[];
}
