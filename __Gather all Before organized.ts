// ####### 이 파일에 대한 리마인더 #################################################################################################
// 기타 : objectFit 등들 정리하기, map, filter foreach
// 링크도 같이 저장

import { useSearchParams, useLocation, useParams, useNavigate, Link } from 'react-router-dom';
const [searchParams, setSearchParams] = useSearchParams();
const currentQuery = e.target.search.query.toString();

import { HashLink as Link } from 'react-router-hash-link';
<Link to='/category#' state={{ category: "MENS" }}>
    <li>
        Mens
    </li>
</Link>
const location = useLocation(); 
location.state

hasOwnProperty

next는 Link href , 리액트는 Link to

// ###############################################################################################################################
// ########## React  #############################################################################################################
// ###############################################################################################################################
// ######## Async(로딩)중일때 대비 #################################################################################################
import React, { Suspense } from 'react'

<Suspense fallback={null}>
  <Model />
</Suspense>

// ######## pathname 혹은 쿼리 생성 #################################################################
window.location.href = 'portfolio1/about' // http://localhost:3000/portfolio1/about 로 보내버림

// ######## Esc를 눌렀거나, 돔밖을 눌렀을경우 닫기 #################################################################
 const refOne = useRef<HTMLInputElement>(null); // 돔에접근
const [seeCalendar, setSeeCalendar] = useState(false);  // 닫으려고하는것의 Boolean

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true); // 키가 눌릴때마다 hideOnEscape함수 실행
    document.addEventListener("click", hideOnClickOutside, true); // 클릭 할때마다 hideOnClickOutside함수 실행
  }, []);

  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") { // ESC가 눌린경우
      setSeeCalendar(false);
    }
  };
  const hideOnClickOutside = (e: Event) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) { // refOne 바깥 돔을 클릭한경우
      setSeeCalendar(false);
    }
  };

// ######## UnSerialized 정보 상태관리 오류 해결 #################################################################
export default configureStore({
  reducer: {
    userObjSlice: userObjSlice.reducer,
    dateSlice: dateSlice.reducer,
    allMarkedDataSlice: allMarkedDataSlice.reducer,
    isFocusedSlice: isFocusedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), //  UnSerialized 체크 해서 오류를 없앰
});

// ######## localStorage 저장, 불러오기 #################################################################
localStorage.setItem("history", JSON.stringify([...dataClone]));  //  localStorage에 배열 저장

let historyStorage = JSON.parse(localStorage.getItem("history") || "[]"); //  localStorage에서 불러오기


