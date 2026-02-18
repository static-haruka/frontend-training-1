import { containsKeyword, filterByPeriod, kindLabel } from "./CustomerTopView";
import { mockCustomer } from "./mocks";

test("containsKeyword: 空文字（trim後空）なら true（!k 分岐）", () => {
  const t = {
    id: "x",
    kind: "purchase",
    carId: "car-1",
    title: "AAA",
    date: "2022.1.1",
    sortAt: "2022-01-01T00:00:00Z",
    hasComment: false,
    icon: "circle",
  } as any;

  expect(containsKeyword(t, "   ", mockCustomer)).toBe(true);
});

test("containsKeyword: title にヒットすると true", () => {
  const t = {
    id: "x",
    kind: "purchase",
    carId: "car-1",
    title: "HELLO WORLD",
    date: "2022.1.1",
    sortAt: "2022-01-01T00:00:00Z",
    hasComment: false,
    icon: "circle",
  } as any;

  expect(containsKeyword(t, "world", mockCustomer)).toBe(true);
});

test("containsKeyword: optional が undefined でも落ちずに判定できる（?? 分岐）", () => {
  const t = {
    id: "x",
    kind: "considering",
    carId: "car-1",
    title: "NO MATCH TITLE",
    date: "2022.1.1",
    sortAt: "2022-01-01T00:00:00Z",
    hasComment: false,
    icon: "circle",
  } as any;

  expect(containsKeyword(t, "検討中", mockCustomer)).toBe(true);
});

test("filterByPeriod: from/to 未指定ならそのまま返す（!from && !to 分岐）", () => {
  const list = [
    { sortAt: "2022-01-01T00:00:00Z" },
    { sortAt: "2022-02-01T00:00:00Z" },
  ] as any[];

  expect(filterByPeriod(list as any, "", "")).toHaveLength(2);
});

test("filterByPeriod: from/to 両方指定で範囲に絞れる（両方分岐）", () => {
  const list = [
    { sortAt: "2022-06-01T10:00:00Z" }, // inside
    { sortAt: "2022-05-01T10:00:00Z" }, // too old
    { sortAt: "2022-08-01T10:00:00Z" }, // too new
  ] as any[];

  const r = filterByPeriod(list as any, "2022-06-01", "2022-07-01");
  expect(r).toHaveLength(1);
});

test("kindLabel: work/reservation/considering の分岐も返せる", () => {
  expect(kindLabel("work" as any)).toBe("作業履歴");
  expect(kindLabel("reservation" as any)).toBe("作業予約");
  expect(kindLabel("considering" as any)).toBe("検討中パーツ");
});
