import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import UserSearchView from './UserSearchView';
import { MOCK_USERS } from '../user_search/mockUsers';

const meta: Meta<typeof UserSearchView> = {
  component: UserSearchView,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof UserSearchView>;

const USERS = MOCK_USERS;

export const Empty: Story = {
  name: '空（未検索/結果なし）',
  args: {
    keyword: '',
    onChangeKeyword: () => {},
    users: [],
    selectedId: null,
    onSelectUser: () => {},
    onSearch: () => {},
    onBack: () => {},
    onDecide: () => {},
  },
};

export const Results: Story = {
  name: '検索結果あり（未選択）',
  args: {
    keyword: '山',
    onChangeKeyword: () => {},
    users: USERS,
    selectedId: null,
    onSelectUser: () => {},
    onSearch: () => {},
    onBack: () => {},
    onDecide: () => {},
  },
};

export const Interactive: Story = {
  name: '操作できる（選択→決定）',
  render: () => {
    const [keyword, setKeyword] = useState('山');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const filtered = keyword.trim() === '' ? [] : USERS;

    return (
      <UserSearchView
        keyword={keyword}
        onChangeKeyword={(v) => {
          setKeyword(v);
          setSelectedId(null);
        }}
        users={filtered}
        selectedId={selectedId}
        onSelectUser={setSelectedId}
        onSearch={() => {}}
        onBack={() => setSelectedId(null)}
        onDecide={() => console.log('decide', selectedId)}
      />
    );
  },
};
