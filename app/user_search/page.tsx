'use client'; /* Styled Components を使うために明示（ブラウザで動くコンポーネントを生成） */

import { useMemo, useState } from 'react';
import UserSearchView from '../components/UserSearchView';
import { MOCK_USERS } from './mockUsers';

const USERS = MOCK_USERS;

export type User = {
  crooooberId: string;
  name: string;
  phone: string;
  address: string;
};

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

  return (
    <UserSearchView
      keyword={keyword}
      onChangeKeyword={(v) => {
        setKeyword(v);
        setSelectedId(null); // 検索条件が変わったら選択はリセット
      }}
      users={filteredUsers}
      selectedId={selectedId}
      onSelectUser={setSelectedId}
      onSearch={handleSearch}
      onBack={handleBack}
      onDecide={handleDecide}
    />
  );
}
