import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserSearchView from './UserSearchView';

const USERS = [
  { crooooberId: '123', name: '山田', phone: '090', address: '東京' },
  { crooooberId: '456', name: '小池', phone: '080', address: '神奈川' },
];

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

  // 行内のテキストをクリック（IDセル）
  await user.click(screen.getByText('123'));

  expect(onSelectUser).toHaveBeenCalledTimes(1);
  expect(onSelectUser).toHaveBeenCalledWith('123');
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
