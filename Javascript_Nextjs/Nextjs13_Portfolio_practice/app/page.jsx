import Link from 'next/link'
import LineWithScroll from './LineWithScroll'
import RelaxjsScrollout from './RelaxjsScrollout'

export default function page() {
  return (<>
    <div className='relative h-[3000px] z-10'>
      <h1>Framer Motion, Regular Css</h1>
      <Link href="/pizza">Pizza</Link>
      <hr />

      <h1>React Portfolio(GreenSock(GSAP), Animate.CSS, Loader, EmailJS, Scss)</h1>
      <h1>SVG 애니메이션 생성, 애니메이션 문자하나씩, 큐브 애니메이션, 이메일, 지도</h1>
      <Link href="/portfolio1">Portfolio1</Link>
      <hr />

      <h1>React Portfolio(typewriter, react hook form, react-scroll-horizontal, react-lottie-player,  tailwind-scrollbar, tailwind)</h1> 
      <h1>타입라이터, 리액트 훅 폼, 수평마우스스크롤, 로티플레이어, 테일윈드용 스크롤색</h1>
      <Link href="/portfolio2">Portfolio2</Link>
      <hr />
      
      {/* RelaxJS, scrollout */}
      <RelaxjsScrollout  />
    </div>
      {/* 스크롤에 따른 SVG그리기 연습 */}
      <LineWithScroll />
    </>
  )
}
