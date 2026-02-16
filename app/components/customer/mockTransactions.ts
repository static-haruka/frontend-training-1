export type TransactionType =
  | "purchase"
  | "assessment"
  | "work"
  | "reservation"
  | "considering";

export type Transaction = {
  id: string;
  type: TransactionType;
  title: string;
  amount?: number;
  date: string;
  hasComment: boolean;
};

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "purchase",
    title: "ADVAN Racing GT",
    amount: 187000,
    date: "2024-05-01",
    hasComment: true,
  },
  {
    id: "2",
    type: "assessment",
    title: "ホイール査定",
    date: "2024-04-20",
    hasComment: false,
  },
  {
    id: "3",
    type: "reservation",
    title: "タイヤ交換予約",
    date: "2024-04-15",
    hasComment: true,
  },
];
