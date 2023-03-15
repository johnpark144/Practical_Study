import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetail";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// @testing-library/react를 전체생성하여 다시 export
export * from "@testing-library/react";

// 다시 renderWithContext가 일반 testing-library의 render를 오버라이드 시켜서 render로 사용
export { renderWithContext as render };
