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
            aria-current={p === page}
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
  padding: 16px 0;
`;

const Pages = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #fff;
  cursor: pointer;

  &[aria-current="true"] {
    background: #111;
    color: #fff;
    border-color: #111;
  }
`;

const PagerButton = styled.button`
  height: 28px;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #fff;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
