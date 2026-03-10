"use client";

import { useState } from "react";
import styled from "styled-components";
import HistoryFilters, { FilterState } from "./HistoryFilters";
import Pagination from "./Pagination";
import ReservationItem from "./ReservationItem";
import type { Customer } from "./mocks";
import { fetchReservations } from "./mockReservations";

const isPastDate = (datetimeStr: string): boolean => {
  const normalizedDatetimeStr = datetimeStr.replace("年", "/").replace("月", "/").replace("日", "");
  const reservationDate = new Date(normalizedDatetimeStr);
  const now = new Date();
  return reservationDate < now;
};

const ITEMS_PER_PAGE = 10;

type Props = {
  customer: Customer;
};

export default function ReservationView({ customer }: Props) {
  const [filterState, setFilterState] = useState<FilterState>({
    keyword: "",
    carId: "",
    from: "",
    to: "",
    hasCommentOnly: false,
  });
  const [page, setPage] = useState(1);
  const [purchaseFilter, setPurchaseFilter] = useState<"future" | "all">("future");
  const [uppitFilter, setUppitFilter] = useState<"future" | "all">("future");

  const reservations = fetchReservations(customer.id);

  const filteredReservations = reservations.filter((res) => {
    if (purchaseFilter === "future") {
      return !isPastDate(res.datetime);
    }
    return true;
  });

  const totalItems = filteredReservations.length;
  const totalPages = Math.max(Math.ceil(totalItems / ITEMS_PER_PAGE), 1); 
  
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReservations = filteredReservations.slice(startIndex, endIndex);

  return (
    <Container>
      <HistoryFilters 
        cars={customer.cars} 
        value={filterState} 
        onChange={setFilterState} 
      />

      <ListHeader>
        <CountText>{totalItems}件</CountText>
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

      <Section>
        <SectionTitle>買取予約</SectionTitle>
        <ToggleWrapper>
          <ToggleGroup>
            <ToggleOption 
              $active={purchaseFilter === "future"}
              onClick={() => {
                setPurchaseFilter("future");
                setPage(1);
              }}
            >
              本日以降の予約のみ
            </ToggleOption>
            <ToggleOption 
              $active={purchaseFilter === "all"}
              onClick={() => {
                setPurchaseFilter("all");
                setPage(1); 
              }}
            >
              過去の予約も含む
            </ToggleOption>
          </ToggleGroup>
        </ToggleWrapper>

        <ReservationList>
          {currentReservations.length > 0 ? (
            currentReservations.map((res) => (
              <ReservationItem 
                key={res.id} 
                reservation={res} 
                isPast={isPastDate(res.datetime)} 
              />
            ))
          ) : (
            <EmptyMessage>表示する予約がありません。</EmptyMessage>
          )}
        </ReservationList>

        {totalItems > 0 && (
          <PaginationWrap>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </PaginationWrap>
        )}
      </Section>

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

const EmptyMessage = styled.div`
  padding: 32px;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
`;

const PaginationWrap = styled.div`
  margin-top: 16px;
`;