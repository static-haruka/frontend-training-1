"use client";

import styled from "styled-components";
import { Transaction } from "./mockTransactions";

type Props = {
  item: Transaction;
};

export default function TransactionRow({ item }: Props) {
  return (
    <Row>
      <Left>
        <Type>{item.type}</Type>
        <Title>{item.title}</Title>
      </Left>

      <Right>
        {item.amount && <Amount>¥{item.amount.toLocaleString()}</Amount>}
        <DateText>{item.date}</DateText>
      </Right>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
`;

const Type = styled.div`
  font-size: 12px;
  color: #666;
`;

const Title = styled.div`
  font-weight: 500;
`;

const Right = styled.div`
  text-align: right;
`;

const Amount = styled.div`
  font-weight: 600;
`;

const DateText = styled.div`
  font-size: 12px;
  color: #888;
`;
