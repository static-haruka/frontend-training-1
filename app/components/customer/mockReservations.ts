import { fetchCustomer, mockCustomer, mockCustomer2 } from "./mocks";

export type Reservation = {
  id: string;
  datetime: string;
  task: string;
  storeName: string;
  storeUrl: string;
};

export const mockReservationsYamada: Reservation[] = [
  { id: "1", datetime: "2023年03月06日 12:30", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "2", datetime: "2023年03月02日 11:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "3", datetime: "2023年02月27日 12:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "4", datetime: "2023年01月29日 13:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
  { id: "5", datetime: "2023年01月27日 11:30", task: "買取予約", storeName: "t 盛岡インター店", storeUrl: "#" },
  { id: "6", datetime: "2023年01月27日 11:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "7", datetime: "2023年01月25日 12:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
  { id: "8", datetime: "2023年01月22日 12:00", task: "買取予約", storeName: "t 札幌厚別店", storeUrl: "#" },
  { id: "9", datetime: "2023年01月17日 12:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
  { id: "10", datetime: "2023年01月10日 15:30", task: "買取予約", storeName: "t 盛岡インター店", storeUrl: "#" },
  { id: "11", datetime: "2023年03月06日 12:30", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "12", datetime: "2023年03月02日 11:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "13", datetime: "2023年02月27日 12:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "14", datetime: "2023年01月29日 13:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
  { id: "15", datetime: "2023年01月27日 11:30", task: "買取予約", storeName: "t 盛岡インター店", storeUrl: "#" },
  { id: "16", datetime: "2023年01月27日 11:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "17", datetime: "2023年01月25日 12:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
  { id: "18", datetime: "2023年01月22日 12:00", task: "買取予約", storeName: "t 札幌厚別店", storeUrl: "#" },
  { id: "19", datetime: "2023年01月17日 12:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
  { id: "20", datetime: "2023年01月10日 15:30", task: "買取予約", storeName: "t 盛岡インター店", storeUrl: "#" },
];

export const mockReservationsKoike: Reservation[] = [
  { id: "k-1", datetime: "2027年04月03日 10:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
  { id: "k-2", datetime: "2027年04月08日 14:30", task: "買取予約", storeName: "t 盛岡インター店", storeUrl: "#" },
  { id: "k-3", datetime: "2027年03月28日 09:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "k-4", datetime: "2027年03月20日 16:00", task: "買取予約", storeName: "t 札幌厚別店", storeUrl: "#" },
  { id: "k-5", datetime: "2027年03月15日 11:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
];

const reservationsByCustomerId: Record<string, Reservation[]> = {
  [mockCustomer.crooooberId]: mockReservationsYamada,
  [mockCustomer2.crooooberId]: mockReservationsKoike,
};

export function fetchReservations(customerId: string): Reservation[] | undefined {
  const customer = fetchCustomer(customerId);
  if (!customer) return [];
  return reservationsByCustomerId[customer.crooooberId];
}