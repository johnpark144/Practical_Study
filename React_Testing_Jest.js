// ################ 리미인드 ###################################################################################################################################
// 다하고 이론부분 지을거 지우기
// 매쳐(Matcher) 효과 정리하기, 자주쓰는 fireEvent, userEvent, Role 정리

// ######### 인덱스 (Ctrl + F) ########################################################### (-> 인덱스에 있는데 찾기 안되면 찾아서 인덱스 변경) ##################
// 간단한 이론 -- 참고링크
// screen 메소드
// ESLint -- 규칙 참고
// 테스트 할것만 -- .only, .skip, Watch Usage
// 자주쓰는 정규 표현식
// fireEvent, getByRole -- @testing-library/react, toHaveStyle, toHaveTextContent, toBeChecked, toBeEnabled, aria-label, role="spinbutton"
// 디버깅 -- screen.debug(), LogRoles 
// 그룹 테스트, 유닛 테스팅 함수 -- describe, toBe, 함수 인자와 리턴값
// userEvent
// queryBy -- 현재 없는 태그를 확인할때, queryByText, toBeInTheDocument, unhover, 
// Mock Service Worker -- MSW, 요청 가로채기
// await findBy -- 비동기 적 일때, toEqual, alt로 name, findBy를 위한 타임아웃 시간
// waitFor -- toHaveLength
// wrapper -- Provider를 적용, exact: false, aria-label, user.type, user.clear, 입력창에 1 입력, 한꺼번에 Provider를 적용
// 목 함수 -- Mocks functions, jest.fn(), 지정값, 고정값, 몇번 호출, mock.calls, mock.results,  불린 적이 있는지, 
// -->, toBeCalled, toBeCalledTimes, toBeCalledWith, lastCalledWith, 임시로 벨류를 리턴,  mockReturnValue, mockResolvedValue, 임의로 테스트, 임시로 벨류를 비동기식으로
// 기타 유용한 매쳐들 -- 동일한지, toBe, toEqual, toStrictEqual, 비슷한지, 소수점 계산, toBeCloseTo, 초과, 이상, 미만, 이하 toBeGreaterThan, toBeLessThan
// -->, 문자열이 포함 또는 매치,  toMatch, 배열에 포함, toContain, 에러가 발생하는지, 에러내용, toThrow, 
// 전후 작업 -- beforeEach, afterEach
// toMatchSnapshot -- 스냅샷을 비교, 전테스트 값과 비교
// 기타 유용한 getBy -- getByRole, heading, level, textbox, getByLabelText, htmlFor을 찾아서 id가 같은 textbox, selector: "textarea"
// -->, getByDisplayValue, getByPlaceholderText, getByTitle, getByAltText, getBy찾기 최후의 수단, getByTestId, data-testid
// 기타 유용한 userEvent

// ######### RTL, Jest 관한 정보 링크 ####################################################################################################################




// ################ RTL 세팅 및 간단한 이론  ##################################################################################################################
// TDD는 항상 기능을 추가하기전 먼저 테스트코드를 작성하여야한다
// 테스트시 아래와같이 주석으로 할일을 미리 적어두면 편함
        test('something',()=>{
          // 렌더 컴포넌트
          // 'Button'이라는 버튼이있는지 확인
          // 배경화면색이 하얀색인지 확인
          //  버튼 클릭
          //  배경 색 변경
        })

// ################ 참고링크
// 테스팅 라이브러리 Docs : https://testing-library.com/docs/

// getBy, queryBy, findBy 정리 : https://testing-library.com/docs/react-testing-library/cheatsheet/
// getByRole의 Role부분 정리 :  https://www.w3.org/TR/wai-aria/#textbox
// RTL 매쳐(Matcher) 정리: https://github.com/testing-library/jest-dom#tohavetextcontent
// Jest 매쳐(Matcher) 정리: https://jestjs.io/docs/expect
// userEvent 정리 : https://testing-library.com/docs/ecosystem-user-event#api

