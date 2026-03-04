"use client";

import { useState } from "react";
import styled from "styled-components";
import HistoryFilters, { FilterState } from "./HistoryFilters";
import Pagination from "./Pagination";
import ReservationItem from "./ReservationItem";
import type { Customer } from "./mocks";

// ※ 予約用の型とモックデータ
export type Reservation = {
  id: string;
  datetime: string;
  task: string;
  storeName: string;
  storeUrl: string;
};

const mockPurchaseReservations: Reservation[] = [
  { id: "1", datetime: "2023年03月06日 12:30", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "2", datetime: "2023年03月02日 11:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "3", datetime: "2023年02月27日 12:00", task: "買取予約", storeName: "t 横浜町田総本店", storeUrl: "#" },
  { id: "4", datetime: "2023年01月29日 13:00", task: "買取予約", storeName: "t 札幌新発寒店", storeUrl: "#" },
];

type Props = {
  customer: Customer;
};

export default function ReservationView({ customer }: Props) {
  // フィルターの状態管理
  const [filterState, setFilterState] = useState<FilterState>({
    keyword: "",
    carId: "",
    from: "",
    to: "",
    hasCommentOnly: false,
  });

  // ページネーションの状態管理
  const [page, setPage] = useState(1);

  // タブ(本日以降/過去)の状態管理
  const [purchaseFilter, setPurchaseFilter] = useState<"future" | "all">("future");
  const [uppitFilter, setUppitFilter] = useState<"future" | "all">("future");

  return (
    <Container>
      {/* 既存のフィルターコンポーネントを再利用 */}
      <HistoryFilters 
        cars={customer.cars} 
        value={filterState} 
        onChange={setFilterState} 
      />

      {/* フィルター外にある件数とメモチェックボックス */}
      <ListHeader>
        <CountText>20件</CountText>
        <MemoLabel>
          <input 
            type="checkbox" 
            checked={filterState.hasCommentOnly}
            onChange={(e) => setFilterState({ ...filterState, hasCommentOnly: e.target.checked })}
          /> 
          メモ付きのみ
        </MemoLabel>
      </ListHeader>

      <PageTitle>予約一覧</PageTitle>
      <NoteText>ご予約が完了してから予約一覧に反映されるまで1分ほど時間がかかります。</NoteText>

      {/* 買取予約セクション */}
      <Section>
        <SectionTitle>買取予約</SectionTitle>
        <ToggleWrapper>
          <ToggleGroup>
            <ToggleOption 
              $active={purchaseFilter === "future"}
              onClick={() => setPurchaseFilter("future")}
            >
              本日以降の予約のみ
            </ToggleOption>
            <ToggleOption 
              $active={purchaseFilter === "all"}
              onClick={() => setPurchaseFilter("all")}
            >
              過去の予約も含む
            </ToggleOption>
          </ToggleGroup>
        </ToggleWrapper>

        <ReservationList>
          {mockPurchaseReservations.map((res) => (
            <ReservationItem key={res.id} reservation={res} />
          ))}
        </ReservationList>

        <PaginationWrap>
          {/* 既存のページネーションを組み込み */}
          <Pagination page={page} totalPages={5} onChange={setPage} />
        </PaginationWrap>
      </Section>

      {/* UPPIT(持込取付予約)セクション */}
      <Section>
        <SectionTitle>UPPIT(持込取付予約)</SectionTitle>
        <ToggleWrapper>
          <ToggleGroup>
            <ToggleOption 
              $active={uppitFilter === "future"}
              onClick={() => setUppitFilter("future")}
            >
              本日以降の予約のみ
            </ToggleOption>
            <ToggleOption 
              $active={uppitFilter === "all"}
              onClick={() => setUppitFilter("all")}
            >
              過去の予約も含む
            </ToggleOption>
          </ToggleGroup>
        </ToggleWrapper>
        {/* 持込取付予約のリストがここに入る */}
      </Section>
    </Container>
  );
}

/* ---------- styles ---------- */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CountText = styled.span`
  font-weight: bold;
`;

const MemoLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
`;

const PageTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  border-bottom: 2px solid #ccc;
  padding-bottom: 8px;
`;

const NoteText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Section = styled.div`
  margin-top: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 16px 0;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const ToggleGroup = styled.div`
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const ToggleOption = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: none;
  background-color: ${(props) => (props.$active ? "#000" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#666")};
  font-size: 12px;
  cursor: pointer;
  outline: none;
`;

const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #eee;
`;

const PaginationWrap = styled.div`
  margin-top: 16px;
`;