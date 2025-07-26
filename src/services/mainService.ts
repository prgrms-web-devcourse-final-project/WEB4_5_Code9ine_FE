const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface AverageSavingResponse {
  averageSaving: number;
}

//평균 지출액
export async function getAverageSaving(): Promise<AverageSavingResponse> {
  const res = await fetch(`${API_BASE}/api/users/average-saving`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const json = (await res.json()) as ApiResponse<AverageSavingResponse>;

  if (!res.ok) {
    throw new Error(json.message || '평균 저축액 조회에 실패했습니다.');
  }

  return json.data;
}

//유저들이 많이 달성한 챌린지3
export interface TopChallenge {
  description: string;
}

export async function getTopChallenges(): Promise<TopChallenge[]> {
  const res = await fetch(`${API_BASE}/api/users/top-challenges`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const json = (await res.json()) as ApiResponse<TopChallenge[]>;

  if (!res.ok) {
    throw new Error(json.message || '챌린지 TOP3 조회에 실패했습니다.');
  }

  return json.data;
}

//티태왕 TOP3
export interface TopSaver {
  memberId: number;
  nickname: string;
  level: number;
  profileImage: string | null;
  name: string;
}

export async function getTopSavers(): Promise<TopSaver[]> {
  const res = await fetch(`${API_BASE}/api/users/top-savers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<TopSaver[]>;

  if (!res.ok) {
    throw new Error(json.message || '티태왕 TOP3 조회에 실패했습니다.');
  }

  return json.data;
}

// 전체 저축액
export interface AllSavingResponse {
  allSaving: number;
}

export async function getAllSaving(): Promise<AllSavingResponse> {
  const res = await fetch(`${API_BASE}/api/users/all-saving`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<AllSavingResponse>;

  if (!res.ok) {
    throw new Error(json.message || '전체 저축액 조회에 실패했습니다.');
  }

  return json.data;
}

//메인페이지 로그인후 가계부분석
export interface GoalItem {
  itemName: string;
  itemImage: string;
  itemPrice: number;
}

export interface MonthlyExpense {
  month: string;
  amount: number;
}

export interface CategorySummary {
  category: string;
  totalAmount: number;
}

export interface BudgetAnalyzeResponse {
  yearMonth: string;
  totalIncome: number;
  totalExpense: number;
  goal: GoalItem;
  currentMonthExpense: number;
  monthlyExpenses: MonthlyExpense[];
  categorySummary: CategorySummary[];
  savedComparedToLastMonth: number;
  totalsavedAmount: number;
}

export async function getBudgetAnalysis(): Promise<BudgetAnalyzeResponse> {
  const res = await fetch(`${API_BASE}/api/budget/analyze`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = (await res.json()) as ApiResponse<BudgetAnalyzeResponse>;

  if (!res.ok) {
    throw new Error(json.message || '가계부 분석 정보를 불러오지 못했습니다.');
  }

  return json.data;
}
