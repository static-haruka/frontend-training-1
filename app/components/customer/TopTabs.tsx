"use client";

import styled from "styled-components";
import { useParams, useRouter } from "next/navigation";

type TabKey =
  | "top"
  | "message"
  | "considering"
  | "purchase"
  | "assessing"
  | "buy"
  | "reservation"
  | "work";

type Props = {
  active: TabKey;
};

const TABS: {
  key: TabKey;
  label: string;
  emoji: string;
  bg: string;
}[] = [
  { key: "top", label: "トップ", emoji: "🏠", bg: "#ffffff" },
  { key: "message", label: "メッセージ", emoji: "💬", bg: "#f7d7dc" },
  { key: "considering", label: "検討中パーツ", emoji: "★", bg: "#f7f0c9" },
  { key: "purchase", label: "購入履歴", emoji: "🛒", bg: "#f7f0c9" },
  { key: "assessing", label: "査定中", emoji: "🔍", bg: "#cfeee4" },
  { key: "buy", label: "買取履歴", emoji: "🪙", bg: "#cfeee4" },
  { key: "reservation", label: "予約一覧", emoji: "🔧", bg: "#dde3f2" },
  { key: "work", label: "作業履歴", emoji: "🛠️", bg: "#dde3f2" },
];

const ENABLED_TABS: TabKey[] = ["top", "purchase", "reservation"];

function buildHref(key: TabKey, customerId: string) {
  if (key === "top") return `/customer/${customerId}`;
  if (key === "purchase") return `/customer/${customerId}/purchase`;
  if (key === "reservation") return `/customer/${customerId}/reservation`;
  return "";
}

export default function TopTabs({ active }: Props) {
  const router = useRouter();
  const params = useParams();
  const raw = (params as any)?.customerId;
  const customerId = typeof raw === "string" ? raw : raw?.[0];

  return (
    <TabsScroller>
      <Bar $cols={TABS.length}>
        {TABS.map((t) => {
          const isActive = t.key === active;
          const isEnabled = ENABLED_TABS.includes(t.key);

          return (
            <Tab
              key={t.key}
              type="button"
              aria-current={isActive ? "page" : undefined}
              disabled={!isEnabled}
              $active={isActive}
              $bg={t.bg}
              $enabled={isEnabled}
              onClick={() => {
                if (!customerId) return;
                if (!isEnabled) return;
                router.push(buildHref(t.key, customerId));
              }}
            >
              <TabInner>
                <Icon aria-hidden="true">{t.emoji}</Icon>
                <TabLabel>{t.label}</TabLabel>
              </TabInner>
            </Tab>
          );
        })}
      </Bar>
    </TabsScroller>
  );
}

/* ---------- styles ---------- */

const TabsScroller = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Bar = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols}, 1fr);
  border-bottom: 1px solid #e6e6e6;
  min-width: 720px;

  @media (max-width: 768px) {
    min-width: 640px;
  }
`;

const Tab = styled.button<{
  $active: boolean;
  $bg: string;
  $enabled: boolean;
}>`
  appearance: none;
  border: none;
  background: ${(p) => p.$bg};
  cursor: ${(p) => (p.$enabled ? "pointer" : "default")};

  height: 64px;
  padding: 6px 8px;
  position: relative;
  min-width: 0;

  ${(p) =>
    p.$active &&
    `
      box-shadow: inset 0 -3px 0 #2f80ff;
      font-weight: 700;
    `}

  ${(p) =>
    !p.$enabled &&
    `
      opacity: 0.5;
    `}

  &:hover {
    filter: ${(p) => (p.$enabled ? "brightness(0.98)" : "none")};
  }

  @media (max-width: 768px) {
    height: 60px;
    padding: 6px 4px;
  }
`;

const TabInner = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  gap: 6px;
`;

const Icon = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const TabLabel = styled.div`
  font-size: 12px;
  color: #222;
  line-height: 1.2;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;