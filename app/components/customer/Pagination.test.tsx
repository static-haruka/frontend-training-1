import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

test("ページ番号が totalPages 分だけ表示される（makePagesを通す）", () => {
  render(<Pagination page={1} totalPages={4} onChange={() => {}} />);

  expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
});

test("前へ/次へクリックで onChange が呼ばれる", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(<Pagination page={2} totalPages={3} onChange={onChange} />);

  await user.click(screen.getByRole("button", { name: "前へ" }));
  expect(onChange).toHaveBeenCalledWith(1);

  await user.click(screen.getByRole("button", { name: "次へ" }));
  expect(onChange).toHaveBeenCalledWith(3);
});

test("ページ番号ボタンをクリックすると onChange がそのページ番号で呼ばれる（onChange(p) 分岐）", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(<Pagination page={1} totalPages={3} onChange={onChange} />);

  await user.click(screen.getByRole("button", { name: "2" }));

  expect(onChange).toHaveBeenCalledWith(2);
});
