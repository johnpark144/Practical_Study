// ####### 리미인드 ###########################################################################################################################################
// 다하고 이론부분 지을거 지우기


// ####### RTL 세팅 및 간단한 이론  ########################################################################################################################
// TDD는 항상 기능을 추가하기전 먼저 테스트코드를 작성하여야한다

// getByRole의 Role부분 정리 :  https://www.w3.org/TR/wai-aria/#textbox
// 매쳐(Matcher) 정리: https://github.com/testing-library/jest-dom#tohavetextcontent
// 테스팅 라이브러리 Docs : https://testing-library.com/docs/

// ####### RTL과 Jest의 역할
// RTL -> 가상 Dom을 만들거나 상호작용하는 등 테스트를 간접적으로 돕는 역할 (render, screen, fireEvent 등)
// Jest -> 단언(Assertion)인 expect, test 등 과 같이 테스트를 직접 하게함    // Jest Watch Mode는 코밋할때 변화가 있으면 실행 (변화없으면 실행X)
  
// ####### 테스트의 종류
//  단위 테스트 (Unit test)  : 로직이 너무 복잡한경우, 코드 품질을 개선하기 위해(안정성, 완성도), 버그발생 최소화, 문서화, 오류 조기발견, 코드변경 용이
//  통합 테스트 (Integration test)
//  기능 테스트 (Functional test)
//  인수 테스트 (Acceptance test / End-t-End Test / E2E Test)

// ####### App.test.js (create-react-app 기준)
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {  // global test 메서드는 두 인자(argument)를 받음 (string, function)
  render(<App />);  // render 는 인자로 받은 컴포넌트를 가상 Dom에 생성
  const linkElement = screen.getByText(/learn react/i); // screen.getByText는 텍스트를 기반으로 요소를 찾음 (Regular expression 혹은 문자열로)
  expect(linkElement).toBeInTheDocument(); // 성공과 실패를 확인하는 단언(Assertion)부분. // 매쳐(Matcher)는 단언(Assertion)부분의 타입
});

// ####### package.json (create-react-app 기준)
"scripts": {
    "test": "react-scripts test",
  },
    
// ####### 단언(Assertion)인 expect과 매쳐(Matcher)인 . 
  expect(element.textContent).toBe('hello');  // expect안에 있는게 'hello'여야함
  expect(elementsArr).toHaveLength(7);  // 배열의 길이가 7이어야함
  

// #################################################################################################################################################
// ####### Color Button App ########################################################################################################################
// #################################################################################################################################################
// ###### 빨간, 파랑 토글 버튼과 체크박스 테스트 #######################################################################################################
// ####### App.test.js (create-react-app 기준)
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

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked(); // checkbox가 체크가 안된 상태인
})

// ####### App.js (create-react-app 기준)
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

// ###### LogRoles ####################################################################################################################################
// 페이지가 길어서 역할이있는 항목들이 햇갈릴때 사용됨 (역할과 이름이 콘솔로그 처럼 출력됨) // 코드가 지저분해질 가능성이 있어서 안쓰는 경우도 많음
// ####### App.test.js (create-react-app 기준)
import { render, screen } from '@testing-library/react';
import { logRoles } from '@testing-library/dom'
import App from './App';

test('Button has correct initial color', () => {
  const { container } = render(<App />);
  logRoles( container );  // 이 컴포넌트안에 역할과 이름 출력

  const colorBtn = screen.getByRole("button", { name: "Change to blue" }); 
  expect(colorBtn).toHaveStyle(` background-color: red `)
});

// ###### 그룹 테스트, 유닛 테스팅 함수 ###########################################################################################################################
//  describe는 테스트를 그룹으로 묶어줌
// ####### App.test.js (create-react-app 기준)
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

// ###### ESLint, Prettier ###########################################################################################################################
// ESLint : 린터(Linter)로 사용되는 툴 중 하나, 소프트웨어 코드를 분석하여 버그를 찾고, 코드 스타일이나 실수를 검사하는데 사용. 문법 오류, 디버깅 및 성능 최적화 실수, 가독성 및 일관성 오류 등을 찾아냄
// Prettier : 포매터(Formatter)로써, 소프트웨어 코드의 모양을 바꾸는 툴로, 들여쓰기나 공백, 줄바꿈 등의 공통적인 코딩 스타일을 적용하기 위해 사용

// ###### 테스팅라이브러리와 jest-dom를 위한 ESLint #############################################################################################
// npm i eslint-plugin-testing-library eslint-plugin-jest-dom

// 규칙 참고 링크
// https://github.com/testing-library/eslint-plugin-jest-dom
// https://github.com/testing-library/eslint-plugin-testing-library
// https://github.com/bonnie/bonniedotdev/blob/main/client/.eslintrc.json

// ###### package.json 파일에서 해당내용 지우기
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },

// ###### .eslintrc.json (규칙을 정할 수 있음, 위에 규칙링크 참고)
{
  "plugins": ["testing-library", "jest-dom"],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}
// ###### .vscode/settings.json (prettier, eslint 같이)
{
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}

// ######  #############################################################################################
