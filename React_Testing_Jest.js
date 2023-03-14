// ################ 리미인드 ###################################################################################################################################
// 다하고 이론부분 지을거 지우기
// 매쳐(Matcher) 효과 정리하기





// ################ RTL 세팅 및 간단한 이론  ##################################################################################################################
// TDD는 항상 기능을 추가하기전 먼저 테스트코드를 작성하여야한다
// 테스팅 라이브러리 Docs : https://testing-library.com/docs/

// getBy, queryBy, findBy 정리 : https://testing-library.com/docs/react-testing-library/cheatsheet/
// getByRole의 Role부분 정리 :  https://www.w3.org/TR/wai-aria/#textbox
// 매쳐(Matcher) 정리: https://github.com/testing-library/jest-dom#tohavetextcontent

// ################ RTL과 Jest의 역할
// RTL -> 가상 Dom을 만들거나 상호작용하는 등 테스트를 간접적으로 돕는 역할 (render, screen, fireEvent 등)
// Jest -> 단언(Assertion)인 expect, test 등 과 같이 테스트를 직접 하게함    // Jest Watch Mode는 코밋할때 변화가 있으면 실행 (변화없으면 실행X)
  
// ################ 테스트의 종류
//  단위 테스트 (Unit test)  : 로직이 너무 복잡한경우, 코드 품질을 개선하기 위해(안정성, 완성도), 버그발생 최소화, 문서화, 오류 조기발견, 코드변경 용이
//  통합 테스트 (Integration test)
//  기능 테스트 (Functional test)
//  인수 테스트 (Acceptance test / End-t-End Test / E2E Test)

// ################ package.json (create-react-app 기준)
"scripts": {
    "test": "react-scripts test",
  },
    
// ################ App.test.js (create-react-app 기준)
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {  // global test 메서드는 두 인자(argument)를 받음 (string, function)
  render(<App />);  // render 는 인자로 받은 컴포넌트를 가상 Dom에 생성
  const linkElement = screen.getByText(/learn react/i); // screen.getByText는 텍스트를 기반으로 요소를 찾음 (Regular expression 혹은 문자열로)
  expect(linkElement).toBeInTheDocument(); // 성공과 실패를 확인하는 단언(Assertion)부분. // 매쳐(Matcher)는 단언(Assertion)부분의 타입
});

// ################ 단언(Assertion) = expect // 매쳐(Matcher) = .~
  expect(element.textContent).toBe('hello');  // expect안에 있는게 'hello'여야함
  expect(elementsArr).toHaveLength(7);  // 배열의 길이가 7이어야함

// ################ screen 메소드 ####################################################################################################################
// getBy, queryBy, findBy는 컴포넌트의 요소들을 확인하는 데 사용
// getBy, queryBy, findBy 정리 : https://testing-library.com/docs/react-testing-library/cheatsheet/
// getBy > queryBy > findBy (사용 추천 순)  // queryBy는 주로 없는게 정상인 태그를 확인할때 // findBy는 주로 비동기 데이터를 불러올때 사용
// getBy 중에서도 getByRole이 가장 선호됨.

// ------------------------------------
// Type of Query 	0 Matches	            1 Match	          >1 Matches	    Retry(Async/Await)

// getBy...	    Throw error	      Return element	      Throw error	          No
// queryBy...  	  Return null     	Return element	      Throw error	          No
// findBy...	    Throw error     	Return element	      Throw error	          Yes

// getAllBy... 	  Throw error	        Return array	      Return array	        No
// queryAllBy...  Return []	           Return array	        Return array     	    No
// findAllBy...	  Throw error       	Return array	      Return array	        Yes
// -------------------------------------

// ################ ESLint, Prettier ###############################################################################################################
// ESLint : 린터(Linter)로 사용되는 툴 중 하나, 소프트웨어 코드를 분석하여 버그를 찾고, 코드 스타일이나 실수를 검사하는데 사용. 문법 오류, 디버깅 및 성능 최적화 실수, 가독성 및 일관성 오류 등을 찾아냄
// Prettier : 포매터(Formatter)로써, 소프트웨어 코드의 모양을 바꾸는 툴로, 들여쓰기나 공백, 줄바꿈 등의 공통적인 코딩 스타일을 적용하기 위해 사용

// ################ 테스팅라이브러리와 jest-dom를 위한 ESLint #############################################################################################
// npm i eslint-plugin-testing-library eslint-plugin-jest-dom

// 규칙 참고 링크
// https://github.com/testing-library/eslint-plugin-jest-dom
// https://github.com/testing-library/eslint-plugin-testing-library
// https://github.com/bonnie/bonniedotdev/blob/main/client/.eslintrc.json

// ################ package.json 파일에서 해당내용 지우기
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },

