import { render, screen, fireEvent } from "@testing-library/react";
import HistoryFilters from "./HistoryFilters";
import { mockCustomer } from "./mocks";

function renderView(override?: Partial<React.ComponentProps<typeof HistoryFilters>>) {
  const props: React.ComponentProps<typeof HistoryFilters> = {
    cars: mockCustomer.cars,
    value: {
      keyword: "",
      carId: "",
      from: "",
      to: "",
      hasCommentOnly: false,
    },
    onChange: jest.fn(),
    ...override,
  };
  return { ...render(<HistoryFilters {...props} />), props };
}

test("キーワード入力で onChange が呼ばれる", () => {
  const onChange = jest.fn();
  renderView({ onChange });

  fireEvent.change(screen.getByPlaceholderText("キーワードで検索"), {
    target: { value: "DUMMY" },
  });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ keyword: "DUMMY" }));
});

test("from入力で onChange が呼ばれる", () => {
  const onChange = jest.fn();
  renderView({ onChange });

  fireEvent.change(screen.getByLabelText("開始日"), {
    target: { value: "2022-07-01" },
  });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ from: "2022-07-01" }));
});

test("to入力で onChange が呼ばれる", () => {
  const onChange = jest.fn();
  renderView({ onChange });

  fireEvent.change(screen.getByLabelText("終了日"), {
    target: { value: "2022-07-01" },
  });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ to: "2022-07-01" }));
});

test("愛車selectの変更で onChange が呼ばれる", () => {
  const onChange = jest.fn();
  renderView({ onChange });

  fireEvent.change(screen.getByRole("combobox", { name: "愛車" }), {
    target: { value: "car-1" },
  });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ carId: "car-1" }));
});
