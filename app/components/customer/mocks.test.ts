import {
  fetchCustomer,
  fetchTransactions,
  mockCustomer2,
  mockTransactions2,
} from "./mocks";

test("fetchCustomer: crooooberId が customer2 と一致すると mockCustomer2 を返す", () => {
  const c = fetchCustomer(mockCustomer2.crooooberId);
  expect(c.crooooberId).toBe(mockCustomer2.crooooberId);
});

test("fetchTransactions: crooooberId が customer2 と一致すると mockTransactions2 を返す", () => {
  const list = fetchTransactions(mockCustomer2.crooooberId);
  expect(list).toBe(mockTransactions2);
});