// ################ .eslintrc.json (규칙을 정할 수 있음, 위에 규칙링크 참고)
{
  "plugins": ["testing-library", "jest-dom"],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}
// ################ .vscode/settings.json (prettier, eslint 같이)
{
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}


// ########## .only, .skip (테스트 할것만) #####################################################################################################
Watch Usage
 › Press a 모든 테스트
 › Press f 실패한 것만 테스트
 › Press q watch mode 나가기
 › Press p 특정 파일이름만 테스트
 › Press t 특정 테스트이름만 테스트
 › Press Enter 테스트 실행
 
// ########## 특정 파일 안에있는 모든 테스트 중에 특정 테스트만
 // .only 가 있으면 .only있는 부분만 테스트
 // .skip 이 있으면 .skip있는 부분은 제외
 
test.only("handles error for scoops", () => {
});
test.skip("handles error for scoops", () => {
});
 

// #################################################################################################################################################
// ####### Color Button App ########################################################################################################################
// #################################################################################################################################################
// ################ 빨간, 파랑 토글 버튼과 체크박스 테스트 (fireEvent, getByRole) ###################################################################
// ################ App.test.js (create-react-app 기준)
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Button has correct initial color, and updates when clicked', () => {
  render(<App />);
  const colorBtn = screen.getByRole("button", { name: "Change to blue" }); // "Change to blue" 라는 버튼이 있는지
  expect(colorBtn).toHaveStyle(`background-color: red`)

  fireEvent.click(colorBtn); // 이벤트메서드를 가짐 (버튼 클릭시에)
  expect(colorBtn).toHaveStyle(`background-color: blue`) // 파랑색으로 변경되있는지
  expect(colorBtn).toHaveTextContent('Change to red') // 해당 문자가 있는지
});

test('Initial conditions',() => {
  render(<App />);
  const colorBtn = screen.getByRole("button", { name: "Change to blue" });
  expect(colorBtn).toBeEnabled(); // 활성화가 잘 되어있는지

  const checkbox = screen.getByRole("checkbox"); // jsx에서 aria-label={name}으로 checkbox의 name을 줄수도있고, role="spinbutton"으로 role도 지정가능
  expect(checkbox).not.toBeChecked(); // checkbox가 체크가 안된 상태인
})

// ################ App.js (create-react-app 기준)
import { useState } from 'react';
import './App.css';

function App() {
  const [btnColor, setBtnColor] = useState("red");
  const newBtnColor = btnColor === 'red' ? 'blue' : 'red';
  return (
    <div>
      <button onClick={()=>setBtnColor(newBtnColor)} style={{ backgroundColor : btnColor }}>
        Change to {newBtnColor}
      </button>
      <input type="checkbox" />
    </div>
  );
}
export default App;

// ################ LogRoles ############################################################################################################################
// 페이지가 길어서 역할이있는 항목들이 햇갈릴때 사용됨 (역할과 이름이 콘솔로그 처럼 출력됨) // 코드가 지저분해질 가능성이 있어서 안쓰는 경우도 많음

// ################ App.test.js (create-react-app 기준)
import { render, screen } from '@testing-library/react';
import { logRoles } from '@testing-library/dom'
import App from './App';

test('Button has correct initial color', () => {
  const { container } = render(<App />);
  logRoles( container );  // 이 컴포넌트안에 역할과 이름 출력

  const colorBtn = screen.getByRole("button", { name: "Change to blue" }); 
  expect(colorBtn).toHaveStyle(` background-color: red `)
});

// ################ 그룹 테스트, 유닛 테스팅 함수 ##############################################################################################################
//  describe는 테스트를 그룹으로 묶어줌
// ################ App.test.js (create-react-app 기준)
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

// ... 생략 ...

describe('spaces before came-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue'); // 함수 인자와 리턴값 (글자사이에 대문자가 있으면 한칸띄워서 나오는지 테스트)
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})

// ####### App.js (create-react-app 기준)
export const replaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');  // 정규표현식 (글자사이에 대문자가 있으면 앞에 한칸씩 띄어주는역할)
}


// #################################################################################################################################################
// ####### 아이스크림 주문 앱 ########################################################################################################################
// #################################################################################################################################################
// ################ fireEvent와 userEvent ######################################################################################################
// fireEvent : userEvent보다 정교하지는 않지만, 작성하기 쉽고 이용할 옵션이 많음

// userEvent :
// 광범위하고 복잡한 이벤트 범주를 다룰 수 있고, 실제 시뮬레이션으로 이벤트를 발생시키므로 fireEvent보다 더 정교함, 그래서 항상 프로미스를 반환하기 때문에 async, await해야함
// fireEvent보다 개수가적음.

