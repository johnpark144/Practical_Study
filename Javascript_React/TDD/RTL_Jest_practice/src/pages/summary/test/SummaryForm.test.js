import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Checkbox enables button on first click and disables on second click", async () => {
  // userEvent는 시뮬레이션이 진행되기 때문에 async 필수
  const user = userEvent.setup(); // user가 직접 사용하듯 시뮬레이션 setup함

  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  await user.click(checkbox); // click 이벤트를 발생시 (fireEvent로 대체가능 // await 필수
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    // 아직 이런 태그가 없어야 하는게 정상인데, getBy로하면 에러를 발생시킴 그래서 queryBy사용
    "no ice cream will actually be delivered"
  );
  expect(nullPopover).not.toBeInTheDocument(); // 해당 태그가 없는지 확인

  const termsAndConditions = screen.getByText("Confirm order");

  await user.hover(termsAndConditions); // 해당 태그에 하버 될때
  const popover = screen.getByText("No ice cream will actually be delivered");
  expect(popover).toBeInTheDocument();

  await user.unhover(termsAndConditions); // 해당 태그에서 마우스 빠져나올때
  expect(popover).not.toBeInTheDocument();
});
