'use client';

import styled from 'styled-components';
import type { User } from '@/app/user_search/page';

type Props = {
  keyword: string;
  onChangeKeyword: (v: string) => void;
  users: User[];
  selectedId: string | null;
  onSelectUser: (id: string) => void;
  onSearch: () => void;
  onBack: () => void;
  onDecide: () => void;
};

export default function UserSearchView({
  keyword,
  onChangeKeyword,
  users,
  selectedId,
  onSelectUser,
  onSearch,
  onBack,
  onDecide,
}: Props) {
  const showTable = keyword.trim() !== '' && users.length > 0;

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
              onChange={(e) => onChangeKeyword(e.target.value)}
            />
          </SearchInputWrap>

          <SearchButton type="button" onClick={onSearch}>
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
                {users.map((user) => {
                  const isSelected = selectedId === user.crooooberId;

                  return (
                    <TableRow
                      key={user.crooooberId}
                      $selected={isSelected}
                      onClick={() => onSelectUser(user.crooooberId)}
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
              <BackButton type="button" onClick={onBack}>
                戻る
              </BackButton>

              <DecideButton type="button" onClick={onDecide} disabled={selectedId === null}>
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
