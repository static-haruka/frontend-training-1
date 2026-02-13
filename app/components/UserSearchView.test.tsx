import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserSearchView from './UserSearchView';
import { MOCK_USERS } from '../user_search/mockUsers';


const USERS = MOCK_USERS;

function renderView(override?: Partial<React.ComponentProps<typeof UserSearchView>>) {
  const props: React.ComponentProps<typeof UserSearchView> = {
    keyword: '山',
    onChangeKeyword: () => {},
    users: USERS,
    selectedId: null,
    onSelectUser: () => {},
    onSearch: () => {},
    onBack: () => {},
    onDecide: () => {},
    ...override,
  };

  return render(<UserSearchView {...props} />);
}

test('未選択のとき、決定ボタンはdisabled', () => {
  renderView({ selectedId: null });

  expect(screen.getByRole('button', { name: '決定' })).toBeDisabled();
});

test('行クリックで onSelectUser が選択IDで呼ばれる', async () => {
  const user = userEvent.setup();
  const onSelectUser = jest.fn();

  renderView({ onSelectUser });

  await user.click(screen.getByText('12345678901234'));

  expect(onSelectUser).toHaveBeenCalledTimes(1);
  expect(onSelectUser).toHaveBeenCalledWith('12345678901234');
});

test('選択済みなら決定ボタンが押せて onDecide が呼ばれる', async () => {
  const user = userEvent.setup();
  const onDecide = jest.fn();

  renderView({ selectedId: '123', onDecide });

  const decideButton = screen.getByRole('button', { name: '決定' });
  expect(decideButton).toBeEnabled();

  await user.click(decideButton);

  expect(onDecide).toHaveBeenCalledTimes(1);
});

test('戻るボタンで onBack が呼ばれる', async () => {
  const user = userEvent.setup();
  const onBack = jest.fn();

  renderView({ onBack });

  await user.click(screen.getByRole('button', { name: '戻る' }));

  expect(onBack).toHaveBeenCalledTimes(1);
});

test('keywordが空ならテーブルは表示されない', () => {
  renderView({ keyword: '   ' }); 

  expect(screen.queryByText('Croooober ID')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: '戻る' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: '決定' })).not.toBeInTheDocument();
});

test('usersが空ならテーブルは表示されない', () => {
  renderView({ users: [] });

  expect(screen.queryByText('Croooober ID')).not.toBeInTheDocument();
});

test('入力すると onChangeKeyword が呼ばれる', async () => {
  const user = userEvent.setup();
  const onChangeKeyword = jest.fn();

  renderView({ keyword: '', onChangeKeyword });

  const input = screen.getByPlaceholderText('キーワード・電話番号で検索');
  await user.type(input, 'abc');

expect(onChangeKeyword).toHaveBeenCalledTimes(3);
expect(onChangeKeyword).toHaveBeenNthCalledWith(1, 'a');
expect(onChangeKeyword).toHaveBeenNthCalledWith(2, 'b');
expect(onChangeKeyword).toHaveBeenNthCalledWith(3, 'c');
});

test('検索ボタンで onSearch が呼ばれる', async () => {
  const user = userEvent.setup();
  const onSearch = jest.fn();

  renderView({ onSearch });

  await user.click(screen.getByRole('button', { name: '検索' }));

  expect(onSearch).toHaveBeenCalledTimes(1);
});




