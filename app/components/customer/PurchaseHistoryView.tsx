"use client";

import styled from "styled-components";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCustomer } from "./mocks";
import CustomerPageShell from "./CustomerPageShell";
import Pagination from "./Pagination";
import PurchaseHistoryList from "./PurchaseHistoryList";
import { MOCK_PURCHASE_HISTORY, type PurchaseHistoryItem } from "./purchaseMocks";

type Props = {
  customerId?: string;
};

type FilterState = {
  keyword: string;
  from: string;
  to: string;
  carName: string;
  hasMemoOnly: boolean;
};

function toDateStart(yyyyMmDd: string): Date | null {
  if (!yyyyMmDd) return null;
  const [y, m, d] = yyyyMmDd.split("-").map((n) => Number(n));
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function toDateEnd(yyyyMmDd: string): Date | null {
  if (!yyyyMmDd) return null;
  const [y, m, d] = yyyyMmDd.split("-").map((n) => Number(n));
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 23, 59, 59, 999);
}

function parsePurchaseDate(dotted: string): Date | null {
  const m = dotted.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || !mo || !d) return null;
  return new Date(y, mo - 1, d, 0, 0, 0, 0);
}

function buildCarOptionsFromPurchases(items: PurchaseHistoryItem[]): string[] {
  const set = new Set<string>();
  for (const x of items) {
    const name = (x.carName ?? "").trim();
    if (!name) continue;
    set.add(name);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
}

export default function PurchaseHistoryView({ customerId: customerIdProp }: Props) {
  const params = useParams();

  const raw = (params as any)?.customerId;
  const customerIdFromParams = typeof raw === "string" ? raw : raw?.[0] ?? "";
  const customerId = customerIdProp ?? customerIdFromParams;

  const resolvedCustomerId = customerId || "12345678901234";
  const customer = fetchCustomer(resolvedCustomerId);

  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    from: "",
    to: "",
    carName: "",
    hasMemoOnly: false,
  });

  const pageSize = 7;
  const [page, setPage] = useState(1);

  const onChangeFilters = (patch: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const carOptions = useMemo(() => buildCarOptionsFromPurchases(MOCK_PURCHASE_HISTORY), []);

  const filtered = useMemo(() => {
    const k = filters.keyword.trim().toLowerCase();
    const fromDate = toDateStart(filters.from);
    const toDate = toDateEnd(filters.to);

    let list = MOCK_PURCHASE_HISTORY.slice();

    if (filters.hasMemoOnly) list = list.filter((x) => x.hasMemo);

    if (filters.carName) {
      list = list.filter((x) => (x.carName ?? "").trim() === filters.carName);
    }

    if (fromDate || toDate) {
      list = list.filter((x) => {
        const d = parsePurchaseDate(x.date);
        if (!d) return true;
        if (fromDate && d < fromDate) return false;
        if (toDate && d > toDate) return false;
        return true;
      });
    }

    if (k) {
      list = list.filter((x) => {
        const hay = [x.title, x.carName, x.shopLabel, x.statusLabel]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(k);
      });
    }

    return list;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <CustomerPageShell customer={customer} active="purchase">

      <FiltersBar>
        <SearchArea>
          <SearchInputWrap>
            <SearchIcon aria-hidden="true">
              <img src="/icons/icons8-search.png" alt="" />
            </SearchIcon>

            <SearchInput
              placeholder="キーワードで検索"
              value={filters.keyword}
              onChange={(e) => onChangeFilters({ keyword: e.target.value })}
            />
          </SearchInputWrap>

          <SearchButton type="button">検索</SearchButton>
        </SearchArea>

        <RightArea>
          <Period>
            <DateInput
              aria-label="開始日"
              type="date"
              required
              value={filters.from}
              onChange={(e) => onChangeFilters({ from: e.target.value })}
            />
            <Tilde>〜</Tilde>
            <DateInput
              aria-label="終了日"
              type="date"
              required
              value={filters.to}
              onChange={(e) => onChangeFilters({ to: e.target.value })}
            />
          </Period>

          <RegisteredCarSelect
            aria-label="登録車で絞り込む"
            value={filters.carName}
            onChange={(e) => onChangeFilters({ carName: e.target.value })}
          >
            <option value="">登録車で絞り込む</option>
            {carOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </RegisteredCarSelect>
        </RightArea>
      </FiltersBar>

      <CountRow>
        <CountText>{filtered.length}件</CountText>

        <RightTools>
          <MemoOnly>
            <input
              type="checkbox"
              checked={filters.hasMemoOnly}
              onChange={(e) => onChangeFilters({ hasMemoOnly: e.target.checked })}
            />
            <span>メモ付きのみ</span>
          </MemoOnly>
        </RightTools>
      </CountRow>

      <PurchaseHistoryList customerId={resolvedCustomerId} items={paged} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </CustomerPageShell>
  );
}

/* ---------- styles ---------- */

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  height: 56px;
  border-bottom: 1px solid #e6e6e6;
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const SearchInputWrap = styled.div`
  position: relative;
  width: 320px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.55;
  pointer-events: none;

  img {
    width: 15px;
    height: 15px;
    display: block;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 12px 0 34px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  height: 36px;
  padding: 0 18px;
  border-radius: 6px;
  border: 1px solid #2f80ed;
  background: #2f80ed;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #256fd4;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const RightArea = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Period = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateInput = styled.input`
  height: 36px;
  width: 140px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
  box-sizing: border-box;

  &:not(:focus):invalid {
    color: transparent;
  }
`;

const Tilde = styled.span`
  color: #666;
  font-size: 12px;
`;

const RegisteredCarSelect = styled.select`
  height: 36px;
  width: 200px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
  box-sizing: border-box;
`;

const CountRow = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  margin-top: 10px;
`;

const CountText = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1;
`;

const RightTools = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const MemoOnly = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;

  input {
    width: 14px;
    height: 14px;
  }
`;