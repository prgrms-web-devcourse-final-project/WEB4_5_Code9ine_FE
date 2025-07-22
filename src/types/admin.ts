export type User = {
  memberId: number;
  nickname: string;
  email: string;
  activated: boolean;
};

export type Store = {
  storeId: number;
  name: string;
  address: string;
  category: string;
  menus: { name: string; price: number }[];
};

export type NewStore = {
  name: string;
  address: string;
  category: string;
  menus: {
    name: string;
    price: number;
  }[];
};
