"use client";

import styled from "styled-components";

type TabKey =
  | "top"
  | "message"
  | "considering"
  | "purchase"
  | "assessment"
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
    { key: "work", label: "作業履歴" },
    { key: "work_reservation", label: "作業予約" },
  ];

  return (
    <Wrap>
      {tabs.map((t) => (
        <Tab key={t.key} aria-current={t.key === active}>
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

const Tab = styled.button`
  flex: 1;
  border: 0;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  border-right: 1px solid #efefef;

  &[aria-current="true"] {
    border-bottom: 3px solid #18a0ff;
    font-weight: 700;
  }
`;
