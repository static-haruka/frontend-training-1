"use client";

import styled from "styled-components";
import type { Car } from "./mocks";

export type SortKey = "registered_desc" | "registered_asc";

export type FilterState = {
  keyword: string;
  carId: string;
  from: string;
  to: string;
  hasCommentOnly: boolean;
  sort: SortKey;
};

type Props = {
  cars: Car[];
  value: FilterState;
  onChange: (v: FilterState) => void;
};

export default function HistoryFilters({ cars, value, onChange }: Props) {
  return (
    <Wrap>
      <SearchArea>
        <SearchInput
          placeholder="キーワードで検索"
          value={value.keyword}
          onChange={(e) => onChange({ ...value, keyword: e.target.value })}
        />
        <SearchButton type="button">検索</SearchButton>
      </SearchArea>

      <RightArea>

        <Period>
          <DateInput
            type="date"
            value={value.from}
            onChange={(e) => onChange({ ...value, from: e.target.value })}
          />
          <Tilde>〜</Tilde>
          <DateInput
            type="date"
            value={value.to}
            onChange={(e) => onChange({ ...value, to: e.target.value })}
          />
        </Period>

        <RegisteredCarSelect
          value={value.carId}
          onChange={(e) => onChange({ ...value, carId: e.target.value })}
        >
          <option value="">登録車で絞り込む</option>
          {cars.map((c) => (
            <option key={c.id} value={c.id}>
              {c.maker} {c.model}
            </option>
          ))}
        </RegisteredCarSelect>
      </RightArea>
    </Wrap>
  );
}

/* ---------- styles ---------- */

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 320px;
  height: 34px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  outline: none;
`;

const SearchButton = styled.button`
  height: 34px;
  padding: 0 16px;
  border-radius: 6px;
  border: 1px solid #1b6bd1;
  background: #1b6bd1;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CarSelect = styled.select`
  height: 34px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
`;

const Period = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateInput = styled.input`
  height: 34px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
`;

const Tilde = styled.span`
  color: #666;
  font-size: 12px;
`;

const RegisteredCarSelect = styled.select`
  height: 34px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
`;