// ######## setTimeout #################################################################
  useEffect(() => {
      let timer = setTimeout(() => {
        setSavedAnimation("opacity-0 translate-y-0");
      }, 4000);
      let timer2 = setTimeout(() => {
        setSavedAnimation(
          "opacity-100 translate-y-[-160px] lg:translate-y-[-120px]"
        );
      }, 500);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, []);

// ######## setInterval #################################################################
  useEffect(() => {
    const timer = setInterval(() => {
      arrowTimerRef.current += 1;
      setArrowTimer(arrowTimerRef.current);
    }, 500);
    return () => clearTimeout(timer);	
  }, []);

// ######## useInterval (setInterval을 쉽게하기 위한 커스텀훅) #################################################################
// ######## useInterval.js
import { useEffect, useRef } from "react";

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// ######## 
useInterval(() => {
    idx === 3 ? setIdx(0) : setIdx(idx + 1);
}, 3000); // 3초마다 실행

// ######## window innerWidth 변경 (화면 크기조정할때마다 실시간으로 출력) #################################################################
  const [windowWidth, setWindowWidth] = useState(0);

  if (typeof window !== "undefined") {  // nextjs 용
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }

console.log("windowWidth--------->",windowWidth)

// ######## scroll 변경 (스크롤할때마다 실시간으로 출력) #################################################################
// ScrollY value for Cart
    const [scrollYValue, setScrollYValue] = useState(window.scrollY)
    
    window.addEventListener('scroll', () => {
        setScrollYValue(window.scrollY)
    })

console.log("scrollYValue--------->",scrollYValue)



// ###############################################################################################################################
// ########## NEXT JS (일반 리액트와 겹치는 내용은 리액트로) ########################################################################
// ###############################################################################################################################
// ######## 현재 pathname 보여주기 (NextJS) #######################################################################################
import { usePathname } from 'next/navigation';
const pathname = usePathname(); // http://localhost:3000/portfolio1/about 에 /portfolio1/about 부분(pathname)짤라서 보여줌

// ######## pathname으로 보내버리기 (NextJS) #################################################################
import { useRouter } from "next/navigation";
const router = useRouter();
router.push(`/video/`);

router.back() // 뒤로가기

// ######## 서버사이드없이 import하기 //  "window is not defined"방지 (NextJS) #################################################################
const Map = dynamic(() => import('./Map'), { ssr: false }) // Import witout SSR // To prevent from Error "window is not defined"


// ######## Image컴포넌트 크기를 부모 태그크기와 같게 (NextJS) #################################################################
<div className="relative h-44 w-[445px]">{/* 배너이미지 // 부모: relative, 이미지: fill */}
  <Image
    src={bannerUrl}
    alt="Channel-bannerLogo"
    quality={100}
    fill
    style={{ objectFit: "cover" }}
  />
</div>

// ######## 환경변수 사용 가능 하게 #################################################################
module.exports = {
  experimental:{
    appDir: true,
  },
  env: {
    YOUTUBE_XRAPID_API_KEY: process.env.YOUTUBE_XRAPID_API_KEY,
  },  // 클라이언트 사이드에서 환경변수(.env)사용할수있도록
}
// ######## 
const xRapid_api_key = process.env.YOUTUBE_XRAPID_API_KEY;

// ###############################################################################################################################
// ######## HTML / CSS ##########################################################################################################
// ###############################################################################################################################
// ######## 박스 그림자 ############################################################################################################
box-shadow: 1px 1px 10px 10px gray;

// box-shadow: none | x-position y-position blur spread color | inset | initial | inherit

// none : 그림자 효과를 없앤다.
// x-position : 가로 위치이다. 양수면 오른쪽에, 음수면 왼쪽에 그림자가 만들어진다. (필수)
// y-position : 세로 위치이다. 양수면 아래쪽에, 음수면 위쪽에 그림자가 만들어진다. (필수)
// blur : 그림자를 흐릿하게 만든다. 값이 클 수록 더욱 흐려진다.
// spread : 양수면 그림자를 확장하고, 음수면 축소한다.
// color : 그림자 색을 정한다.
// inset : 그림자를 요소의 안쪽에 만든다.
// initial : 기본값으로 설정한다.
// inherit : 부모 요소의 값을 상속받는다.

// ######## 읽기 전용 ############################################################################################################
<input
  value={selected}
  readOnly
/>

// ######## 텍스트 대문자  ###########################################################################################################
text-transform: uppercase;

// ###### 텍스트 그라데이션 하는방법 ##################################################################################################
background-image: linear-gradient(-45deg, var(--gradient)); // 45도 꺽어서 배경 그라데이션

    background-clip: text;
    -webkit-background-clip: text;  // 텍스트 부분만 잘라냄
    -webkit-text-fill-color: transparent;   // 텍스트에도 배경 컬러를 입힘


// ###############################################################################################################################
// ########## JS #################################################################################################################
// ###############################################################################################################################
// ###### 문자별로 쪼개서 배열만들기 ##################################################################################################
"portfolio".split("")   // -> ['p','o','r','t','f','o','l','i','o']

// ###### Reduce 예시 1 ##################################################################################################
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum1 = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber);
console.log('sum1 =', sum1);

// ###### Reduce 예시 2 (함수 따로 빼기) ####################################################################################
function sumReducer(accumulator, currentNumber) {
  return accumulator + currentNumber;
}
const sum2 = numbers.reduce(sumReducer);
console.log('sum2 =', sum2);

// ###### 단위 변환기 ####################################################################################
 const numConverter = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

// ###### 특정글자를 다른글자로 전체바꾸기 ####################################################################################
title.replace(/&quot;/g, '"')


// ###### 숫자, 글자 오름차순 내림차순 ####################################################################################
  if (sortBy === 'price') { // 숫자 오름차순
      dataByLessThenPrice.sort((a, b) => {
          return Number(a.price) - Number(b.price);
      });
  } else if (sortBy === '-price') {
      dataByLessThenPrice.sort((a, b) => {
          return Number(b.price) - Number(a.price);
      });
  } else if (sortBy === 'name') { // 글자 오름차순
      dataByLessThenPrice.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          if (a.name === b.name) return 0;
      });
  } else if (sortBy === '-name') {
      dataByLessThenPrice.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          if (a.name === b.name) return 0;
      });
  }

// ###### 배열에서 3개 랜덤으로 가져오기 (실험해봐야함,,)####################################################################################
  let data = data.sort(() => Math.random() - 0.5);
  data = data.slice(0, 3)
