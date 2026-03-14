"use client";

import styled from "styled-components";
import type { Car } from "./mocks";

export type FilterState = {
  keyword: string;
  carId: string;
  from: string;
  to: string;
  hasCommentOnly: boolean;
};

type Props = {
  cars: Car[];
  value: FilterState;
  onChange: (v: FilterState) => void;
};

export default function HistoryFilters({ cars, value, onChange }: Props) {
  return (
    <WrapOuter>
      <Wrap>
      <SearchArea>
        <SearchInputWrap>
          <SearchIcon aria-hidden="true">
            <img src="/icons/icons8-search.png" alt="" />
          </SearchIcon>

          <SearchInput
            placeholder="キーワードで検索"
            value={value.keyword}
            onChange={(e) => onChange({ ...value, keyword: e.target.value })}
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
            value={value.from}
            onChange={(e) => onChange({ ...value, from: e.target.value })}
          />
          <Tilde>〜</Tilde>
          <DateInput
            aria-label="終了日"
            type="date"
            required
            value={value.to}
            onChange={(e) => onChange({ ...value, to: e.target.value })}
          />
        </Period>

        <RegisteredCarSelect
          aria-label="愛車"
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
    </WrapOuter>
  );
}

const WrapOuter = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 12px;
  border-bottom: 1px solid #e6e6e6;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: max-content;
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInputWrap = styled.div`
  position: relative;
  width: 240px;
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
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover { background: #256fd4; }
  &:active { transform: translateY(1px); }

  @media (max-width: 768px) {
    padding: 0 14px;
  }
`;

const RightArea = styled.div`
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
  height: 34px;
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
  flex-shrink: 0;
`;

const RegisteredCarSelect = styled.select`
  height: 34px;
  width: 160px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  background: #fff;
  box-sizing: border-box;
`;