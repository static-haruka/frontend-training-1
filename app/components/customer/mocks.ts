export type Car = {
  id: string;
  maker: string;
  model: string;
  nickname?: string;
  note?: string;
  image?: string;
};

export type Customer = {
  id: string;
  crooooberId: string;
  name: string;
  cars: Car[];
};

export type TransactionKind = "purchase" | "assessment";
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
  crooooberId: "12345678901234",
  name: "山田太郎",
  cars: [
    { id: "car-1", maker: "NISSAN", model: "R35", note: "車検まであと1ヶ月です", image: "/images/nissan-r35.jpeg" },
    { id: "car-2", maker: "MAZDA", model: "ROADSTAR", image: "/images/mazda-roadstar.jpg" },
  ],
};

export const mockTransactions: Transaction[] = [
  { id: "t-1", kind: "purchase", carId: "car-1", carLabel: "インプレッサ\nスポーツ", date: "2022.9.26", sortAt: "2022-09-26T10:00:00Z", title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16", amount: 13138, hasComment: true, shopLabel: "t店舗1(検証用直営1)", icon: "circle" },
  { id: "t-2", kind: "purchase", carId: "car-1", carLabel: "未設定", date: "2022.9.9", sortAt: "2022-09-09T10:00:00Z", title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 2", amount: 2500, hasComment: false, statusLabel: "未設定", shopLabel: "t店舗2(検証用直営2)", icon: "link" },
  { id: "t-3", kind: "assessment", carId: "car-1", carLabel: "インプレッサ\nスポーツ", date: "2022.9.26", sortAt: "2022-09-26T12:00:00Z", title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 3", amount: 13138, hasComment: false, shopLabel: "t店舗1(検証用直営1)", icon: "gear" },
  { id: "t-4", kind: "purchase", carId: "car-1", carLabel: "インプレッサ\nスポーツ", date: "2022.9.9", sortAt: "2022-09-09T12:00:00Z", title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 4", amount: 2500, hasComment: false, shopLabel: "t店舗3(検証用直営3)", icon: "link" },
  { id: "t-5", kind: "purchase", carId: "car-1", carLabel: "インプレッサ\nスポーツ", date: "2022.9.26", sortAt: "2022-09-26T14:00:00Z", title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16 5", amount: 13138, hasComment: false, shopLabel: "t店舗1(検証用直営1)", icon: "circle" },
  { id: "t-6", kind: "purchase", carId: "car-1", carLabel: "インプレッサ\nスポーツ", date: "2022.8.20", sortAt: "2022-08-20T10:00:00Z", title: "DUMMY ITEM 6", amount: 9800, hasComment: false, shopLabel: "t店舗2(検証用直営2)", icon: "link" },
  { id: "t-7", kind: "purchase", carId: "car-1", carLabel: "インプレッサ\nスポーツ", date: "2022.8.01", sortAt: "2022-08-01T10:00:00Z", title: "DUMMY ITEM 7", amount: 12000, hasComment: false, shopLabel: "t店舗1(検証用直営1)", icon: "gear" },
];

export const mockCustomer2: Customer = {
  id: "456",
  crooooberId: "98382329238838",
  name: "小池若奈",
  cars: [
    { id: "car-3", maker: "TOYOTA", model: "PRIUS", note: "点検の案内あり", image: "/images/toyota-prius.jpg" },
  ],
};

export const mockTransactions2: Transaction[] = [
  { id: "t-200", kind: "purchase", carId: "car-3", carLabel: "プリウス", date: "2022.9.10", sortAt: "2022-09-10T10:00:00Z", title: "DUMMY ITEM 1", amount: 5000, hasComment: true, shopLabel: "t店舗1(検証用直営1)", icon: "gear" },
  { id: "t-201", kind: "assessment", carId: "car-3", carLabel: "プリウス", date: "2022.9.28", sortAt: "2022-09-28T09:00:00Z", title: "DUMMY ITEM 2", amount: 3000, hasComment: false, shopLabel: "t店舗1(検証用直営1)", icon: "link" },
];

const customers: Customer[] = [mockCustomer, mockCustomer2];

const transactionsByCustomerId: Record<string, Transaction[]> = {
  [mockCustomer.crooooberId]: mockTransactions,
  [mockCustomer2.crooooberId]: mockTransactions2,
};

export function fetchCustomer(customerId: string): Customer {
  const idStr = String(customerId);
  const found = customers.find((c) => String(c.id) === idStr || String(c.crooooberId) === idStr);
  if (!found) throw new Error(`Customer not found: ${customerId}`);
  return found;
}

export function fetchTransactions(customerId: string): Transaction[] {
  const customer = fetchCustomer(customerId);
  return transactionsByCustomerId[customer.crooooberId] ?? [];
}