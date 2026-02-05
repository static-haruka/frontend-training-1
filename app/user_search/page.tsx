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
      <SearchRow>
        <Title>顧客情報の検索</Title>

        <SearchInputWrap>
          <SearchIcon aria-hidden="true">
            <img src="/icons/icons8-search.png" alt="" />
          </SearchIcon>
          <SearchInput
            placeholder="キーワード・電話番号で検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </SearchInputWrap>

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
  height: 100%;
  display: flex;
  align-items: center;
`;

const Card = styled.section`
  margin: 0 auto;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const SearchInputWrap = styled.div`
  position: relative;
  flex: 0 0 360px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.55;
  img {
  width: 15px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 6px;
  background: #F7F7F7;
  padding: 0 12px 0 34px;
  font-size: 12px;

  &:focus {
    border-color: #93c5fd;
    background: #ffffff;
  }
`;

const SearchButton = styled.button`
  height: 36px;
  padding: 0 18px;
  border-radius: 6px;
  background: #0075AF;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    opacity: 0.92;
  }
`;

const Table = styled.table`
  display: none; //表の表示について後日作業
  // width: 100%;
  // border-collapse: collapse;

  // th,
  // td {
  //   border: 1px solid #ddd;
  //   padding: 8px;
  // }

  // th {
  //   background: #f9fafb;
  // }
`;