"use client";

import styled from "styled-components";

type Props = {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  const pages = makePages(page, totalPages);

  return (
    <Wrap>
      <PagerButton disabled={page <= 1} onClick={() => onChange(page - 1)}>
        前へ
      </PagerButton>

      <Pages>
        {pages.map((p, i) =>
          p === null ? (
            <Ellipsis key={`ellipsis-${i}`}>…</Ellipsis>
          ) : (
            <PageButton
              key={p}
              aria-current={p === page ? "true" : "false"}
              onClick={() => onChange(p)}
            >
              {p}
            </PageButton>
          )
        )}
      </Pages>

      <PagerButton disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        次へ
      </PagerButton>
    </Wrap>
  );
}

/**
 * ページ番号リストを生成。
 * モバイル向けに「現在ページ周辺 ±2」だけ表示し、端は省略記号で繋ぐ。
 * null は省略記号を表す。
 */
function makePages(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [];
  const delta = 2;

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  pages.push(1);

  if (left > 2) pages.push(null);

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total - 1) pages.push(null);

  pages.push(total);

  return pages;
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
    padding: 12px 0;
  }
`;

const Pages = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const PageButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  flex: 0 0 auto;
  transition: background 0.1s;

  &:hover {
    background: #f6f6f6;
  }

  &:active {
    transform: translateY(1px);
  }

  &[aria-current="true"] {
    background: #111;
    color: #fff;
    border-color: #111;
  }

  &[aria-current="true"]:hover {
    background: #111;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
`;

const Ellipsis = styled.span`
  width: 24px;
  text-align: center;
  font-size: 13px;
  color: #999;
  user-select: none;
`;

const PagerButton = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  flex: 0 0 auto;
  transition: background 0.1s;

  &:hover:not(:disabled) {
    background: #f6f6f6;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
  }
`;