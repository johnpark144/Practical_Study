// ####### 리미인드 ###########################################################################################################################################
// 다하고 이론부분 지을거 지우기


// ####### RTL 세팅 및 간단한 이론  ########################################################################################################################
// ####### App.test.js (create-react-app 기준)
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {  // global test 메서드는 두 인자(argument)를 받음 (string, function)
  render(<App />);  // render 는 인자로 받은 컴포넌트를 가상 Dom에 생성
  const linkElement = screen.getByText(/learn react/i); // screen.getByText는 텍스트를 기반으로 요소를 찾음 (Regular expression 혹은 문자열로)
  expect(linkElement).toBeInTheDocument(); // 성공과 실패를 확인하는 단언(Assertion)부분. // .toBeInTheDocument 매쳐(Matcher)는 단언(Assertion)부분의 타입(요소가 문서에 있는지)
});

// ####### package.json (create-react-app 기준)
"scripts": {
    "test": "react-scripts test",
  },
    
// ####### 단언(Assertion)인 expect과 매쳐(Matcher)인 . 
  expect(element.textContent).toBe('hello');  // expect안에 있는게 'hello'여야함
  expect(elementsArr).toHaveLength(7);  // 배열의 길이가 7이어야함
  
// ####### RTL과 Jest의 역할
// RTL -> 가상 Dom을 만들거나 상호작용하는 등 테스트를 간접적으로 돕는 역할
// Jest -> 단언(Assertion)인 expect, test 등 과 같이 테스트를 직접 하게함    // Jest Watch Mode는 코밋할때 변화가 있으면 실행 (변화없으면 실행X)
  
// ####### 테스트의 종류
//  단위 테스트 (Unit test)
//  통합 테스트 (Integration test)
//  기능 테스트 (Functional test)
//  인수 테스트 (Acceptance test / End-t-End Test / E2E Test)

// ####### getByRole 
// Roll 정리 :  https://www.w3.org/TR/wai-aria/#textbox
  const linkElement = screen.getByRole('link', { name: /learn react/i } );   //   screen.getByRole('(역할이름)', { name: ""} )


// #######  ########################################################################################################################



