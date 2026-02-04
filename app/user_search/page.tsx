'use client'; /* Styled Components を使うために明示（ブラウザで動くコンポーネントを生成） */

import { useState } from 'react';
import styled from 'styled-components';

type User = {
  id: number;
  name: string;
  phone: string;
};

const USERS: User[] = [
  { id: 1, name: '山田 太郎', phone: '090-1111-2222' },
  { id: 2, name: '佐藤 花子', phone: '080-3333-4444' },
  { id: 3, name: '鈴木 次郎', phone: '070-5555-6666' },
];

export default function UserSearchPage() {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState<User[]>(USERS);

  const handleSearch = () => {
    const filtered = USERS.filter((user) => {
      return (
        user.name.includes(keyword) ||
        user.phone.includes(keyword)
      );
    });

    setUsers(filtered);
  };

  return (
    <Page>
      <Card>
        <Title>顧客情報の検索</Title>

        <SearchRow>
          <SearchInput
            placeholder="キーワード・電話番号で検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchButton type="button" onClick={handleSearch}>
            検索
          </SearchButton>
        </SearchRow>

        <Table>
          <thead>
            <tr>
              <th>名前</th>
              <th>電話番号</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Page>
  );
}

/* ---------- styles ---------- */

const Page = styled.div`
  min-height: 100vh;
  padding: 48px 16px;
  background: #f5f6f8;
  display: flex;
  justify-content: center;
`;

const Card = styled.section`
  width: 100%;
  max-width: 900px;
  background: #fff;
  border-radius: 8px;
  padding: 32px;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 20px;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
`;

const SearchButton = styled.button`
  height: 40px;
  padding: 0 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background: #f9fafb;
  }
`;
