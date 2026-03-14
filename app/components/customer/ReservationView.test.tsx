import {
  fetchCustomer,
  fetchTransactions,
  mockCustomer,
  mockCustomer2,
  mockTransactions,
  mockTransactions2,
} from "./mocks";

test("fetchCustomer: 正しいIDで小池さんが取得できること", () => {
  const c = fetchCustomer(mockCustomer2.id);
  expect(c?.id).toBe(mockCustomer2.id);
});

test("fetchCustomer: 一致しない場合は throw すること", () => {
  expect(() => fetchCustomer("unknown-id")).toThrow("Customer not found: unknown-id");
});

test("fetchTransactions: 正しいIDで取引履歴が取得できること", () => {
  const list = fetchTransactions(mockCustomer2.id);
  expect(list).toBe(mockTransactions2);
});

test("fetchTransactions: 一致しない場合は throw すること", () => {
  expect(() => fetchTransactions("unknown-id")).toThrow("Customer not found: unknown-id");
});