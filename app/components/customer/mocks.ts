export type Car = {
  id: string;
  maker: string;
  model: string;
  nickname?: string;
  note?: string;
  imageUrl?: string;
};

export type Customer = {
  id: string;
  grooooberId: string;
  name: string;
  cars: Car[];
};

export type TransactionKind =
  | "purchase"
  | "assessment"
  | "work"
  | "reservation"
  | "considering";

export type TransactionIcon = "circle" | "link" | "gear";

export type Transaction = {
  id: string;
  kind: TransactionKind;
  carId: string;
  carLabel: string;
  date: string;
  sortAt: string;
  title: string;
  amount?: number;
  hasComment: boolean;
  statusLabel?: string;
  shopLabel?: string;
  icon: TransactionIcon;
};

export const mockCustomer: Customer = {
  id: "123",
  grooooberId: "12345678901234",
  name: "山田太郎",
  cars: [
    {
      id: "car-1",
      maker: "NISSAN",
      model: "R35",
      note: "車検まであと1ヶ月です",
    },
    {
      id: "car-2",
      maker: "MAZDA",
      model: "ROADSTAR",
    },
  ],
};

export const mockTransactions: Transaction[] = [
  {
    id: "t-1",
    kind: "purchase",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16",
    amount: 13138,
    hasComment: true,
    shopLabel: "店舗1(検証用直営1)",
    icon: "circle",
  },
  {
    id: "t-2",
    kind: "purchase",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.9",
    sortAt: "2022-09-09T10:00:00Z",
    title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 2",
    amount: 2500,
    hasComment: false,
    statusLabel: "未設定",
    shopLabel: "店舗2(検証用直営2)",
    icon: "link",
  },
  {
    id: "t-3",
    kind: "assessment",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T12:00:00Z",
    title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 3",
    amount: 13138,
    hasComment: false,
    shopLabel: "店舗1(検証用直営1)",
    icon: "gear",
  },
  {
    id: "t-4",
    kind: "purchase",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.9",
    sortAt: "2022-09-09T12:00:00Z",
    title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 4",
    amount: 2500,
    hasComment: false,
    shopLabel: "店舗3(検証用直営3)",
    icon: "link",
  },
  {
    id: "t-5",
    kind: "purchase",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T14:00:00Z",
    title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 5",
    amount: 13138,
    hasComment: false,
    shopLabel: "店舗1(検証用直営1)",
    icon: "circle",
  },

  {
    id: "t-6",
    kind: "purchase",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.8.20",
    sortAt: "2022-08-20T10:00:00Z",
    title: "DUMMY ITEM 6",
    amount: 9800,
    hasComment: false,
    shopLabel: "店舗2(検証用直営2)",
    icon: "link",
  },
  {
    id: "t-7",
    kind: "work",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.8.01",
    sortAt: "2022-08-01T10:00:00Z",
    title: "DUMMY ITEM 7",
    amount: 12000,
    hasComment: false,
    shopLabel: "店舗1(検証用直営1)",
    icon: "gear",
  },
];
