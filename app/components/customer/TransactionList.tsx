"use client";

import styled from "styled-components";
import { mockTransactions } from "./mockTransactions";
import TransactionRow from "./TransactionRow";

export default function TransactionList() {
  return (
    <Wrap>
      {mockTransactions.map((item) => (
        <TransactionRow key={item.id} item={item} />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
`;
