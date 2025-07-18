export interface GodplacesSearchList {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  category: string | null;
  type: string;
  contact?: string;
  firstmenu?: string;
  firstprice?: string;
  libraryId?: string;
  festivalId?: string;
  storeId?: string;
}

export interface GodplacesDetail {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  category?: string;
  contact?: string;
  firstmenu?: string;
  firstprice?: string;
  secondmenu?: string;
  secondprice?: string;
  thirdmenu?: string;
  thirdprice?: string;
  target?: string;
  startAt?: string;
  endAt?: string;
  libraryId?: string;
  festivalId?: string;
  storeId?: string;
  url?: string;
}
