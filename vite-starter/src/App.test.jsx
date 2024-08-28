import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helper";

test("버튼클릭 플로우", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("medium-violet-red");
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveTextContent(/red/i);
  expect(buttonElement).toHaveClass("midnight-blue");
});

test("체크박스 플로우", () => {
  render(<App />);

  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  // 초기 설정 확인
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // 체크박스를 클릭했을 때
  fireEvent.click(checkboxElement);
  // 버튼 비활성화 확인
  expect(buttonElement).toBeDisabled();
  // 버튼 색 확인
  expect(buttonElement).toHaveClass("gray");

  // 체크박스를 한번 더 클릭 했을 때
  fireEvent.click(checkboxElement);
  // 버튼 활성화
  expect(buttonElement).toBeEnabled();
  // 버튼 색 확인
  expect(buttonElement).toHaveClass("medium-violet-red");
});

test("버튼 클릭 후 체크박스 플로우", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  // 버튼을 클릭해서 파란색으로 변경
  fireEvent.click(buttonElement);
  // 체크박스를 클릭해서 버튼 비활성화
  fireEvent.click(checkboxElement);
  // 버튼이 비활성화 됐는지 확인
  expect(buttonElement).toBeDisabled();
  // 버튼 색 확인
  expect(buttonElement).toHaveClass("gray");

  // 체크 박스를 한번 더 눌러서 버튼 활성화
  fireEvent.click(checkboxElement);
  // 버튼 비활성화 확인
  expect(buttonElement).toBeEnabled();
  // 버튼 색 확인
  expect(buttonElement).toHaveClass("midnight-blue");
});

describe("kebabCaseToTitleCase", () => {
  test("하이픈 없이 잘 작동되는지", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("하이픈 하나일때 잘 작동되는지", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("하이픈 여러개일때 잘 작동되는지", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
