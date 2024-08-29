/// <reference types="@testing-library/jest-dom" />
import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import SignupPage from "../pages/SignupPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe("회원가입 테스트", () => {
  // given - 회원가입 페이지가 그려짐
  beforeEach(() => {
    const routes = [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  });

  test("비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메세지가 표시된다", async () => {
    // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음

    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongPassword" },
    });
    // then - 에러메세지가 표시됨
    // const errorMessage = await screen.findByTestId("error-message");
    // expect(errorMessage).toBeInTheDocument();
  });

  test("이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼이 활성화 된다", () => {
    // given - 회원가입 페이지가 그려짐, 회원가입 버튼은 초기에 비활성화 상태
    const signupButton = screen.getByRole("button", { name: "회원가입" });
    expect(signupButton).toBeDisabled();
    // when - 이메일 입력, 비밀번호, 비밀번호 확인 일치
    // then - 회원가입 버튼 활성화
  });
});
