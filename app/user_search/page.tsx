'use client'; /* Styled Components を使うために明示（ブラウザで動くコンポーネントを生成） */

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const q = keyword.trim();
    if (q === '') return [];

    return USERS.filter(
      (user) => user.name.includes(q) || user.phone.includes(q) || user.crooooberId.includes(q)
    );
  }, [keyword]);

  const handleSearch = () => {};

  const handleBack = () => {
    setSelectedId(null);
  };

  const handleDecide = () => {
    if (selectedId === null) return;

    router.push(`/customer/${selectedId}`);
  };

  return (
    <UserSearchView
      keyword={keyword}
      onChangeKeyword={(v) => {
        setKeyword(v);
        setSelectedId(null);
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
