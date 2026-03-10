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

test("fetchCustomer: 一致しない場合は undefined を返すこと", () => {
  const c = fetchCustomer("unknown-id");
  expect(c).toBeUndefined();
});

test("fetchTransactions: 正しいIDで取引履歴が取得できること", () => {
  const list = fetchTransactions(mockCustomer2.id);
  expect(list).toBe(mockTransactions2);
});

test("fetchTransactions: 一致しない場合は空配列を返すこと", () => {
  const list = fetchTransactions("unknown-id");
  expect(list).toEqual([]);
});