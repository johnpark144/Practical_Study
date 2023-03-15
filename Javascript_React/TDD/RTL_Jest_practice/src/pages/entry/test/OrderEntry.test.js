import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    // 밑에 alerts가 비동기적으로 처리된 뒤 나오기 때문에 waitFor을 사용하여 테스트를 함
    const alerts = await screen.findAllByText(
      "An unexpected error occurred. Please try again later."
    );
    expect(alerts).toHaveLength(2); // 컴퓨터 속도에따라 waitFor이없으면 1이나올 수있고 2가 나올 수있음
  });
});
