export interface GodplacesSearchList {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  category: string | null;
  type: string;
  contact?: string;
  firstMenu?: string;
  firstPrice?: string;
  libraryId?: number;
  festivalId?: number;
  storeId?: number;
}

export interface GodplacesDetail {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  type: string;
  category?: string;
  contact?: string;
  firstMenu?: string;
  firstPrice?: string;
  secondMenu?: string;
  secondPrice?: string;
  thirdMenu?: string;
  thirdPrice?: string;
  target?: string;
  startAt?: string;
  endAt?: string;
  libraryId?: number;
  festivalId?: number;
  storeId?: number;
  url?: string;
}

export interface Plans {
  id: number;
  type: string;
  firstprice: number;
}

export interface MyBookmark {
  type: string;
  storeId?: number;
  libraryId?: number;
  festivalId?: number;
}
