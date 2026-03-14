"use client";

import styled from "styled-components";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchCustomer,
  fetchTransactions,
  Transaction,
  TransactionKind,
} from "./mocks";
import CustomerPageShell from "./CustomerPageShell";
import HistoryFilters, { FilterState } from "./HistoryFilters";
import HistoryList from "./HistoryList";
import Pagination from "./Pagination";

type Props = {
  customerId?: string;
};

export default function CustomerTopView({ customerId: customerIdProp }: Props) {
  const params = useParams();

  const raw = (params as any)?.customerId;
  const customerIdFromParams = typeof raw === "string" ? raw : raw?.[0] ?? "";
  const customerId = customerIdProp ?? customerIdFromParams;

  const customer = useMemo(() => {
    if (!customerId) {
      return undefined;
    }

    return fetchCustomer(customerId);
  }, [customerId]);

  const transactions = useMemo(() => {
    if (!customerId) {
      return [];
    }

    return fetchTransactions(customerId);
  }, [customerId]);

  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    carId: "",
    from: "",
    to: "",
    hasCommentOnly: false,
  });

  const filtered = useMemo(() => {
    if (!customer) {
      return [];
    }

    const list = (transactions ?? []).slice();

    const byCar = filters.carId ? list.filter((t) => t.carId === filters.carId) : list;

    const byComment = filters.hasCommentOnly ? byCar.filter((t) => t.hasComment) : byCar;

    const byKeyword = filters.keyword.trim()
      ? byComment.filter((t) => containsKeyword(t, filters.keyword, customer))
      : byComment;

    return filterByPeriod(byKeyword, filters.from, filters.to);
  }, [filters, customer, transactions]);

  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleChangeFilters = (next: FilterState) => {
    setFilters(next);
    setPage(1);
  };

  if (!customer) {
    return <div>顧客情報が見つかりません</div>;
  }

  return (
    <CustomerPageShell customer={customer} active="top">
      <PageTitle>取引履歴</PageTitle>
      <Divider />

      <HistoryFilters cars={customer.cars} value={filters} onChange={handleChangeFilters} />

      <CountRow>
        <CountText>{filtered.length}件</CountText>
        <RightTools>
          <CommentOnly>
            <input
              type="checkbox"
              checked={filters.hasCommentOnly}
              onChange={(e) =>
                handleChangeFilters({
                  ...filters,
                  hasCommentOnly: e.target.checked,
                })
              }
            />
            <span>メモ付きのみ</span>
          </CommentOnly>
        </RightTools>
      </CountRow>

      <HistoryList items={paged} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </CustomerPageShell>
  );
}

export function containsKeyword(
  t: Transaction,
  keyword: string,
  customer: {
    cars: { id: string; maker: string; model: string; nickname?: string }[];
  }
) {
  const k = keyword.trim().toLowerCase();
  if (!k) return true;

  const car = customer.cars.find((c) => c.id === t.carId);
  const carText = car ? [car.maker, car.model, car.nickname ?? ""].join(" ") : "";

  const hay = [
    t.title,
    t.statusLabel ?? "",
    t.shopLabel ?? "",
    t.carLabel ?? "",
    carText,
    kindLabel(t.kind),
  ]
    .join(" ")
    .toLowerCase();

  return hay.includes(k);
}

export function filterByPeriod(list: Transaction[], from: string, to: string) {
  if (!from && !to) return list;

  const fromAt = from ? new Date(from + "T00:00:00Z").getTime() : null;
  const toAt = to ? new Date(to + "T23:59:59Z").getTime() : null;

  return list.filter((t) => {
    const ts = new Date(t.sortAt).getTime();
    if (fromAt !== null && ts < fromAt) return false;
    if (toAt !== null && ts > toAt) return false;
    return true;
  });
}

export function kindLabel(kind: TransactionKind) {
  if (kind === "purchase") return "購入履歴";
  if (kind === "assessment") return "査定履歴";
  return "";
}

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

const CountRow = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0;
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
  gap: 12px;
`;

const CommentOnly = styled.label`
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