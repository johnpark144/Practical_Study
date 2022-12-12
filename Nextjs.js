// ###############################################################################################################################################

// npx create-next-app@latest   // 자바스크립트용
// npx create-next-app@latest --typescript    // 타입스크립트용
// code (app이름)   // vscode로 가게함
// npm run dev

// ########### 삭제할 것들 #####################################################################################################################
pages안에 폴더랑 파일들

// ########### 라우팅 #####################################################################################################################
// ############ components/NavBar.js
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter(); // 현재 route를 알수있음

  return (
    <nav>
      <Link href="/">
        <span style={{ color: router.pathname === "/" ? "red" : "blue" }}>
          Home
        </span>
      </Link>
      <Link href="/about">
        <span style={{ color: router.pathname === "/about" ? "red" : "blue" }}>
          About
        </span>
      </Link>
    </nav>
  );
}

export default NavBar;
// ############ pages/index.js (pages폴더안에 index.js는 기본 홈이됨) // ex) http://localhost:3000/
import NavBar from '../components/NavBar';
function index() {
  return (
    <>
      <NavBar />
      <div>"hi"</div>
    </>
  );
}

export default index
// ############ pages/about.js (pages폴더안에 index.js외에 파일들은 /~가됨 ) // ex) http://localhost:3000/about/
import NavBar from "../components/NavBar";
function about() {
  return (
    <>
      <NavBar />
      <div>zzzzzzzz</div>
    </>
  );
}

export default about

// ########### CSS (기존 리액트 .module.css 방법도 잘통함) #####################################################################################################
// vscode-styled-components 익스텐션 필요

// NavBar.js
// ... 생략 ...
return 
  <style jsx>{`
  nav {
      background-color: tomato;
  }
  span{
      text-decoration:none
  }
  .active{
      color: blue;
  }
`}</style>

// ########### Custom App #####################################################################################################
// _app.js (page들을 렌더링 할때 _app.js의 Component파라미터를 거쳐감 -> styled-components를 이용한 CSS를 전역으로 사용가능 , 네비바랑 footer 사용가능)

import NavBar from "./../components/NavBar";
import "../styles/globals.css"; // _app.js에서만 글로벌 CSS사용가능

function _app({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      {/* 모든 페이지*/}
      <Component {...pageProps} />

      {/* 글로벌 스타일 컴포넌트 */}
      <style jsx global>{`
        .abc {
          font-size: 120px;
        }
      `}</style>
    </>
  );
}

export default _app;





