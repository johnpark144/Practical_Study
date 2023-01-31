// ######## styled-components ###################################################################################################
// npm i styled-components
// npm install styled-components@^5.0.0 react@^16.8 react-dom@^16.8 react-is@^16.8  // 위에거 안되면 업데이트

// ######## GSAP (스크롤 에니메이션) #####################################################################################################
// npm i gsap
// npm i gsap --legacy-peer-deps  // 위에거 안되면
// https://greensock.com/st-demos/  // docs및 참고 자료

// ######## three js #########################################################################################################
// npm install three @react-three/fiber
// npm install @react-three/drei
// --legacy-peer-deps // 위에거 안되면 이거 붙여서

// https://threejs.org/ // docs
// https://www.npmjs.com/package/@react-three/fiber
// https://www.npmjs.com/package/@react-three/drei

// https://docs.pmnd.rs/react-three-fiber/getting-started/introduction  // react-three/fiber docs
// https://github.com/pmndrs/drei   // react-three/drei docs

// https://github.com/pmndrs/gltfjsx    // glb 파일 입력방법
// https://sketchfab.com/feed // 3d파일 다운로드 (glb 파일)

// 3d glb파일 public폴더에 저장 -> cmd에서 public폴더로 -> npx gltfjsx apple_iphone_13_pro_max.glb     // npx gltfjsx (다운받은 glb or gltf  파일).glb | .gltf
// JS파일 3d파일(glb파일) 둘다 필요


// #########################################################################################################################
// ################ styles/GlobalStyle.js
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

// ################ App.jsx
import Quote from './sections/Quote';
import { GlobalStyle } from './styles/GlobalStyle'; //  GlobalStyle 전체 적용

function App() {
  return (
    <>
    {/* GlobalStyle 전체 적용 */}
      <GlobalStyle />
      <Quote />
    </>
  )
}

export default App

// ################ Quote.jsx
import styled, { keyframes } from 'styled-components';

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

const moveUp = keyframes`
100%{
    transform: translateY(0);
}
`;

const Text = styled.p`
  width: 50%;
  font-size: var(--fontlg);
  position: relative;
  height: var(--fontmd);
  overflow: hidden;
  
  span {
    position: absolute;
    transform: translateY(3rem);
    animation: ${moveUp} 2.5s ease forwards;
    animation-delay: ${({ delay }) => delay};   // 컴포넌트에 delay prop을 받아서 적용
    font-family: var(--fontL);
    background-image: linear-gradient(-45deg, var(--gradient)); // 45도 꺽어서 그라데이션
    /* 텍스트 그라데이션 하는방법 */
    background-clip: text;
    -webkit-background-clip: text;  // 텍스트 부분만 잘라냄
    -webkit-text-fill-color: transparent;   // 텍스트에도 배경 컬러를 입힘
  }
  `

export default function Quote() {
  return (
    // 컴포넌트로 감싼부분들 적용
    <Section>
        <TextContainer>
            <Text delay="0s"><span>&#8220; You can't connect the dots looking forward;</span></Text>
            <Text delay="0.4s"><span>&nbsp;&nbsp;&nbsp;you can only connect them looking backward.</span></Text>
            <Text delay="0.8s"><span>&nbsp;&nbsp;&nbsp;so you have to trust that the dots</span></Text>
            <Text delay="1.2s"><span> &nbsp;&nbsp;&nbsp;will somehow connect in your future. &#8221;</span></Text>
            <Text delay="1.6s"><span>&#x23AF; Steve Jobs</span></Text>
        </TextContainer>
    </Section>
  )
}

// ################ HeroSection.jsx
import React from 'react'
import styled from "styled-components";
import backgroundVideo from "../assets/video/Ink - 21536.mp4";  // 비디오 사용

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--dark);
  overflow: hidden;
`;

const Title = styled.h1`
  position: absolute;
  top: 2rem;
  left: 2rem;

  font-size: var(--fontlg);
  font-family: var(--fontL);
  color: var(--greyLight);
`
const TextContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(45deg, var(--gradient));
  z-index: 1;
  // 색 그라데이션
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  span{
    font-size: var(--fontxxxl);
    text-transform: uppercase;  // 대문자로
    font-weight: 600;
    padding: 2rem;
  }
`

const VideoContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;

export default function HeroSection() {
  return (
    <Section>
        <VideoContainer>
        <video src={backgroundVideo} type="video/mp4" autoPlay muted loop />
      </VideoContainer>
      <Title> IPhone 14 Pro Max </Title>
      <TextContainer>
        <span>So.Cold.</span>
        <span>So.Bold.</span>
      </TextContainer>
    </Section>
  )
}

// ################ PhoneModel.jsx (three js)
import React from 'react'
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: transparent;
  transition: all 0.3s ease;
`;

export default function PhoneModel() {
  return (
    <Container id="phone-model">
        <Canvas>
            {/* 3D 밝기 // 적용안하면 그냥 검하게 보임 */}
            <ambientLight intensity={0.8} /> 
            {/* 빛이 비추는 방향 position={[우,위,앞]} (디폴트: 위) */}
            <directionalLight position={[1,0,0]} />
            <mesh>
                {/* 3d 구현 할 박스생성 */}
                <boxGeometry />
                {/* 기하학적으로 그림그리기 위한것 */}
                <meshStandardMaterial color="red" />
            </mesh>
            {/* 3d 형태 뷰 구현 */}
            <OrbitControls />
        </Canvas>
    </Container>
  )
}


// ################ three js 이용하기
// https://github.com/pmndrs/gltfjsx    // glb 파일 입력방법
// https://sketchfab.com/feed // 3d파일 다운로드 (glb 파일)

// 3d glb파일 public폴더에 저장 -> cmd에서 public폴더로 -> npx gltfjsx apple_iphone_13_pro_max.glb     // npx gltfjsx (다운받은 glb or gltf  파일).glb | .gltf
// JS파일 3d파일(glb파일) 둘다 필요

// ################ PhoneModel.jsx
import React from 'react'
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './../../public/Apple_iphone_13_pro_max';    // 파일 경로

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: transparent;
  transition: all 0.3s ease;
`;

export default function PhoneModel() {
  return (
    <Container id="phone-model">
        <Canvas>
            <ambientLight intensity={0.8} /> 
            <directionalLight position={[1,0,0]} />
              {/* 다운받은 3D 생성 */}
              <Model />     
            <OrbitControls />
        </Canvas>
    </Container>
  )
}


