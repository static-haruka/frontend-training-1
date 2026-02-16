"use client";

import styled from "styled-components";
import type { Customer } from "./mocks";

type Props = {
  customer: Customer;
};

export default function CustomerSidePanel({ customer }: Props) {
  return (
    <Wrap>
      <CustomerBox>
        <GrooooberId>Groooober ID</GrooooberId>
        <GrooooberIdValue>{customer.grooooberId}</GrooooberIdValue>

        <NameRow>
          <Name>{customer.name}</Name>
          <NameSuffix>さま</NameSuffix>
        </NameRow>

        <EditLink href="#">編集</EditLink>
      </CustomerBox>

      <SectionTitle>愛車一覧</SectionTitle>

      <Cars>
        {customer.cars.map((c) => (
          <CarCard key={c.id}>
            <CarThumb />
            <CarText>
              <CarMaker>{c.maker}</CarMaker>
              <CarModel>{c.model}</CarModel>
              {c.note ? <CarNote>{c.note}</CarNote> : null}
            </CarText>
          </CarCard>
        ))}
      </Cars>

      <Buttons>
        <ActionButton>新規見積り</ActionButton>
        <ActionButton>新規買取査定</ActionButton>
        <ActionButton>新規作業予約</ActionButton>
      </Buttons>
    </Wrap>
  );
}

const Wrap = styled.aside`
  width: 240px;
  border-right: 1px solid #e6e6e6;
  background: #fff;
`;

const CustomerBox = styled.div`
  background: #eef7ff;
  padding: 16px;
  border-bottom: 1px solid #e6e6e6;
`;

const GrooooberId = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
`;

const GrooooberIdValue = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const NameRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 10px 0 8px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const NameSuffix = styled.div`
  margin-left: 6px;
  font-size: 12px;
  color: #333;
`;

const EditLink = styled.a`
  display: block;
  text-align: center;
  font-size: 12px;
  color: #1b6bd1;
  text-decoration: underline;
`;

const SectionTitle = styled.div`
  padding: 12px 16px;
  font-weight: 700;
  border-bottom: 1px solid #e6e6e6;
`;

const Cars = styled.div`
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CarCard = styled.div`
  display: flex;
  gap: 10px;
`;

const CarThumb = styled.div`
  width: 48px;
  height: 36px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background: #fafafa;
`;

const CarText = styled.div`
  min-width: 0;
`;

const CarMaker = styled.div`
  font-size: 10px;
  color: #777;
`;

const CarModel = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
`;

const CarNote = styled.div`
  margin-top: 4px;
  font-size: 11px;
  color: #1b6bd1;
`;

const Buttons = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButton = styled.button`
  height: 36px;
  border-radius: 6px;
  border: 1px solid #8fb9ff;
  background: #fff;
  color: #1b6bd1;
  font-weight: 700;
  cursor: pointer;
`;
