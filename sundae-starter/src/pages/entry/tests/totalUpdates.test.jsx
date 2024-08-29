import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("스쿱이 변경될 때 스쿱 소계가 업데이트 되는지 테스트", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  // 0달러로 시작하는지
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // 바닐라스쿱 1개로 업데이트하고 소계 확인
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // 텍스트 요소를 업데이트할때 첫번쨰로 clear를 해야함(전에 뭐가 있었는지 모르니까)
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // 초콜릿 스쿱 2개로 업데이트 하고 소계 확인
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("토핑이업데이트 될때마다 총액이 업데이트 되는지 테스트", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // 토핑 금액이 초기에 0.00인지 확인
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("최종 합계", () => {
  test("총액이 0.00으로 시작하는지 테스트", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");
    unmount();
  });

  test("스쿱을 먼저 추가하면 총액에 잘 추가되는지", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("토핑을 먼저 추가하면 총액에 잘 추가되는지", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("항목 삭제 시 총액이 제대로 업데이트 되는지", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // 체리 추가
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // 이때 총액은 1.50

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    // 이때 총액은 5.50

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    // 하나 뺏으니까 3.50
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
