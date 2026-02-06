'use client'; /* Styled Components を使うために明示（ブラウザで動くコンポーネントを生成） */

import { useMemo, useState } from 'react';
import styled from 'styled-components';

type User = {
  crooooberId: string;
  name: string;
  phone: string;
  address: string;
};


const USERS: User[] = [
  {
    crooooberId: '12345678901234',
    name: '山田 太郎',
    phone: '09042241234',
    address: '東京都練馬区富士台1-1-1 203号室',
  },
  {
    crooooberId: '32323343022332',
    name: '山田 太郎',
    phone: '09042241234',
    address: '東京都練馬区富士台1-1-1 203号室',
  },
  {
    crooooberId: '98382329238838',
    name: '小池 若奈',
    phone: '09042241234',
    address: '東京都練馬区富士台1-1-1 203号室',
  },
];


export default function UserSearchPage() {
  const [keyword, setKeyword] = useState('');

  const filteredUsers = useMemo(() => {
    const q = keyword.trim();
    if (q === '') return [];
  return USERS.filter((user) =>
    user.name.includes(q) ||
    user.phone.includes(q) ||
    user.crooooberId.includes(q)
  );

  }, [keyword]);

  const handleSearch = () => setKeyword('');

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

      {keyword.trim() !== '' && filteredUsers.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Croooober ID</th>
              <th>氏名</th>
              <th>電話番号</th>
              <th>住所</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.crooooberId}>
                <td>{user.crooooberId}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
  // display: none; //表の表示について後日作業
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