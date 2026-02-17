"use client";

import styled from "styled-components";

type TabKey =
  | "top"
  | "message"
  | "considering"
  | "purchase"
  | "assessment"
  | "purchase_history"
  | "work_reservation"
  | "work";

type Props = {
  active: TabKey;
};

export default function TopTabs({ active }: Props) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "top", label: "トップ" },
    { key: "message", label: "メッセージ" },
    { key: "considering", label: "検討中パーツ" },
    { key: "purchase", label: "購入履歴" },
    { key: "assessment", label: "査定中" },
    { key: "purchase_history", label: "買取履歴" },
    { key: "work_reservation", label: "作業予約" },
    { key: "work", label: "作業履歴" },
  ];

  return (
    <Wrap>
      {tabs.map((t) => (
        <Tab
          key={t.key}
          aria-current={t.key === active ? "true" : "false"}
          $tabKey={t.key}
          type="button"
        >
          {t.label}
        </Tab>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  height: 44px;
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
`;

const Tab = styled.button<{ $tabKey: TabKey }>`
  flex: 1;
  border: 0;
  background: ${({ $tabKey }) => TAB_BG[$tabKey]};
  font-size: 12px;
  cursor: pointer;
  border-right: 1px solid #efefef;
  color: #333;
  font-weight: 700;
  position: relative;

  &:last-child {
    border-right: 0;
  }

  &:hover {
    filter: brightness(0.98);
  }

  &[aria-current="true"] {
    color: #111;
    font-weight: 800;
  }

  &[aria-current="true"]::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 3px;
    background: #2f80ed;
  }
`;

const TAB_BG: Record<TabKey, string> = {
  top: "#ffffff",
  message: "#f9dfe6",
  considering: "#f7f1cf",
  purchase: "#f7f1cf",
  assessment: "#d9f1e7",
  purchase_history: "#d9f1e7",
  work_reservation: "#e7eefb",
  work: "#e7eefb",
};
