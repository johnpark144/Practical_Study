import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
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

  @media screen and (max-width: 70em) {
    width: 70%;
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontmd);
    height: var(--fontsm);
  }
  @media screen and (max-width: 40em) {
    width: 90%;
  }
  @media screen and (max-width: 30em) {
    font-size: var(--fontxs);
  }
  `

export default function Quote() {
  gsap.registerPlugin(ScrollTrigger);  // gsap에 ScrollTrigger 사용한다고 선언 (플러그인)
  const sectionRef = useRef(null);

  useLayoutEffect(()=>{
    let Elem = sectionRef.current;

    let trigger = ScrollTrigger.create({
      trigger: Elem,  // 같이 움직일 Dom
      start: "top+=200 top",  // 시작 포인트
      end: "bottom-=500",   // 끝 포인트
      pin: true,  // 같이 움직이도록 고정
      pinSpacing: false,
    });

    return () => {
      if(trigger) trigger.kill();
    }
  }, [])

  return (
    // 컴포넌트로 감싼부분들 적용
    <Section ref={sectionRef}>
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