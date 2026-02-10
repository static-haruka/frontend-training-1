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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const q = keyword.trim();
    if (q === '') return [];

    return USERS.filter(
      (user) => user.name.includes(q) || user.phone.includes(q) || user.crooooberId.includes(q)
    );
  }, [keyword]);

  const handleSearch = () => {
  };

  const handleBack = () => {
    setSelectedId(null);
  };

  const handleDecide = () => {
    if (selectedId === null) return;

    // 次チケットで「ユーザー詳細へ遷移」に差し替え
    const selectedUser = USERS.find((u) => u.crooooberId === selectedId);
    console.log('Decide user:', selectedUser);
  };

  const showTable = keyword.trim() !== '' && filteredUsers.length > 0;

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
              onChange={(e) => {
                setKeyword(e.target.value);
                setSelectedId(null); // 検索条件が変わったら選択はリセット
              }}
            />
          </SearchInputWrap>

          <SearchButton type="button" onClick={handleSearch}>
            検索
          </SearchButton>
        </SearchRow>

        {showTable && (
          <>
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
                {filteredUsers.map((user) => {
                  const isSelected = selectedId === user.crooooberId;

                  return (
                    <TableRow
                      key={user.crooooberId}
                      $selected={isSelected}
                      onClick={() => setSelectedId(user.crooooberId)}
                      role="button"
                      tabIndex={0}
                      aria-selected={isSelected}
                    >
                      <td>{user.crooooberId}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>

            <ButtonRow>
              <BackButton type="button" onClick={handleBack}>
                戻る
              </BackButton>

              <DecideButton type="button" onClick={handleDecide} disabled={selectedId === null}>
                決定
              </DecideButton>
            </ButtonRow>
          </>
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
  background: #f7f7f7;
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
  background: #0075af;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    opacity: 0.92;
  }
`;

const Table = styled.table`
  margin-top: 18px;
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    font-size: 12px;
  }

  th {
    background: #f9fafb;
    text-align: left;
    font-weight: 600;
  }
`;

const TableRow = styled.tr<{ $selected: boolean }>`
  background: ${(p) => (p.$selected ? '#eaf3fb' : 'transparent')};

  &:hover {
  }
`;

const ButtonRow = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: center;
  gap: 22px;
`;

const BackButton = styled.button`
  height: 44px;
  min-width: 180px;
  border-radius: 8px;
  // background: #ffffff;
  border: 1px solid #0075af;
  color: #0075af;
  font-weight: 600;

  &:hover {
    opacity: 0.92;
  }
`;

const DecideButton = styled.button`
  height: 44px;
  min-width: 180px;
  border-radius: 8px;
  background: #0075af;
  border: 1px solid #0075af;
  color: #ffffff;
  font-weight: 600;

  &:hover {
    opacity: 0.92;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
