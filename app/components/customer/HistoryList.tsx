"use client";

import styled from "styled-components";
import type { Car, Transaction, TransactionKind } from "./mocks";

type Props = {
  items: Transaction[];
  cars: Car[];
};

export default function HistoryList({ items }: Props) {
  return (
    <Wrap>
      {items.map((t) => (
        <Row key={t.id}>
          <LeftIconArea>
            <Circle />
            {t.hasComment ? <CommentBadge /> : null}
          </LeftIconArea>

          <Meta>
            <MetaDate>{t.date}</MetaDate>
            <MetaLine>
              <MetaCar>{t.carLabel}</MetaCar>
              <KindTag kind={t.kind}>{kindLabel(t.kind)}</KindTag>
              {t.statusLabel ? <StatusTag>{t.statusLabel}</StatusTag> : null}
            </MetaLine>
          </Meta>

          <Title title={t.title}>{t.title}</Title>

          <Right>
            {typeof t.amount === "number" ? (
              <Amount>¥ {t.amount.toLocaleString()}</Amount>
            ) : (
              <AmountMuted>—</AmountMuted>
            )}
            <Shop>{t.shopLabel ?? ""}</Shop>
          </Right>

          <Chevron>›</Chevron>
        </Row>
      ))}
    </Wrap>
  );
}

function kindLabel(kind: TransactionKind) {
  if (kind === "purchase") return "購入履歴";
  if (kind === "assessment") return "査定履歴";
  if (kind === "work") return "作業履歴";
  if (kind === "reservation") return "作業予約";
  return "検討中パーツ";
}

/* ---------- styles ---------- */

const Wrap = styled.div`
  margin-top: 10px;
  border-top: 1px solid #e6e6e6;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 52px 240px 1fr 200px 32px;
  align-items: center;
  column-gap: 14px;

  min-height: 68px;
  padding: 10px 10px;

  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  &:active {
    background: #f5f5f5;
  }
`;

const LeftIconArea = styled.div`
  display: grid;
  place-items: center;
  position: relative;
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #5aa8ff;
  border-radius: 999px;
  background: #fff;
`;

const CommentBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 32px;
  width: 14px;
  height: 10px;
  border-radius: 2px;
  background: #ff9f1a;
`;

const Meta = styled.div`
  font-size: 11px;
  color: #666;
  line-height: 1.35;
  min-width: 0;
`;

const MetaDate = styled.div`
  margin-bottom: 4px;
  color: #777;
`;

const MetaLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const MetaCar = styled.div`
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const KindTag = styled.span<{ kind: TransactionKind }>`
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  background: #f2f2f2;
  color: #333;
  white-space: nowrap;
`;

const StatusTag = styled.span`
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  background: #e6f5ea;
  color: #1d7d3a;
  white-space: nowrap;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: #111;
  min-width: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Right = styled.div`
  text-align: right;
  min-width: 0;
`;

const Amount = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: #666;
`;

const AmountMuted = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: #aaa;
`;

const Shop = styled.div`
  margin-top: 2px;
  font-size: 10px;
  color: #aaa;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Chevron = styled.div`
  font-size: 20px;
  color: #999;
  text-align: center;
`;
