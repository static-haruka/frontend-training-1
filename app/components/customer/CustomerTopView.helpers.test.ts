import { containsKeyword, filterByPeriod, kindLabel } from "./CustomerTopView";
import type { Transaction } from "./mocks";
import { mockCustomer } from "./mocks";

test("kindLabel: purchase/assessment が返せる", () => {
  expect(kindLabel("purchase" as any)).toBe("購入履歴");
  expect(kindLabel("assessment" as any)).toBe("査定履歴");
});

test("containsKeyword: optional が undefined でも落ちずに判定できる", () => {
  const t: Transaction = {
    id: "t1",
    kind: "purchase" as any,
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE A",
    hasComment: false,
    shopLabel: undefined,
    statusLabel: undefined,
    amount: undefined,
  } as any;

  expect(containsKeyword(t, "購入", mockCustomer)).toBe(true);
});

test("filterByPeriod: from/to 未指定ならそのまま返す", () => {
  const list: Transaction[] = [
    {
      id: "t1",
      kind: "purchase" as any,
      carId: "car-1",
      carLabel: "インプレッサ\nスポーツ",
      date: "2022.9.26",
      sortAt: "2022-09-26T10:00:00Z",
      title: "TITLE A",
      hasComment: false,
      shopLabel: "店舗1",
      amount: 1000,
    } as any,
  ];

  const out = filterByPeriod(list, "", "");
  expect(out).toHaveLength(1);
});

test("filterByPeriod: 期間で絞り込める", () => {
  const list: Transaction[] = [
    {
      id: "t1",
      kind: "purchase" as any,
      carId: "car-1",
      carLabel: "インプレッサ\nスポーツ",
      date: "2022.9.26",
      sortAt: "2022-09-26T10:00:00Z",
      title: "TITLE A",
      hasComment: false,
      shopLabel: "店舗1",
      amount: 1000,
    } as any,
    {
      id: "t2",
      kind: "purchase" as any,
      carId: "car-1",
      carLabel: "インプレッサ\nスポーツ",
      date: "2022.7.01",
      sortAt: "2022-07-01T10:00:00Z",
      title: "TITLE B",
      hasComment: false,
      shopLabel: "店舗1",
      amount: 1000,
    } as any,
  ];

  const out = filterByPeriod(list, "2022-09-01", "2022-09-30");
  expect(out).toHaveLength(1);
  expect(out[0].id).toBe("t1");
});

test("containsKeyword: keyword が空白だけなら true（早期return）", () => {
  const t: Transaction = {
    id: "t-empty",
    kind: "purchase" as any,
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE",
    hasComment: false,
    shopLabel: undefined,
    statusLabel: undefined,
    amount: undefined,
  } as any;

  expect(containsKeyword(t, "   ", mockCustomer)).toBe(true);
});

test("containsKeyword: carId が一致する車が見つからない分岐（carTextが空）でも落ちない", () => {
  const t: Transaction = {
    id: "t-nocar",
    kind: "purchase" as any,
    carId: "no-such-car",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE",
    hasComment: false,
    shopLabel: undefined,
    statusLabel: undefined,
    amount: undefined,
  } as any;

  expect(containsKeyword(t, "購入", mockCustomer)).toBe(true);
});

test("filterByPeriod: from のみ指定", () => {
  const list: Transaction[] = [
    { id: "a", sortAt: "2022-07-01T10:00:00Z" } as any,
    { id: "b", sortAt: "2022-09-26T10:00:00Z" } as any,
  ];
  const out = filterByPeriod(list, "2022-09-01", "");
  expect(out.map((x) => x.id)).toEqual(["b"]);
});

test("filterByPeriod: to のみ指定", () => {
  const list: Transaction[] = [
    { id: "a", sortAt: "2022-07-01T10:00:00Z" } as any,
    { id: "b", sortAt: "2022-09-26T10:00:00Z" } as any,
  ];
  const out = filterByPeriod(list, "", "2022-08-01");
  expect(out.map((x) => x.id)).toEqual(["a"]);
});

test("kindLabel: 想定外は空文字", () => {
  expect(kindLabel("unknown" as any)).toBe("");
});