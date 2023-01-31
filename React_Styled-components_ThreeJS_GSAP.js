// ######## styled-components ##########################################################################################
// npm i styled-components
// npm install styled-components@^5.0.0 react@^16.8 react-dom@^16.8 react-is@^16.8  // 위에거 안되면 업데이트

// ######## styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";
import fontLight from "../assets/fonts/SourceSansPro-Light.ttf";
import fontRegular from "../assets/fonts/SourceSansPro-Regular.ttf";

export const GlobalStyle = createGlobalStyle`     // 스타일컴포넌트 글로벌css 양식
*,*::before,*::after{ // 전체 지정
    margin: 0;
    padding: 0;
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: 'Source Sans Pro light';
    src: local('Source Sans Pro light'), url(${fontLight}) format("truetype") ;
    font-display:swap;
    font-style: normal;
}

@font-face {
    font-family: 'Source Sans Pro';
    src: local('Source Sans Pro'), url(${fontRegular}) format("truetype") ;
    font-display:swap;
    font-style: normal;
}

body{
    font-family: "Source Sans Pro", sans-serif;
    overflow-x: hidden;
}

// 자주쓸것 변수에 저장
:root{
    // Fonts As per the type scale generator => https://material-io.cn/inline-tools/typography/
 --fontBig: 7em; //88 px
 --fontxxxl: 5.5em; //88 px
 --fontxxl: 3.4375em; //55 px
 --fontxl: 2.75em; //44 px
 --fontlg: 1.9375em; //31 px
 --fontmd: 1.375em; //22 px
 --fontsm: 1.125em; //18 px
 --fontxs: 1em; //16 px
 --fontxxs: 0.75em; //12 px


  // Colors
  --dark: #000000;
  --grey: #666666;
  --greyLight: #979797;
  --offWhite: #eeeeee;
  --white: #ffffff;
  --blue: #0071e3;
  --blueRgba:"0, 113, 227";

  //fonts
  --fontL: "Source Sans Pro light";
  --fontR: "Source Sans Pro";
  
  // gradient
  --gradient: #35c3f3 0%, #8b9fe8 20%, #e681d8 39%, #ffa9a4 76%, #fed2ce 100%;
}
`

// ######## Quote.jsx
import styled from 'styled-components';

// 스타일 컴포넌트 양삭
const Section = styled.section` // styled.태그 -> 컴포넌트생성
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  color: var(--white);
`;

const Text = styled.p`
  width: 50%;
  font-size: var(--fontlg);
  position: relative;
  height: var(--fontmd);
  overflow: hidden;
  
  span{
    background-color: lightblue;
    position: absolute;
    transform: translateY(1rem);
  }
  `

export default function Quote() {
  return (
    // 컴포넌트로 감싼부분들 적용
    <Section>
        <TextContainer>
            <Text><span>1</span></Text>
            <Text><span>2</span></Text>
            <Text><span>3</span></Text>
            <Text><span>4</span></Text>
            <Text><span>5</span></Text>
        </TextContainer>
    </Section>
  )
}
