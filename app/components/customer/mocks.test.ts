import {
  fetchCustomer,
  fetchTransactions,
  mockCustomer,
  mockCustomer2,
  mockTransactions,
  mockTransactions2,
} from "./mocks";

test("fetchCustomer: crooooberId が customer2 と一致すると mockCustomer2 を返す", () => {
  const c = fetchCustomer(mockCustomer2.crooooberId);
  expect(c.crooooberId).toBe(mockCustomer2.crooooberId);
});

test("fetchCustomer: crooooberId が一致しない場合はデフォルトの mockCustomer を返す", () => {
  const c = fetchCustomer("unknown-id");
  expect(c).toBe(mockCustomer);
});


test("fetchTransactions: crooooberId が customer2 と一致すると mockTransactions2 を返す", () => {
  const list = fetchTransactions(mockCustomer2.crooooberId);
  expect(list).toBe(mockTransactions2);
});

test("fetchTransactions: crooooberId が一致しない場合はデフォルトの mockTransactions を返す", () => {
  const list = fetchTransactions("unknown-id");
  expect(list).toBe(mockTransactions);
});