"use client";

import Link from "next/link";
import styled from "styled-components";
import type { PurchaseHistoryItem } from "./purchaseMocks";

type Props = {
  customerId: string;
  items: PurchaseHistoryItem[];
};

export default function PurchaseHistoryList({ customerId, items }: Props) {
  return (
    <List>
      {items.map((it) => {
        const hasComment = it.hasMemo || ((it as any).comments?.length ?? 0) > 0;

        const icon = renderIcon(it.icon);
        const badge = hasComment
          ? <CommentBadge aria-label="コメントあり">💬</CommentBadge>
          : null;

        return (
          <Row
            key={it.id}
            href={`/customer/${customerId}/purchase/${it.id}`}
            aria-label={`購入履歴の詳細: ${it.title || "詳細"}`}
          >
            {/* ── PC 用（モバイルで非表示） ── */}
            <Left>
              <IconWrap aria-hidden="true">{icon}{badge}</IconWrap>
              <Meta>
                <DateText>{it.date}</DateText>
                {it.carName ? <CarText>{it.carName}</CarText> : <CarText>&nbsp;</CarText>}
                {it.statusLabel
                  ? <Status tone={it.statusTone}>{it.statusLabel}</Status>
                  : <Status tone="muted">&nbsp;</Status>}
              </Meta>
            </Left>

            <TitleArea>
              <TitleText>{it.title || "\u00A0"}</TitleText>
            </TitleArea>

            <AmountArea>
              <AmountText>¥ {formatYen(it.amountYen)}</AmountText>
            </AmountArea>

            <Right>
              <ShopText>{it.shopLabel || "\u00A0"}</ShopText>
              <Chevron aria-hidden="true">›</Chevron>
            </Right>

            {/* ── モバイル専用（PC で非表示） ── */}
            <MobileTop>
              <MobileTopLeft>
                <IconWrap aria-hidden="true">{icon}{badge}</IconWrap>
                <Meta>
                  <DateText>{it.date}</DateText>
                  {it.carName ? <CarText>{it.carName}</CarText> : <CarText>&nbsp;</CarText>}
                  {it.statusLabel
                    ? <Status tone={it.statusTone}>{it.statusLabel}</Status>
                    : <Status tone="muted">&nbsp;</Status>}
                </Meta>
              </MobileTopLeft>
              <AmountText>¥ {formatYen(it.amountYen)}</AmountText>
            </MobileTop>

            <MobileBottom>
              <TitleTextMobile>{it.title || "\u00A0"}</TitleTextMobile>
              <MobileBottomRight>
                <ShopTextMobile>{it.shopLabel || "\u00A0"}</ShopTextMobile>
                <Chevron aria-hidden="true">›</Chevron>
              </MobileBottomRight>
            </MobileBottom>
          </Row>
        );
      })}
    </List>
  );
}

function formatYen(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function renderIcon(kind: PurchaseHistoryItem["icon"]) {
  if (kind === "photo") return "🖼️";
  if (kind === "gear") return "⚙️";
  if (kind === "ring") return "⭕";
  if (kind === "car") return "🚗";
  if (kind === "monitor") return "🖥️";
  return "🔗";
}

/* ===================== styles ===================== */

const List = styled.div`
  border-top: 1px solid #e6e6e6;
`;

const Row = styled(Link)`
  display: grid;
  grid-template-columns: minmax(160px, 220px) minmax(120px, 1fr) minmax(80px, 110px) minmax(140px, 220px);
  gap: 12px;
  align-items: center;
  min-height: 78px;
  border-bottom: 1px solid #e6e6e6;
  padding: 10px 8px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover { background: #fafafa; }

  &:focus-visible {
    outline: 2px solid #1f6feb;
    outline-offset: 2px;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 8px;
    min-height: unset;
  }
`;

/* ── PC 用（モバイルで非表示） ── */

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  @media (max-width: 768px) { display: none; }
`;

const TitleArea = styled.div`
  min-width: 0;
  @media (max-width: 768px) { display: none; }
`;

const AmountArea = styled.div`
  text-align: left;
  @media (max-width: 768px) { display: none; }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  min-width: 0;
  @media (max-width: 768px) { display: none; }
`;

/* ── モバイル専用（PC で非表示） ── */

const MobileTop = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }
`;

const MobileTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
`;

const MobileBottom = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding-left: 54px;
  }
`;

const MobileBottomRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

/* ── 共通 ── */

const IconWrap = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f4f7ff;
  font-size: 20px;
  flex-shrink: 0;
`;

const CommentBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: #f2994a;
  color: #fff;
  font-size: 12px;
  line-height: 1;
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 2px #fff;
`;

const Meta = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`;

const DateText = styled.div`
  font-size: 11px;
  color: #777;
`;

const CarText = styled.div`
  font-size: 11px;
  color: #777;
  word-break: break-word;
`;

const Status = styled.div<{ tone: "danger" | "muted" }>`
  font-size: 11px;
  color: ${(p) => (p.tone === "danger" ? "#d22" : "#999")};
`;

const TitleText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleTextMobile = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #222;
  word-break: break-word;
  flex: 1;
  min-width: 0;
`;

const AmountText = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #1f6feb;
  white-space: nowrap;
  flex-shrink: 0;
`;

const ShopText = styled.div`
  font-size: 12px;
  color: #666;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ShopTextMobile = styled.div`
  font-size: 12px;
  color: #666;
  word-break: break-word;
`;

const Chevron = styled.div`
  font-size: 20px;
  color: #999;
  flex-shrink: 0;
`;