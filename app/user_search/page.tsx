'use client'; /* Styled Components を使うために明示 */

import styled from 'styled-components';

export default function UserSearchPage() {
  return (
    <Page>
      <Card>
        <Title>顧客情報の検索</Title>
        <Hint>ここから検索入力とテーブルを足していきます</Hint>
      </Card>
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  padding: 48px 16px;
  background: #f5f6f8;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.section`
  width: 100%;
  max-width: 900px;
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 700;
`;

const Hint = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;