import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "./../OrderEntry";

test("update scoop subtotal when scoops change.", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false }); // exact: false 는 부분 일치하면 true
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput); // 입력창에 있는것 clear
  await user.type(vanillaInput, "1"); // 입력창에 1 입력
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when topping change.", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toppingSubtotal = screen.getByText("toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  const mAndMCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  await user.click(mAndMCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent("3.00");
  await user.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

// 최종 합계
describe("grand total", () => {
  // 테스트 1 : scoop을 먼저 고르면
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();

    // 현재 합계 $0.00
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ }); // heading은 h1,h2...
    expect(grandTotal).toHaveTextContent("0.00");

    // vanilla scoop 2개 고르고 합계
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // 추가로 cherries Topping 고르고 합계
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  // 테스트 2 : topping을 먼저 고르면
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    // cherries Topping 고르고 합계
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    // 추가로 vanilla scoop 2개 고르고 합계
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  // 테스트 3 : 고른후 제거 해보기
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // cherries Topping을 고른다
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);

    // vanilla scoops 2개 고르고 전체 합계는 $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // vanilla scoop 하나 제거후 합계 3.50
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    // cherries Topping을 제거하고 합계 2.00
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
