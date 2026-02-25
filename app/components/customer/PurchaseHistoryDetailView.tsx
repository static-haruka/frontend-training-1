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

  const managementNo =
    detail?.managementNo ?? `UP${item.id.replace("p-", "").padStart(8, "0")}`;

  const productName = detail?.productName ?? (item.title || "商品名");

  const productUrl =
    detail?.productUrl ??
    `https://example.com/products/${encodeURIComponent(item.id)}`;

  return (
    <CustomerPageShell customer={customer} active="purchase">
      <Title>購入履歴</Title>
      <Divider />

      <SummaryRow>
        <SummaryLeft>
          <Thumb>{renderIcon(item.icon)}</Thumb>

          <SummaryMeta>
            <CarLine>
              {item.carName || "WRX STI"}　{item.shopLabel || "Upgarage xx点"}
            </CarLine>
            <ManagementNo>管理番号：{managementNo}</ManagementNo>
          </SummaryMeta>
        </SummaryLeft>

        <Price>¥ {formatYen(item.amountYen)}</Price>
      </SummaryRow>

      <Divider />
      <Table>
        <Tr>
          <Th>商品名</Th>
          <Td>{productName}</Td>
        </Tr>

        <Tr>
          <Th>メモ</Th>
          <Td>
            <MemoBox>
              {item.hasMemo ? detail?.memoText ?? "メモ" : "メモ"}
            </MemoBox>
          </Td>
        </Tr>

        <Tr>
          <Th>商品URL</Th>
          <Td>
            <Url href={productUrl} target="_blank">
              {productUrl}
            </Url>
          </Td>
        </Tr>

        <Tr>
          <Th>取付車</Th>
          <Td>{item.carName || "WRX STI"}</Td>
        </Tr>
      </Table>

      <Actions>
        <EditLink href="#">購入履歴を編集する</EditLink>
        <DeleteLink href="#">削除する</DeleteLink>
        <BackButton onClick={() => router.back()}>戻る</BackButton>
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

          <SendButtonSmall>送信</SendButtonSmall>
        </AddCommentBar>

        <CommentList>
          <CommentItem>
            <CommentIcon>💬</CommentIcon>
            <CommentBody>
              <CommentMeta>
                2022年11月17日 10:59　
                <b>店舗店：後藤高志</b>
              </CommentMeta>

              <CommentText>
                お客様より初期不良のお問い合わせがありました。
                確認したところボルトの劣化による取り付け不良がありました。
                適切な対応にて納得されて完了しました。
                お客様より初期不良のお問い合わせがありました。
                確認したところボルトの劣化による取り付け不良がありました。
                適切な対応にて納得されて完了しました。
              </CommentText>

              <CommentResult>
                
              </CommentResult>
            </CommentBody>
          </CommentItem>

          <CommentItem>
            <CommentIcon>💬</CommentIcon>
            <CommentBody>
              <CommentMeta>
                2022年11月17日 10:59　
                <b>店舗店：後藤高志</b>
              </CommentMeta>

              <CommentText></CommentText>

              <CommentResult>
                チャットにて対応しました
              </CommentResult>
            </CommentBody>
          </CommentItem>
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

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Divider = styled.div`
  height: 1px;
  background: #ddd;
  margin: 12px 0;
`;

const DividerLarge = styled.div`
  height: 1px;
  background: #ddd;
  margin: 40px 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const CarLine = styled.div`
  font-size: 13px;
  color: #333;
`;

const ManagementNo = styled.div`
  font-size: 12px;
  color: #777;
`;

const Price = styled.div`
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
`;

const Url = styled.a`
  color: #1f6feb;
  text-decoration: none;
`;

const Actions = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 8px;
  justify-items: center;
`;

const EditLink = styled.a`
  color: #1f6feb;
`;

const DeleteLink = styled.a`
  color: #d22;
`;

const BackButton = styled.button`
  padding: 6px 16px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 6px;
`;


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
  gap: 12px;
  background: #f3f3f3;
  padding: 14px;
  border-radius: 10px;
`;

const AddIcon = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: white;
  border-radius: 8px;
`;

const AddCommentText = styled.div`
  flex: 1;
`;

const AddMain = styled.div`
  font-weight: 700;
`;

const AddSub = styled.div`
  font-size: 12px;
  color: #777;
`;

const SendButtonSmall = styled.button`
  background: #1f6feb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
`;

const CommentList = styled.div`
  margin-top: 20px;
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
`;

const CommentResult = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #555;
`;