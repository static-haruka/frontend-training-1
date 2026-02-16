"use client";

import styled from "styled-components";

export default function TransactionFilterBar() {
  return (
    <Bar>
      <Input placeholder="キーワード検索" />
      <Select>
        <option>すべて</option>
        <option>コメントあり</option>
      </Select>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
