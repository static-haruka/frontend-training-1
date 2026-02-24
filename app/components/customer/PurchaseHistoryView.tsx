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

export default function PurchaseHistoryView({ customerId: customerIdProp }: Props) {
  const params = useParams();

  const raw = (params as any)?.customerId;
  const customerIdFromParams = typeof raw === "string" ? raw : raw?.[0] ?? "";
  const customerId = customerIdProp ?? customerIdFromParams;

  const customer = useMemo(() => {
    const id = customerId || "12345678901234";
    return fetchCustomer(id);
  }, [customerId]);

  const [keyword, setKeyword] = useState("");
  const [hasMemoOnly, setHasMemoOnly] = useState(false);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    let list: PurchaseHistoryItem[] = MOCK_PURCHASE_HISTORY.slice();

    if (hasMemoOnly) list = list.filter((x) => x.hasMemo);

    if (k) {
      list = list.filter((x) => {
        const hay = [x.title, x.carName, x.shopLabel, x.statusLabel].join(" ").toLowerCase();
        return hay.includes(k);
      });
    }

    return list;
  }, [keyword, hasMemoOnly]);

  const pageSize = 7;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const onChangeKeyword = (v: string) => {
    setKeyword(v);
    setPage(1);
  };

  const onToggleMemo = (checked: boolean) => {
    setHasMemoOnly(checked);
    setPage(1);
  };

  return (
    <CustomerPageShell customer={customer} active="purchase">
      <PageTitle>購入履歴</PageTitle>
      <Divider />

      <FiltersRow>
        <SearchBox>
          <SearchInput
            placeholder="キーワードで検索"
            value={keyword}
            onChange={(e) => onChangeKeyword(e.target.value)}
          />
          <SearchButton type="button">検索</SearchButton>
        </SearchBox>

        <RightFilters>
          <SmallInput aria-label="from" placeholder="" />
          <Tilde>〜</Tilde>
          <SmallInput aria-label="to" placeholder="" />
          <Select aria-label="car">
            <option>登録車で絞り込む</option>
          </Select>
        </RightFilters>
      </FiltersRow>

      <CountRow>
        <CountText>{filtered.length}件</CountText>

        <RightTools>
          <MemoOnly>
            <input
              type="checkbox"
              checked={hasMemoOnly}
              onChange={(e) => onToggleMemo(e.target.checked)}
            />
            <span>メモ付きのみ</span>
          </MemoOnly>
        </RightTools>
      </CountRow>

      <PurchaseHistoryList items={paged} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </CustomerPageShell>
  );
}

/* styles */

const PageTitle = styled.h1`
  margin: 8px 0 12px;
  font-size: 18px;
  font-weight: 700;
`;

const Divider = styled.div`
  height: 1px;
  background: #e6e6e6;
  margin-bottom: 16px;
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 480px;
`;

const SearchInput = styled.input`
  height: 38px;
  width: 320px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
`;

const SearchButton = styled.button`
  height: 38px;
  min-width: 76px;
  border: none;
  border-radius: 8px;
  background: #1f6feb;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

const RightFilters = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SmallInput = styled.input`
  height: 34px;
  width: 120px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 10px;
`;

const Tilde = styled.div`
  color: #777;
`;

const Select = styled.select`
  height: 34px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 10px;
  background: #fff;
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