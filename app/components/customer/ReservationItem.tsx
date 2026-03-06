"use client";

import styled from "styled-components";
import type { Reservation } from "./ReservationView";

type Props = {
  reservation: Reservation;
  isPast: boolean;
};

export default function ReservationItem({ reservation, isPast }: Props) {
  return (
    <Card $isPast={isPast}>
      <CardHeader>
        <DateIcon>📅</DateIcon>
        <DateText>{reservation.datetime}</DateText>
      </CardHeader>
      
      <CardBody>
        <InfoBlock>
          <InfoLabel>作業内容</InfoLabel>
          <InfoValue>{reservation.task}</InfoValue>
        </InfoBlock>
        
        <InfoBlock>
          <InfoLabel>予約店舗</InfoLabel>
          <InfoValue>
            <StoreLink href={reservation.storeUrl}>{reservation.storeName}</StoreLink>
          </InfoValue>
        </InfoBlock>
        
        <ButtonBlock>
          <DetailButton type="button">予約詳細</DetailButton>
        </ButtonBlock>
      </CardBody>
    </Card>
  );
}

/* ---------- styles ---------- */

const Card = styled.div<{ $isPast: boolean }>`
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.$isPast ? "#f5f5f5" : "#fcfcfc"};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const DateIcon = styled.span`
  font-size: 16px;
  opacity: 0.7;
`;

const DateText = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
`;

const InfoBlock = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #666;
  width: 60px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const StoreLink = styled.a`
  color: #1a73e8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonBlock = styled.div`
  margin-left: auto;
`;

const DetailButton = styled.button`
  background-color: #2f80ed;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #256fd4;
  }
`;