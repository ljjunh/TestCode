import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("초기 렌더링", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  expect(confirmButton).toBeDisabled();
});

test("체크박스 첫 클릭시 버튼 활성화, 두번째 클릭 시 비활성화", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("호버 시 팝오버가 되는지 테스트", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // 초기에 팝오버가 숨겨졌는지
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  // 체크박스에 마우스 올리면 팝오버가 보이는지
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // 마우스 빼면 팝오버가 다시 숨겨지는지
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
