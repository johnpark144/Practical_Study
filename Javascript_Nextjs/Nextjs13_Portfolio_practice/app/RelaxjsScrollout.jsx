"use client"
import Lottie from 'react-lottie-player'
import lottieJson from '../public/airplane.json'
import Image from 'next/image';
import Parallax from 'react-rellax';
import ScrollOut from "scroll-out";
import '../styles/portfolio2.css'
import { useEffect } from 'react';

export default function RelaxjsScrollout() {
    useEffect(() => {
        ScrollOut({ 
            cssProps: { 
               visibleY: true  // css에 visibleY props를 사용하게끔
            },
         });
      }, []);

  return (
    <div className="relative">
      <Parallax speed={2}>  {/* OPTIONAL SPEED (-10 to +10) // DEFAULT : -2 */}
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 200, height: 200 }}
          className="absolute top-[20rem] left-[20vw]"
          data-scroll
        />
      </Parallax>
      <Parallax speed={4}>
      <Image
        className="absolute top-[5rem] left-0"
        width={700}
        height={150}
        src="/cloud1.png"
        alt="cloud1"
        data-scroll
      />
      </Parallax>
      <Parallax speed={6} data-scroll>
      <Image
        className="absolute top-[10rem] right-0"
        width={700}
        height={150}
        src="/cloud1.png"
        alt="cloud1"
        data-scroll
        />
      </Parallax>
      <Parallax speed={10} data-scroll>
      <Image
        className="absolute top-[25rem] left-[30vw]"
        width={700}
        height={150}
        src="/cloud2.png"
        alt="cloud2"
        data-scroll
        />
      </Parallax>
      <Parallax speed={4} data-scroll>
      <Image
        className="absolute top-[30rem] right-0"
        width={700}
        height={150}
        src="/cloud3.png"
        alt="cloud3"
        data-scroll
        />
      </Parallax>
      <Parallax speed={8} data-scroll>
      <Image
        className="absolute top-[35rem] left-[5vw]"
        width={700}
        height={150}
        src="/cloud3.png"
        alt="cloud3"
        data-scroll
        />
      </Parallax>
    </div>
  )
}
