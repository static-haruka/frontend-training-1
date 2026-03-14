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

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
`;

const SummaryLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Thumb = styled.div`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f4f7ff;
`;

const SummaryMeta = styled.div`
  display: grid;
  gap: 4px;
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  color: transparent;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #222;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f6feb;
`;

const Table = styled.div`
  border-top: 1px solid #ddd;
`;

const Tr = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
`;

const Th = styled.div`
  font-size: 12px;
  color: #666;
`;

const Td = styled.div`
  font-size: 12px;
  color: #222;
`;

const MemoBox = styled.div`
  background: #f2f2f2;
  padding: 10px;
  border-radius: 6px;
  white-space: pre-wrap;
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
`;

const ActionLink = styled.button`
  border: none;
  background: transparent;
  color: #1f6feb;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ActionDanger = styled.button`
  border: none;
  background: transparent;
  color: #d22;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* ---- comments ---- */

const CommentSection = styled.div``;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

const CommentFilters = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FilterLabel = styled.div`
  font-size: 12px;
  color: #777;
`;

const FilterSelect = styled.select`
  height: 34px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 10px;
`;

const DividerSmall = styled.div`
  height: 1px;
  background: #ddd;
  margin: 12px 0;
`;

const AddCommentBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  background: #f2f2f2;
  border-radius: 10px;
  padding: 14px 16px;
`;

const AddIcon = styled.div`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;

  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const AddCommentText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AddMain = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const AddSub = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
`;

const SendButtonSmall = styled.button`
  background: #1f6feb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1558c0;
  }
`;

const CommentList = styled.div`
  margin-top: 20px;
`;

const EmptyText = styled.div`
  font-size: 12px;
  color: #777;
  padding: 16px 0;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const CommentIcon = styled.div`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: orange;
  color: white;
  border-radius: 6px;
`;

const CommentBody = styled.div`
  flex: 1;
`;

const CommentMeta = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 6px;
`;

const CommentText = styled.div`
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const CommentResult = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #555;
`;