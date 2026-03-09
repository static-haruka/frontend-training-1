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
            <StoreLink href={reservation.storeUrl}>
              {reservation.storeName}
            </StoreLink>
          </InfoValue>
        </InfoBlock>

        <ButtonBlock>
          <DetailButton type="button">予約詳細</DetailButton>
        </ButtonBlock>
      </CardBody>
    </Card>
  );
}

const Card = styled.div<{ $isPast: boolean }>`
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  background-color: ${(props) => (props.$isPast ? "#f5f5f5" : "#fcfcfc")};

  @media (max-width: 768px) {
    padding: 16px;
  }
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
  flex-shrink: 0;
`;

const DateText = styled.span`
  font-weight: bold;
  font-size: 15px;
  word-break: break-word;
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  align-items: center;
  min-width: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #666;
  width: 60px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  min-width: 0;
  word-break: break-word;
`;

const StoreLink = styled.a`
  color: #1a73e8;
  text-decoration: none;
  word-break: break-word;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonBlock = styled.div`
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const DetailButton = styled.button`
  background-color: #2f80ed;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #256fd4;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 16px;
  }
`;