// 결론 : userEvent에 있는것은 userEvent에서쓰고 없으면 fireEvent에서 사용할 것을 권장.

// ################ userEvent (실제 시뮬레이션) ###########################################################################################################
// ################ SummaryForm.test.js
import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Checkbox enables button on first click and disables on second click", async () => { // userEvent는 시뮬레이션이 진행되기 때문에 async 필수
  const user = userEvent.setup(); // user가 직접 사용하듯 시뮬레이션 setup

  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");  
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  await user.click(checkbox); // click 이벤트를 발생시 (fireEvent로 대체가능 // await 필수
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});


// ################ SummaryForm.js
import React, { useState } from "react";

function SummaryForm() {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <input onChange={() => setDisabled(!disabled)} type="checkbox" />
      <button disabled={disabled}>Confirm order</button>
    </>
  );
}
export default SummaryForm;


// ################ queryBy (매치되는 태그가 없으면 null을 반환, 없는 태그를 확인할때 사용) 와 hover ####################################################################
// ################ SummaryForm.test.js
import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

//  ... 생략 ...
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


// ################ SummaryForm.jsx
import React, { useState } from "react";

function SummaryForm() {
  const [disabled, setDisabled] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  return (
    <>
      {showPopover ? <div>No ice cream will actually be delivered</div> : ""}
      <input onChange={() => setDisabled(!disabled)} type="checkbox" />
      <button
        onMouseOver={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        disabled={disabled}
      >
        Confirm order
      </button>
    </>
  );
}

export default SummaryForm;


// ################ Mock Service Worker (MSW) - 요청 가로채기 ################################################################################################
// npm install msw
// https://mswjs.io/docs/

// ################ mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

// ################ setupTests.js (App.js와 같은폴더)
import "@testing-library/jest-dom";
import { server } from "./mocks/server.js";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

// ################ mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => { // http://localhost:3030/scoops 로 get할시 서버없이 요청을 가로채서 밑에 json파일을 제공
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
];


// ################ await findBy(불러오기 실패하면 다시시도, 비동기 적 일때 주로 사용 ) // with Axios #####################################################################################################
// npm install axios

// ################ package.json
  "jest": {
    "moduleNameMapper": {
      "axios": "axios/dist/node/axios.cjs"
    }
  }

// ################ entry/test/options.test.js
import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); // findBy는 주로 비동기 데이터를 불러올때 사용
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]); // toEqual은 altText 배열과 동일한 값을 가졌는지 확인
});


// ################ entry/options.jsx
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import axios from "axios";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {});
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <div>{optionItems}</div>;

// ################ entry/ScoopOption.jsx
export default function ScoopOption({ name, imagePath }) {
  return (
    <div>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
    </div>
  );
}

// ################ entry/ToppingOption.jsx
export default function ToppingOption({ name, imagePath }) {
  return (
    <div>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
    </div>
  );
}


// ########## waitFor() 비동기적 실행 해야 하는 부분을 위해 #########################################################################################################
// ########## OrderEntry.test.js
import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test.only("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
  await waitFor(async () => {
    // 밑에 alerts가 비동기적으로 처리된 뒤 나오기 때문에 waitFor을 사용하여 테스트를 함
    const alerts = await screen.findAllByText(  // 두군데에서 불러오
      "An unexpected error occurred. Please try again later."
    );
    expect(alerts).toHaveLength(2); // 컴퓨터 속도에따라 waitFor이없으면 1이나올 수있고 2가 나올 수있음
  });
});


// ########## wrapper (상태관리 등과 같은 Provider를 적용) ##############################################################################################################
// ########## totalUpdates.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetail";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider});  // wrapper의 Provider로 렌더할 태그를 감싸줌

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false }); // exact: false 는 부분 일치하면 true
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", { // jsx에서 role="spinbutton"으로 role을 지정가능하고, aria-label에 name을 줄수도있다
    name: "Vanilla",
  });
  await user.clear(vanillaInput);   // 입력창에 있는것 clear
  await user.type(vanillaInput, "1");  // 입력창에 1 입력
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

// ################################################################################################## 전체 테스팅 앱에 한꺼번에 Provider를 적용 하는법 ##########
// ########## testing-library-utils.jsx // 이미 OrderDetailsProvider의 wrapper로 감싼 render를 export 시켜서 
import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// @testing-library/react를 전체생성하여 다시 export
export * from "@testing-library/react";

// 다시 renderWithContext가 일반 testing-library의 render를 오버라이드 시켜서 render로 사용
export { renderWithContext as render };


// ########## totalUpdates.test.js
import { render, screen } from "../../../test-utils/testing-library-utils";   // from @testing-library/react에서 변경

// ... 생략 ...

// ################  ############################################################################################################################
















