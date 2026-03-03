import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import UserSearchView from './UserSearchView';
import { MOCK_USERS } from '../user_search/mockUsers';

const meta: Meta<typeof UserSearchView> = {
  component: UserSearchView,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof UserSearchView>;

/**
 * 初期状態（検索結果なし）
 */
export const Empty: Story = {
  name: 'Empty State',
  args: {
    keyword: '',
    users: [],
    selectedId: null,
    onChangeKeyword: () => {},
    onSelectUser: () => {},
    onSearch: () => {},
    onBack: () => {},
    onDecide: () => {},
  },
};

/**
 * 検索・選択のインタラクション確認用
 */
export const Interactive: Story = {
  name: 'Interactive Demo',
  render: () => {
    const [keyword, setKeyword] = useState('山田');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const filtered = keyword.trim() === '' ? [] : MOCK_USERS;

    return (
      <UserSearchView
        keyword={keyword}
        onChangeKeyword={(v) => { setKeyword(v); setSelectedId(null); }}
        users={filtered}
        selectedId={selectedId}
        onSelectUser={setSelectedId}
        onSearch={() => {}}
        onBack={() => setSelectedId(null)}
        onDecide={() => console.log('Selected:', selectedId)}
      />
    );
  },
};