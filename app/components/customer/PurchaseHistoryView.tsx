"use client";

import styled from "styled-components";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import CustomerPageShell from "./CustomerPageShell";
import Pagination from "./Pagination";
import PurchaseHistoryList from "./PurchaseHistoryList";
import { fetchCustomer } from "./mocks";
import { MOCK_PURCHASE_HISTORY, PurchaseHistoryItem } from "./purchaseMocks";

type FilterState = {
  keyword: string;
  from: string;
  to: string;
  carName: string;
  hasMemoOnly: boolean;
};

type Props = {
  customerId?: string;
};

function parsePurchaseDate(text: string) {
  const normalized = text.replace("年", "/").replace("月", "/").replace("日", "");
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

function toDateStart(v: string) {
  if (!v) return null;
  const d = new Date(`${v}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function toDateEnd(v: string) {
  if (!v) return null;
  const d = new Date(`${v}T23:59:59`);
  return Number.isNaN(d.getTime()) ? null : d;
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
          <DateGroup>
            <DateInput
              type="date"
              aria-label="開始日"
              value={filters.from}
              onChange={(e) => onChangeFilters({ from: e.target.value })}
            />
            <Wave>〜</Wave>
            <DateInput
              type="date"
              aria-label="終了日"
              value={filters.to}
              onChange={(e) => onChangeFilters({ to: e.target.value })}
            />
          </DateGroup>

          <CarSelect
            value={filters.carName}
            onChange={(e) => onChangeFilters({ carName: e.target.value })}
            aria-label="車種"
          >
            <option value="">登録車で絞り込む</option>
            {carOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </CarSelect>
        </RightArea>
      </FiltersBar>

      <CountRow>
        <CountText>{filtered.length}件</CountText>
        <MemoOnly>
          <input
            type="checkbox"
            checked={filters.hasMemoOnly}
            onChange={(e) => onChangeFilters({ hasMemoOnly: e.target.checked })}
          />
          <span>メモ付きのみ</span>
        </MemoOnly>
      </CountRow>

      <PurchaseHistoryList customerId={resolvedCustomerId} items={paged} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </CustomerPageShell>
  );
}

/* styles */

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-width: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`;

const SearchInputWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;

  @media (min-width: 769px) {
    max-width: 320px;
  }
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
  height: 34px;
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
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #256fd4;
  }
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const DateGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const DateInput = styled.input`
  height: 34px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
  min-width: 0;
  box-sizing: border-box;
  flex: 1;

  @media (min-width: 769px) {
    width: 140px;
    flex: unset;
  }
`;

const Wave = styled.span`
  color: #666;
  font-size: 12px;
  flex-shrink: 0;
`;

const CarSelect = styled.select`
  height: 34px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
  min-width: 0;
  box-sizing: border-box;
  width: 100%;
`;

const CountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  min-width: 0;

  @media (max-width: 768px) {
    min-height: auto;
    padding-top: 8px;
  }
`;

const CountText = styled.div`
  font-size: 12px;
  color: #666;
`;

const MemoOnly = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
  cursor: pointer;

  input {
    width: 14px;
    height: 14px;
  }
`;