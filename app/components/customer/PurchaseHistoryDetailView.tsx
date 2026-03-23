"use client";

import styled from "styled-components";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { fetchCustomer } from "./mocks";
import CustomerPageShell from "./CustomerPageShell";
import {
  MOCK_PURCHASE_HISTORY,
  MOCK_PURCHASE_DETAILS,
  type PurchaseHistoryItem,
} from "./purchaseMocks";

type Props = {
  customerId: string;
  purchaseId: string;
};

export default function PurchaseHistoryDetailView({
  customerId,
  purchaseId,
}: Props) {
  const router = useRouter();

  const customer = useMemo(() => {
    return fetchCustomer(customerId || "12345678901234");
  }, [customerId]);

  const item = useMemo(() => {
    return MOCK_PURCHASE_HISTORY.find((x) => x.id === purchaseId) ?? null;
  }, [purchaseId]);

  const detail = useMemo(() => {
    return MOCK_PURCHASE_DETAILS[purchaseId] ?? null;
  }, [purchaseId]);

  if (!item) return null;
  
  if (!customer) return <div>顧客情報が見つかりません</div>;

  const comments = item.comments ?? [];

  const managementNo =
    detail?.managementNo ?? `UP${item.id.replace("p-", "").padStart(8, "0")}`;

  const productName = detail?.productName ?? (item.title || "商品名");

  const productUrl =
    detail?.productUrl ??
    `https://example.com/products/${encodeURIComponent(item.id)}`;

  const installCar = detail?.installCar ?? item.carName ?? "WRX STI";

  return (
    <CustomerPageShell customer={customer} active="purchase">
      <PageTitle>購入履歴</PageTitle>

      <CardTop>
        <SummaryRow>
          <SummaryLeft>
            <Thumb>{renderIcon(item.icon)}</Thumb>

            <SummaryMeta>
              <TopLine>
                <CarText>{installCar}</CarText>
                <Dot>　</Dot>
                <ShopText>{item.shopLabel || "Upgarage xx点"}</ShopText>
                <Dot>　</Dot>
                <ManageText>管理番号：{managementNo}</ManageText>
              </TopLine>
            </SummaryMeta>
          </SummaryLeft>
        </SummaryRow>

        <ProductRow>
          <ProductName>{productName || "商品名"}</ProductName>
          <ProductPrice>¥ {formatYen(item.amountYen)}</ProductPrice>
        </ProductRow>

        <Divider />

        <Table>
          <Tr>
            <Th>メモ</Th>
            <Td>
              <MemoBox>{item.hasMemo ? detail?.memoText ?? "—" : "—"}</MemoBox>
            </Td>
          </Tr>

          <Tr>
            <Th>商品URL</Th>
            <Td>
              <Url href={productUrl} target="_blank" rel="noreferrer">
                {productUrl}
              </Url>
            </Td>
          </Tr>

          <Tr>
            <Th>取付車</Th>
            <Td>{installCar}</Td>
          </Tr>
        </Table>
      </CardTop>

      <Actions>
        <ActionLink type="button" onClick={() => {}}>
          ✎ 購入履歴を編集する
        </ActionLink>

        <ActionDanger type="button" onClick={() => {}}>
          削除する
        </ActionDanger>

        <ActionLink type="button" onClick={() => router.back()}>
          ‹ 戻る
        </ActionLink>
      </Actions>

      <DividerLarge />

      <CommentSection>
        <CommentHeader>
          <CommentTitle>管理コメント</CommentTitle>

          <CommentFilters>
            <FilterLabel>担当</FilterLabel>

            <FilterSelect>
              <option>店舗</option>
            </FilterSelect>

            <FilterSelect>
              <option>担当者</option>
            </FilterSelect>
          </CommentFilters>
        </CommentHeader>

        <DividerSmall />

        <AddCommentBar>
          <AddIcon>🖼️</AddIcon>

          <AddCommentText>
            <AddMain>コメントを追加する</AddMain>
            <AddSub>店舗店：後藤高志</AddSub>
          </AddCommentText>

          <SendButtonSmall type="button">送信</SendButtonSmall>
        </AddCommentBar>

        <CommentList>
          {comments.length === 0 ? (
            <EmptyText>コメントはありません</EmptyText>
          ) : (
            comments.map((c) => (
              <CommentItem key={c.id}>
                <CommentIcon>💬</CommentIcon>

                <CommentBody>
                  <CommentMeta>
                    {c.postedAt}　<b>{c.authorLabel}</b>
                  </CommentMeta>

                  {c.bodyText ? <CommentText>{c.bodyText}</CommentText> : null}
                  {c.resultText ? (
                    <CommentResult>{c.resultText}</CommentResult>
                  ) : null}
                </CommentBody>
              </CommentItem>
            ))
          )}
        </CommentList>
      </CommentSection>
    </CustomerPageShell>
  );
}

