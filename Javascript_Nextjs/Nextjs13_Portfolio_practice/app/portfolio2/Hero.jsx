'use client'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles';
import Image from 'next/image';

export default function Hero() {
  const [text, count] = useTypewriter({
    // 타이핑 속성
    words: [
      'Hi, My Name is John Park',
      'who like to web-develope',
      'Thank you for visiting my website',
    ],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <div className=" h-screen flex flex-col space-y-8 items-center justify-center
     text-center overflow-hidden">
      {/* 서클 컴포넌트 */}
      <BackgroundCircles />
      {/* 프로필사진 */}
      <Image className="relative rounded-full mx-auto object-cover" width={150} height={150} src="https://avatars.githubusercontent.com/u/106279616?v=4" alt="profilel_image" />
      {/* Web Developer */}
      <h2 className='text-sm uppercase text-gray-400 pb-2 tracking-[15px]'>Web Developer</h2>
      {/* 타이핑 */}
      <h1 className='text-4xl lg:text:5xl font-semibold px-10'>
        <span>{text}</span> {/* 타이핑 글자 나오는 곳 */}
        <Cursor cursorColor="#F7AB0A" /> {/* 커서 위치 */}
      </h1>
    </div>
  )
}
