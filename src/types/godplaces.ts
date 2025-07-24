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
  libraryId?: string;
  festivalId?: string;
  storeId?: string;
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
  libraryId?: string;
  festivalId?: string;
  storeId?: string;
  url?: string;
}

export interface Plans {
  id: string;
  type: string;
  firstprice: number;
}