/* helpers */

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

const PageTitle = styled.h1`
  margin: 8px 0 12px;
  font-size: 18px;
  font-weight: 700;
  color: #222;
`;

const CardTop = styled.div`
  border-top: 1px solid #ddd;
`;

const Divider = styled.div`
  height: 1px;
  background: #ddd;
  margin: 12px 0;
`;

const DividerLarge = styled.div`
  height: 1px;
  background: #ddd;
  margin: 28px 0 16px;
`;

const DividerSmall = styled.div`
  height: 1px;
  background: #ddd;
  margin: 12px 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SummaryLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
`;

const Thumb = styled.div`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f4f7ff;
  flex-shrink: 0;
`;

const SummaryMeta = styled.div`
  display: grid;
  gap: 4px;
  min-width: 0;
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 12px;
  color: #777;
`;

const CarText = styled.span`
  color: #777;
`;

const ShopText = styled.span`
  color: #777;
`;

const ManageText = styled.span`
  color: #333;
`;

const Dot = styled.span`
  color: #bbb;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #222;
  word-break: break-word;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f6feb;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Table = styled.div`
  border-top: 1px solid #ddd;
`;

const Tr = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 10px 0;
  }
`;

const Th = styled.div`
  font-size: 12px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 11px;
    color: #999;
  }
`;

const Td = styled.div`
  font-size: 12px;
  color: #222;
  min-width: 0;
  word-break: break-word;
`;

const MemoBox = styled.div`
  background: #f2f2f2;
  padding: 10px;
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Url = styled.a`
  color: #1f6feb;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    justify-items: stretch;
    gap: 10px;

    & > *:last-child {
      grid-column: 1 / -1;
      text-align: center;
    }
  }
`;

const ActionLink = styled.button`
  border: 1px solid #1f6feb;
  background: transparent;
  color: #1f6feb;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  padding: 8px 16px;

  &:hover {
    background: #f0f6ff;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;

const ActionDanger = styled.button`
  border: 1px solid #d22;
  background: transparent;
  color: #d22;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  padding: 8px 16px;

  &:hover {
    background: #fff5f5;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;

const CommentSection = styled.section`
  min-width: 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const CommentTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;

const CommentFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const FilterLabel = styled.span`
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
`;

const FilterSelect = styled.select`
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 10px;
  min-width: 0;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const AddCommentBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const AddIcon = styled.div`
  font-size: 20px;
  flex-shrink: 0;
`;

const AddCommentText = styled.div`
  min-width: 0;
  flex: 1;
`;

const AddMain = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const AddSub = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const SendButtonSmall = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #2f80ed;
  background: #2f80ed;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    background: #1a6ed8;
    border-color: #1a6ed8;
  }
`;

const CommentList = styled.div`
  display: grid;
  gap: 12px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const CommentIcon = styled.div`
  flex-shrink: 0;
`;

const CommentBody = styled.div`
  min-width: 0;
  flex: 1;
`;

const CommentMeta = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`;

const CommentText = styled.div`
  font-size: 13px;
  color: #222;
  white-space: pre-wrap;
  word-break: break-word;
`;

const CommentResult = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #222;
  white-space: pre-wrap;
  word-break: break-word;
`;

const EmptyText = styled.div`
  color: #666;
  font-size: 13px;
  padding: 8px 0;
`;