"use client";

import styled from "styled-components";

type Props = {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  const pages = makePages(totalPages);

  return (
    <Wrap>
      <PagerButton disabled={page <= 1} onClick={() => onChange(page - 1)}>
        前へ
      </PagerButton>

      <Pages>
        {pages.map((p) => (
          <PageButton
            key={p}
            aria-current={p === page ? "true" : "false"}
            onClick={() => onChange(p)}
          >
            {p}
          </PageButton>
        ))}
      </Pages>

      <PagerButton
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        次へ
      </PagerButton>
    </Wrap>
  );
}

function makePages(total: number) {
  const arr: number[] = [];
  let i = 1;
  while (i <= total) {
    arr.push(i);
    i += 1;
  }
  return arr;
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
`;

const Pages = styled.div`
  display: flex;
  gap: 8px;

  max-width: 420px;
  overflow: hidden;
`;

const PageButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  background: #fff;
  cursor: pointer;

  font-size: 12px;
  color: #333;

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
`;

const PagerButton = styled.button`
  height: 28px;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  background: #fff;
  cursor: pointer;

  font-size: 12px;
  color: #333;

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
`;
