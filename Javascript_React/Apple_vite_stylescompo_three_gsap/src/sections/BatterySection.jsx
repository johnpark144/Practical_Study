import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from 'gsap';

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--white);
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -50%);
  text-transform: capitalize;
  font-size: var(--fontBig);
  z-index: 1;

  @media screen and (max-width: 70em) {
    font-size: var(--fontxxxl);
  }
  @media screen and (max-width: 64em) {
    font-size: var(--fontxxl);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontlg);
    transform: none;
    left: 2rem;
    top: 2rem;
    width: 50%;
  }
  `

const Battery = styled.ul`
position: absolute;
right: 4rem;
list-style: none;
background-color: var(--white);
border: 3px solid var(--dark);
border-radius: 8px;
padding: 0.5rem;
width: 15rem;

li {
    width: 100%;
    height: 5rem;
    background-color: var(--dark);
    background-image: linear-gradient(-90deg, var(--gradient));
    opacity: 0
  }

  & > *:not(:first-child):not(:last-child) {    // 첫번쨰와 마지막을 제외한 전체 자식 태그에 적용 
    margin: 0.5rem 0;
  }

  @media screen and (max-width: 48em) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default function BatterySection() {
    const battery = useRef(null);
    let elements = gsap.utils.selector(battery) // battery 돔안의 태그를 배열로 가져올 함수

    useLayoutEffect(()=>{
        let t1 = gsap.timeline({});

        elements("li").forEach((el) => {  // 배열안에 모든 태그들을 timeline으로 사용
            t1.to(el,
                {
                    scrollTrigger: {
                        trigger: el,
                        start:"top center",
                        end: "bottom center",
                        scrub: true,
                    }, opacity: 1,
                }
                )
        })
    },[])

  return (
    <Section id="battery">
      <Title>Go all day with single charge...</Title>
      <Battery ref={battery}>
        <li />
        <li />
        <li />
        <li />
        <li />
      </Battery>
    </Section>
  )
}
