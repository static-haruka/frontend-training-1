'use client';

import { useState } from 'react';
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
  const [users, setUsers] = useState<User[]>(USERS);

  const handleSearch = () => {
    const q = keyword.trim();

    if (q === '') {
      setUsers(USERS);
      return;
    }

    const filtered = USERS.filter(
      (user) => user.name.includes(q) || user.phone.includes(q) || user.crooooberId.includes(q)
    );

    setUsers(filtered);
    setSelectedId(null);
  };

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
      users={users}
      selectedId={selectedId}
      onSelectUser={setSelectedId}
      onSearch={handleSearch}
      onBack={handleBack}
      onDecide={handleDecide}
    />
  );
}