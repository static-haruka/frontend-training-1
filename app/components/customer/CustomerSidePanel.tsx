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
        <CrooooberId>Croooober ID</CrooooberId>
        <CrooooberIdValue>{customer.crooooberId}</CrooooberIdValue>

        <NameRow>
          <Name>{customer.name}</Name>
          <NameSuffix>さま</NameSuffix>
        </NameRow>

        <EditLink href="#">編集</EditLink>
      </CustomerBox>

      <SectionTitle>愛車一覧</SectionTitle>

      <Cars>
        {customer.cars.map((c) => {
          const src = c.image
            ? c.image.startsWith("/") ? c.image : `/${c.image}`
            : null;

          return (
            <CarCard key={c.id}>
              <CarThumb aria-hidden="true">
                {src ? <img src={src} alt="" /> : null}
              </CarThumb>

              <CarText>
                <CarMaker>{c.maker}</CarMaker>
                <CarModel>{c.model}</CarModel>
                {c.note ? <CarNote>{c.note}</CarNote> : null}
              </CarText>
            </CarCard>
          );
        })}
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
  width: 268px;
  min-width: 268px;
  border-right: 1px solid #e9e9e9;
  background: #fff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
    border-right: none;
    border-bottom: 1px solid #e9e9e9;
  }
`;

const CustomerBox = styled.div`
  background: #eaf6ff;
  padding: 18px 16px 16px;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
`;

const CrooooberId = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
`;

const CrooooberIdValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
  word-break: break-word;
`;

const NameRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  margin: 10px 0 8px;
  flex-wrap: wrap;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const NameSuffix = styled.div`
  font-size: 12px;
  color: #333;
`;

const EditLink = styled.a`
  display: inline-block;
  margin-top: 2px;
  font-size: 12px;
  color: #1b6bd1;
  text-decoration: none;
  padding: 6px 8px;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SectionTitle = styled.div`
  padding: 14px 16px 12px;
  font-weight: 800;
  color: #111;
  border-bottom: 1px solid #e6e6e6;
`;

const Cars = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CarCard = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
`;

const CarThumb = styled.div`
  width: 44px;
  height: 34px;
  min-width: 44px;
  min-height: 34px;
  flex: 0 0 44px;

  border: 1px solid #dcdcdc;
  border-radius: 3px;
  background: #fff;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const CarText = styled.div`
  min-width: 0;
  flex: 1;
`;

const CarMaker = styled.div`
  font-size: 10px;
  color: #666;
  font-weight: 700;
  letter-spacing: 0.03em;
`;

const CarModel = styled.div`
  font-size: 16px;
  font-weight: 800;
  line-height: 1.15;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CarNote = styled.div`
  margin-top: 4px;
  font-size: 11px;
  color: #1b6bd1;
  font-weight: 600;
  word-break: break-word;
`;

const Buttons = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButton = styled.button`
  height: 44px;
  border-radius: 4px;
  border: 1px solid #9cc3ff;
  background: #fff;
  color: #1b6bd1;
  font-weight: 800;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #f3f8ff;
  }

  &:active {
    transform: translateY(1px);
  }
`;