// ################ RTL과 Jest의 역할
// RTL -> 가상 Dom을 만들거나 상호작용하는 등 테스트를 간접적으로 돕는 역할 (render, screen, fireEvent 등)
// Jest -> 단언(Assertion)인 expect, test 등 과 같이 테스트를 직접 하게함    // Jest Watch Mode는 코밋할때 변화가 있으면 실행 (변화없으면 실행X)
  
// ################ 테스트의 종류
//  단위 테스트 (Unit test)  : [jest] 로직이 너무 복잡한경우, 코드 품질을 개선하기 위해(안정성, 완성도), 버그발생 최소화, 문서화, 오류 조기발견, 코드변경 용이
//  통합 테스트 (Integration test)
//  기능 테스트 (Functional test)
//  인수 테스트 (Acceptance test / End-t-End Test / E2E Test) :  [cypress] 브라우저에서 실행하여 사용자 관점에서 테스트, 오래걸릴 수 있음 (로그인, 공유 링크 등에서 사용)

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

// ####### 자주쓰는 정규 표현식 #####################################################################################################
/.*Account.*/i  // 대소문자 구분없이 Account가 포함 되있는지


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

// ################ 디버깅 ################################################################################################### Screen.debug() #################
//  테스트 중에 렌더링 된 DOM이 어떻게 되어 있는지 확인하는 데 사용되는 도구,  콘솔에 HTML 문자열을 출력, 밑에 빨간줄 떠도 걍 무시해도됨 
// 주로 확인하고 싶은 부분 앞뒤로 작성
screen.debug()  

// ############################################################################################################################# LogRoles #################
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
// ################ fireEvent와 userEvent (13버전 지원X) ###########################################################################################
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


// ################ queryBy (매치되는 태그가 없으면 null을 반환, 스피너같이 현재 없는 태그를 확인할때 사용) 와 hover ################################################
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

