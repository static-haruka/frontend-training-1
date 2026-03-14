"use client";

import styled from "styled-components";
import type { Transaction, TransactionKind } from "./mocks";

type Props = {
  items: Transaction[];
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
              <MetaCar $isUnset={t.statusLabel === "未設定"}>
                {t.carLabel}
              </MetaCar>
              <KindTag kind={t.kind}>{kindLabel(t.kind)}</KindTag>
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
  return "査定履歴";
}

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
  padding: 10px;

  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  cursor: pointer;

  &:hover { background: #fafafa; }
  &:active { background: #f5f5f5; }

  @media (max-width: 768px) {
    grid-template-columns: 40px 1fr 24px;
    grid-template-areas:
      "icon meta    chevron"
      "icon title   chevron"
      "icon right   chevron";
    column-gap: 10px;
    row-gap: 4px;
    align-items: start;
    padding: 12px 8px;
  }
`;

const LeftIconArea = styled.div`
  display: grid;
  place-items: center;
  position: relative;

  @media (max-width: 768px) {
    grid-area: icon;
    align-self: start;
    padding-top: 2px;
  }
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
  top: -4px;
  left: 16px;
  width: 14px;
  height: 10px;
  border-radius: 2px;
  background: #ff9f1a;
  box-shadow: 0 0 0 2px #fff;
`;

const Meta = styled.div`
  font-size: 11px;
  color: #666;
  line-height: 1.35;
  min-width: 0;

  @media (max-width: 768px) {
    grid-area: meta;
  }
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
  flex-wrap: wrap;
`;

const MetaCar = styled.div<{ $isUnset: boolean }>`
  color: ${(p) => (p.$isUnset ? "#d60000" : "#666")};
  flex: 0 0 120px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    flex: 1 1 auto;
  }
`;

const KindTag = styled.span<{ kind: TransactionKind }>`
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  color: #000;
  background: #f2f2f2;

  ${(p) => p.kind === "purchase" && `background: #fff3c4;`}
  ${(p) => p.kind === "assessment" && `background: #e6f5ea;`}
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: #111;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    grid-area: title;
    white-space: normal;
    word-break: break-word;
  }
`;

const Right = styled.div`
  text-align: right;
  min-width: 0;

  @media (max-width: 768px) {
    grid-area: right;
    text-align: left;
  }
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

  @media (max-width: 768px) {
    white-space: normal;
    word-break: break-word;
  }
`;

const Chevron = styled.div`
  font-size: 20px;
  color: #999;
  text-align: center;

  @media (max-width: 768px) {
    grid-area: chevron;
    align-self: center;
  }
`;