// ################ mocks/handlers.js --- Docs복붙하여 json만 원하는 상태로 바꿔줘 야
import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => { // http://localhost:3030/scoops 로 get할시 서버없이 요청을 가로채서 밑에 json파일을 제공
    return res(ctx.status(200),         // 500으로 두면 서버에러 처리 // 테스트 하나만 500으로 두고싶으면 바로 아래와 코드같이 테스트안에 server.use를 사용
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
];


// 테스트 하나만 500 예시
// 
// test("에러 테스트", async () => {
//   server.use(
//     rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
//       return res(ctx.status(500));
//     })
//   );
// });

// ################ mocks/server.js  --- Docs복붙
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
export const server = setupServer(...handlers);         // handlers에서 가져와 서버를 구성

// ################ setupTests.js (App.js와 같은폴더에)   --- Docs복붙
import "@testing-library/jest-dom";
import { server } from "./mocks/server.js";

beforeAll(() => server.listen());       // 테스트 시작전 server실행
afterEach(() => server.resetHandlers());        // 각 테스트가 끝날때마다 handlers리셋
afterAll(() => server.close());         // 테스트 시작전 server종료 

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

  const scoopImages = await screen.findAllByRole("img", {  // findBy는 주로 비동기 데이터를 불러올때 // 사용 alt로 name 줄수있음
          name: /scoop$/i
        },{
          timeout: 2000         // findBy를 위한 타임아웃 시간을 정할 수 있음
  });
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
        alt={`${name} scoop`}           // 사용 alt로 name 줄수있음
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
        alt={`${name} topping`}         // 사용 alt로 name 줄수있음
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


// ##### 목 함수(Mocks functions) // jest.fn() #########################################################################################################
// 목 함수(Mocks functions)는 테스트를 위한 다른 함수를 대체할 수 있는 도구로 임의 데이터를 반환하여 테스트 속도가 빨라지고, 에러를 회피할 수 있는 등 장점
// Date.now = jest.fn(() => 123456789)  // ex) Date.now는 계속 바뀌는데 지정값으로 오버라이드 할수있음 (계속 변하는 값을 고정값으로 변경가능)

// ########## 예시 1
test("test1", () => {
  const mockFn = jest.fn((num) => num + 1);
  mockFn(10);
  mockFn(20);
  mockFn(30);

  console.log(mockFn.mock.calls);       // [ [ 10 ], [ 20 ], [ 30 ] ]  // 무엇이 인수인지, length통해 몇번 호출됬는지 확인 가능
  console.log(mockFn.mock.calls.length);       // 3  // 무엇이 인수인지, length통해 몇번 호출됬는지 확인 가능
  console.log(mockFn.mock.results);     // [ { type: 'return', value: 11 }, { type: 'return', value: 21 }, { type: 'return', value: 31 } ]   // 결과값을 같이
  
  expect(mockFn.mock.calls.length).toBe(3);
});

// ########## 예시 2
test("test2", () => {
  const mockFn = jest.fn();
  mockFn(10, 20);
  mockFn();
  mockFn(30, 40);

  expect(mockFn).toBeCalled();   // 불린 적이 있는지
  expect(mockFn).toBeCalledTimes(3);    // 총 3번 불렸는지
  expect(mockFn).toBeCalledWith(10, 20);    // 인수 10, 20이 같이 불린적있는지
  expect(mockFn).lastCalledWith(30, 40);    // 인수 30, 40이 마지막에 같이 불렸는지
});

// ########## 예시 3 (mockReturnValue, mockReturnValueOnce) // 임시로 벨류를 리턴
test("홀수는 123", () => {
  const mockFn = jest.fn();

  mockFn
    .mockReturnValueOnce(true)  // mockReturnValueOnce는 앞에하나더 있을때
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValue(true);

  const result = [1, 2, 3, 4, 5].filter((num) => mockFn(num)); // 위에 순서대로 작동 (1,3,5만 리턴)

  expect(result).toStrictEqual([1, 3, 5]);      // Pass      // 홀수만 가져오는 기능 구현없이 임의로 테스트가능
});

// ########## 예시 4 (mockResolvedValue, mockResolvedValueOnce) // 임시로 벨류를 비동기식으로(프로미스) 리턴
test("Mike", () => {
  const mockFn = jest.fn();

  mockFn.mockResolvedValue({ name: "Mike" });   // promise를 반환

  // eslint-disable-next-line jest/valid-expect-in-promise
  mockFn().then((res) => {
    expect(res.name).toBe("Mike");
  });
});


// ########## 기타 유용한 매쳐들 ######################################################################################################### 
// ########## toBe(), toEqual(), toStrictEqual()        // Assertion부분과 매쳐의 부분이 동일한지, 대부분의 의도는 toStrictEqual에 부합하기에 사용권장
  expect(1+2).toBe(3);   // pass
  expect({ age: 30 }).toBe({ age: 30 });   // fail      -- 객체는 그 둘의 주소가 다르기 때문에 실패
  
  expect(1+2).toEqual(3);  // pass
  expect({ age: 30 }).toEqual({ age: 30 });  // pass    -- 객체도 같은지 인식
  expect({ age: 30, gender: undefined }).toEqual({ age: 30 });  // pass    -- undefined는 없는 것으로 인식하여 같다고 봄
  
  expect({ age: 30, gender: undefined }).toStrictEqual({ age: 30 });  // fail   -- 객체도 아에 동일하게 생겼는지 확인

// ########## toBeCloseTo       // 거이 비슷한지 (소수점 계산 위해)
  expect(0.2 + 0.3).toBeCloseTo(0.5);   // 자바스크립트는 소수점 계산을 틀리게 나올수있어서


// ########## toBeGreaterThan(), toBeGreaterThanOrEqual(), toBeLessThan(), toBeLessThanOrEqual()
  expect(5).toBeGreaterThan(2)  // 2 초과
  expect(5).toBeGreaterThanOrEqual(5) // 5 이상
  expect(2).toBeLessThan(5)     // 5 미만
  expect(2).toBeLessThanOrEqual(2)      // 2 이하
  
  
// ########## tobeNull(), toBeTruthy(), toBeFalsy()
  expect(null).toBeNull();      // null이 나와야
  expect(true).toBeTruthy();    // true가 나와야
  expect(false).toBeFalsy();    // false가 나와야



// ########## toMatch() // 문자열이 포함 또는 매치되는지
  expect("hello").toMatch(/h/i);        // 정규식을 써서 비슷한지 확인가능

// ########## toContain() // 배열에 포함 되어 있는지
  expect(["hello","hi"]).toContain("hello");
  
  
// ########## toThrow() // 에러가 발생하는지
  const err = () => {
  throw new Error("xx");
};

test("testing1", () => {
  expect(err).toThrow();        // pass (그냥 단순히 에러가 있는지)
  expect(err).toThrow("oo");    // fail (에러내용 적으면 에러내용도 확인)
  expect(err).toThrow("xx");    // pass 
});



// ########## done // done에 닿을 때까지 테스트를 종료하지 않음 #################################################################################
test('비동기 코드 테스트 - fetch', (done) => {  // done은 test의 파라미터 
  const callback = (data) => {
    try {
      expect(data).toBe('hello');
      done();   // done이 작동될때 까지 기다림 (프로미스를 리턴받은경우 리턴과 .then으로 대체가능)
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback); // fetchData는 비동기적 처리하는 함수라 가정
});

// ########## 전후 작업 (beforeEach, afterEach) ######################################################################################################### 
// ########## beforeEach 
describe("describe1", () => {
  let num;
  beforeEach(() => {    // 각 테스트 전 필수 작동 (afterEach는 테스트 후 작동)
    num = 0;
  });

  test("test1", () => {
    expect(num).toBe(0);        // pass
    num = 30;     // 30으로 바껴도 테스트 전에 0으로 다시 덮어 씌움
  });

  test("test2", () => {
    expect(num + 1).toBe(1);    // pass
  });
});

// ########## beforeAll 
describe("describe1", () => {
  let num;
  beforeAll(() => {     // 전체 테스트 전에 만 작동 (afterAll은 전체 테스트 후 작동)
    num = 0;
  });

  test("test1", () => {
    expect(num).toBe(0);        // pass
    num = 30;                   // 변화
  });

  test("test2", () => {
    expect(num + 1).toBe(1);    // fail
  });
});
// ########## .toMatchSnapshot() ######################################################################################################### 
// 첫 테스트시 스냅샷의 JSON 파일을 생성 -> 다음 실행부터, jest는 이전에 생성한 스냅샷과 현재 스냅샷을 비교 -> 스냅샷이 동일하지 않으면 오류가 발생
test("test1", () => {
  const component = renderer.create(<Button>Hello World</Button>);
  expect(component.toJSON()).toMatchSnapshot();         // 처음은 Pass시킨후 스탭샷파일 생성, 그 다음 테스트에 전테스트 값과 비교
});


// ########## 기타 유용한 getBy...(queryBy, findBy도 해당) #################################################################################################
// ########## getByRole의 heading
screen.getByRole("heading". { level: 1 });      // h1 을의미 (h1 ~ h6)

// ########## getByRole의 textbox와 getByLabelText (input type:text, textarea를 찾음)
<div>
        <label htmlFor="profile">자기소개</label>
        <textarea id="profile" />
</div>


screen.getByRole("textbox". { name: "자기소개" });    // name은 label의 htmlFor을 찾아서 id가 같은 textbox를 불러옴
screen.getByLabelText("자기소개");
screen.getByLabelText("자기소개", { selector: "textarea" });        // input type:text는 제외

// ########## getByDisplayValue, getByPlaceholderText, getByTitle, getByAltText
<input type="text" id="username" value="Tom" readOnly />


screen.getByDisplayValue("Tom") // value가 같은것을 찾음 (getByPlaceholderText는 플레이스 홀더, getByTitle는 타이틀, getByAltText는 이미지 alt)

// ########## getByTestId (getBy찾기 최후의 수단)
<div data-testid="my-div" />

screen.getByTestId("my-div");   // 테스트용으로 data-testid 입력한것 찾음


// ########## 기타 유용한 userEvent ##############################################################################################################
// userEvent를 활용하기 위한 링크 : https://testing-library.com/docs/ecosystem-user-event#api

// ##########
import { userEvent } from '@testing-library/user-event';
const user = userEvent.setup();
test("test1", async () => {
  await user.tab();
  await user.keyboard(" ");
  await user.keyboard("{Enter}");
});



// ########################################################################################################################################################
// ######## 그외 기타 테스팅 라이브러리, Jest 유용한것 #######################################################################################################
// ########################################################################################################################################################





