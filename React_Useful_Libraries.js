// ######## 전체 라이브러리들 ##############################################################################
ctrl f -> tailwind-scrollbar / react-hook-form / react-simple-typewriter / Email JS / Animate.css / GreenSock / loader.css / react-leaflet / React-date-range / lodash debounce /
    React-icons / Next-Themes / react-timeago / React-beautiful-dnd

// ######## tailwind-scrollbar ####################################################################################################
// npm install --save-dev tailwind-scrollbar
// https://www.npmjs.com/package/tailwind-scrollbar

// ######## Tailwind config.
plugins: [
    // ...
    require('tailwind-scrollbar'),
],

// ######## react-hook-form (리액트 훅 form) #########################################################################################
// npm i react-hook-form
// https://react-hook-form.com/     // 타입스크립트용 예시도 
// 리액트에서 폼형식을 사용할때 필요했던 input에 onchange함수 만들어줘야했던 번거로움을 덜어주고 폼을 심플하게 만들어줌

// ################ ContactMe.jsx
import { useForm } from "react-hook-form";

export default function ContactMe() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => { // 출력 예시 : {name: '박영환', email: 'vyckd354@gmail.com'}
      window.location.href = `mailto:vyckd354@gmail?subject=${data.subject}&body=Hi my name is ${data.name} ${data.message} (${data.email})`
    }  // 쿼리 보내는법 (mailto:보낼사람주소)
  
    return (
      // ...register("") 부분은 객체에서 key부분
      <form className="flex flex-col space-y-2 text-black w-fit mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" className="contactInput" type="text" />
        <input {...register("email", { required: true })} placeholder="Email" className="contactInput" type="email"  />
        {errors.exampleRequired && <span>This field is required</span>}
        <input {...register("subject")} placeholder="Subject" className="contactInput" type="text" />
        <input {...register("message")} placeholder="Message" className="contactInput" type="text" />
        <input type="submit" className="bg-[#f7ab0a] py-5 px-10 rounded-md text-black font-bold text-lg" />
      </form>
    );
  }

// ######## react-simple-typewriter (타입라이터, 글쓰기효과) ##############################################################################
// npm i react-simple-typewriter
// https://www.npmjs.com/package/react-simple-typewriter

// ################ page.jsx
'use client'
import { Cursor, useTypewriter } from "react-simple-typewriter"

export default function Hero() {
    const [text, count] = useTypewriter({   // 타이핑 속성
        words: [
            "Hi, My Name is John Park",
            "who like to web-develope",
            "Thank you for visiting my portfolio website",
        ],
        loop: true,
        delaySpeed: 2000,
    })

  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen">
        <span>{text}</span>  {/* 타이핑 글자 나오는 곳 */}
        <Cursor cursorColor="#F7AB0A" /> {/* 커서 위치 */}
    </div>
  )
}

// ######## Email JS (이메일) ##########################################################################################################
// npm i @emailjs/browser
// https://www.emailjs.com/docs/examples/reactjs/  // docs
// https://dashboard.emailjs.com/admin  // dashboard

// ################ dashboard 링크에서 아이디만들고 이와같이 진행
// add new service -> gmail -> connect acount -> continue -> create service -> Email templates -> create new template

// Subject : New message from {{subject}}
Hello ,

You got a new message from {{name}}:

Email ID : {{email}}

Message : {{message}}

// From Name : {{name}}

// ################ .env (It's sample)
EMAILJS_PUBLIC_KEY="Xo9YR5YY5ws22PwtP"
EMAILJS_TEMPLATE_ID="template_lcbqydj"
EMAILJS_SERVICE_ID="service_isf8o79"

// ################ next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
  }
}

module.exports = nextConfig

// ################ page.jsx
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', form.current, 'EMAILJS_PUBLIC_KEY')
     .then(
          (result) => {
            alert('Your Message successfully sent!')
            window.location.reload(false)
          },
          (error) => {
            alert('Failed to send the massage, please try again')
          }
        )
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Subject</label>
      <input type="text" name="subject" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};


// ######## Animate.css (애니메이션 키프레임 역할) #############################################################################################
// npm i animate.css
// https://animate.style/

@import 'animate.css';

.text-animate {
    display: inline-block;
    opacity: 0;
    animation: bounceIn 1s 1s;    // bounceIn 부분을 바꿔줌
    min-width: 10px;
}


// ######## GreenSock (GSAP, 에니메이션) #####################################################################################################
// npm i gsap-trial
// https://greensock.com/st-demos/  // docs및 참고 자료

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap-trial';
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin';

export default function Logo() {
    const bgRef = useRef();
    const outlineLogoRef = useRef();
    const solidLogoRef = useRef();

    useEffect(() => {
        gsap.registerPlugin(DrawSVGPlugin)

        gsap.timeline()
        .to(bgRef.current, {    // useRef Dom에 해당 css를 부여
            delay: 1,
            duration: 10,
            opacity: 1
        })
    }, []);

  return (
    <div className='logo-container' ref={bgRef}>
        <Image ref={solidLogoRef} className='solid-logo' src={LogoS} alt="S" />
     </div>
  )
}

// ######## loader.css (로더) ##############################################################################################################
// npm i loaders.css
// npm i react-loaders

// ################ page.jsx
import Loader from 'react-loaders'
export default function page() {
  return (
    <>
      <Loader type="pacman" />  // pacman (타입에서 종류 확인 가능)
    </>
  )
}

// ################ css
@import '~loaders.css/src/animations/pacman.scss';  // pacman scss불러옴

.loader-active {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    animation: fadeOut 1s 1s forwards;
}

// ######## react-leaflet(지도) ##########################################################################################################
// https://react-leaflet.js.org/
// https://cloud.maptiler.com/maps/    // 맵종류 TileLayer url
// https://nominatim.org/release-docs/latest/api/Overview/    // Nominatim API

// npm i leaflet react-leaflet

// ################ page.tsx
'use client';
import dynamic from 'next/dynamic';
import SearchBox from './SearchBox';
const Maps = dynamic(()=>import('./Maps'),{ssr:false}); // ssr없이 import // window is not defined오류방지 
import { useState } from 'react';

export default function Page() {
  // 경도와 위도를 미리 지정안하면 MapContainer에 center가 초기화면
  const [selectPosition, setSelectPosition] = useState();
  return (
    <>
      <div className='flex rounded-lg w-[100vw] h-[100vh]'>
        <div className='w-[50vw] h-[100vh]'>
          <Maps selectPosition={selectPosition} />
        </div>
        <div className='w-[50vw]'>
          <SearchBox setSelectPosition={setSelectPosition}  />
        </div>
      </div>
    </>
  );
}

// ################ Maps.tsx
'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet";
import { ReactNode, useEffect } from 'react';

// 핀 아이콘
const icon = L.icon({
  iconUrl: "./placeholder.png", // public 폴더에
  iconSize: [38, 38]
})

// 마크하기위한 함수
function AddMarkerToClick() {

  const [markers, setMarkers] = useState([]);

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng
      setMarkers([...markers, newMarker]);
    },
  })
  console.log(markers);
  return (
    <>
      {markers?.map(marker => 
        <Marker position={marker} key={`${marker.lat}${marker.lng}`} icon={icon}>
          <Popup><div>Marker is</div></Popup>
        </Marker>
      )}
    </>
  )
}

// selectPosition 변경시마다 새로운 주소로 리렌더링
const ResetCenterView = ({ selectPosition }) => {
  const map = useMap();

  useEffect(() => {
    if(selectPosition){
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
      }
  }, [selectPosition]);

  return null
}

// 도형 각 포인트 위치
const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
    [51.53, -0.12],
  ],
]

// 디폴트 함수
function Maps({ selectPosition }) {
  const locationSelection:number[] = [selectPosition?.lat, selectPosition?.lon]

  return (
    // center 처음화면 위도 경도 // zoom 숫자가 높으면 확대 // scrollWheelZoom={false}
    <MapContainer center={[45.505, -75.09]} zoom={8} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=HF5XlbsiSdkFlJq0cfDr"  // 맵종류
      />
      {selectPosition && (
        // position pin위치 // icon 핀 아이콘 // Popup안 내용은 핀눌렀을때 뜰 내용
      <Marker position={locationSelection} icon={icon}> 
        <Popup>
          <div>{selectPosition?.display_name}</div>
        </Popup>
      </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
      {/* <Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon} />  // 도형식 */}
      <AddMarkerToClick />
    </MapContainer>
  )
}
export default Maps

// ################ SearchBox.tsx
import { Dispatch, SetStateAction, useState } from "react";

// 주소정보 담긴 API
const NOMINATIM_BASE_URL ="https://nominatim.openstreetmap.org/search?"

// 디폴트 함수
function SearchBox({ setSelectPosition }) {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  
  // 검색할시 작동하는 함수
  const searchMap = async () => {
    const params = {
      q: searchText,
      format:'json',
      addressdetails: 1,
      polygon_geojson: 0
    };
    const queryString = new URLSearchParams(params).toString();
    const reqestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`,reqestOptions)
    .then((res)=>res.text())
    .then((result)=>{
      setListPlace(JSON.parse(result));
    })
    .catch((err)=>console.log("err:",err));
  }

  return (
    <>
      <div className="flex-col">
        <div className="flex">
          {/* 검색창 */}
          <input
            type="text"
            className="border-2 border-solid border-red-200 w-[40vw]"
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
          />
          {/* 검색 버튼 */}
          <div className="flex items-center py-[20px]">
            <button onClick={searchMap} className="border-2 border-solid border-black">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* 검색된 리스트 */}
      <ul>
        {listPlace.map((item) => {
          return (
          <li key={item?.place_id} className="flex" onClick={()=>{
            setSelectPosition(item)
          }}>
            <img src="./placeholder.png" alt="placeholder" className="w-9 h-9" />
            <h1>{item?.display_name}</h1>
          </li>
        )})}
      </ul>
    </>
  );
}

export default SearchBox

// ################ globals.css
@import url("leaflet/dist/leaflet.css");  

.leaflet-container {
  width: 100%;
  height: 100vh;
}

// ######## React-date-range (달력 선택) ###################################################################################################
// https://www.npmjs.com/package/react-date-range
// npm install --save react-date-range  // 라이브러리
// npm install --save react date-fns  // peerDependencies


// ######## DateSelect.tsx (일반 달력 싱글 날짜 선택)
'use client'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { Calendar } from 'react-date-range';
import format from 'date-fns/format';
import { useEffect, useState, useRef } from 'react';

function DateSelect() {
    const [calendar, setCalendar] = useState<Date>();
    const [open, setOpen] = useState(false);
    const refOne = useRef<HTMLInputElement>(null);    // 달력Dom에 접근

    // 기본 세팅 및 서버 클라이언트 날짜 에러 해결
    useEffect(() => {
        setCalendar(new Date())
        document.addEventListener("keydown", hideOnEscape, true)    // 키보드버튼 눌릴경우 실행됨
        document.addEventListener("click", hideOnClickOutside, true) // 마우스클릭될때 실행됨
    }, []);

    // 달력 접기 
    const hideOnEscape = (e:KeyboardEvent) => {
        if(e.key === "Escape"){     // 눌린버튼이 Esc버튼인경우
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e:Event) => {
        if(refOne.current && !refOne.current.contains(e.target as Node)){   // 마우스버튼이 달력Dom 밖에 눌린경우
            setOpen(false)
        }
    }

    // 날짜 선택
    const handleSelect = (date:Date) => {
        setCalendar(date)
    }
  
    // 날짜를 보기좋게 형식 변경
   const selected = calendar ? format(calendar, 'MM/dd/yyyy') :""
   
  return (
    <>
      <div>React Date Select</div>
      <input value={ selected } onClick={()=>setOpen(!open)} readOnly className='inputBox' />
      <span ref={refOne}>
      {open && 
      <Calendar
        date={calendar ? calendar : new Date()}
        className="calendarElement"
        onChange={handleSelect}
        months={1}
        rangeColors={["#26af5b"]}  // 범위지정시 컬러
        // minDate={new Date()}
        // maxDate={new Date()}
        // direction="horizontal"  // 2개 이상 months인경우 위치
        // disabledDates={[new Date('2023-01-01')]}
      />
    }
    </span>
    </>
  );
}

export default DateSelect;

// ######## DateRangeSelect.tsx (일반 달력 날짜 범위 선택)
'use client'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import format from 'date-fns/format';
import { addDays } from 'date-fns';

import { useEffect, useState, useRef } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';  // 심플달력, 자세한달력

function DateRangeSelect() {
    const [range, setRange] = useState<any>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [open, setOpen] = useState(false);
    const refOne = useRef<HTMLInputElement>(null);    // 달력Dom에 접근

    // 기본 세팅 및 서버 클라이언트 날짜 에러 해결
    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true)    // 키보드버튼 눌릴경우 실행됨
        document.addEventListener("click", hideOnClickOutside, true) // 마우스클릭될때 실행됨
    }, []);

    // 달력 접기 
    const hideOnEscape = (e:KeyboardEvent) => {
        if(e.key === "Escape"){     // 눌린버튼이 Esc버튼인경우
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e:Event) => {
        if(refOne.current && !refOne.current.contains(e.target as Node)){   // 마우스버튼이 달력Dom 밖에 눌린경우
            setOpen(false)
        }
    }

  return (
    <>
      <div>React Date Range Select</div>
      <input value={ `${format(range[0].startDate,'MM/dd/yyyy')} to ${format(range[0].endDate,'MM/dd/yyyy')}` }
      onClick={()=>setOpen(!open)} readOnly className='inputBox' />
      <span ref={refOne}>
      {open && 
      <DateRange    // ---> DateRangePicker로 태그를 바꿔주면 자세한 달력이 나옴
        className="calendarElement"
        onChange={item => setRange([item.selection])} // [startDate, endDate, key]
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        ranges={range} // range가 바뀐대로 범위를 보여줌
        months={1}
        color="#26af5b"
        direction="horizontal"  // 2개 이상 months인경우 위치
        // minDate={new Date()}
        // maxDate={new Date()}
        // disabledDates={[new Date('2023-01-01')]}
      />
    }
    </span>
    </>
  );
}

export default DateRangeSelect;

// ######## lodash debounce (타이머와 타이머캔슬기능) ######################################################################################
// npm install lodash

import React, { useState } from "react";
import { debounce } from "lodash";

export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  const debouncedHandleMouseEnter = debounce(() => setIsHovered(true), 500);

  const handlOnMouseLeave = () => {
    setIsHovered(false);
    debouncedHandleMouseEnter.cancel();
  };

  return (
    <div
      onMouseEnter={debouncedHandleMouseEnter}
      onMouseLeave={handlOnMouseLeave}
    >
      hover me
    </div>
  );
}

// ######## React-icons (머티리얼아이콘이나 폰트어썸처럼 여러 아이콘들사용) ######################################################################################
// https://react-icons.github.io/react-icons/
// npm install react-icons --save

import { AiFillEdit } from 'react-icons/ai'; // Ai로 시작하기 때문에 from 'react-icons/ai'
import { MdDone } from 'react-icons/md';

<AiFillEdit /> // React-icons 사이트에서 복사한 컴포넌트
<AiFillDelete />
<MdDone />
  
// ######## Next-Themes (다크모드, 야간모드) //!! 리액트 warning이 여전히 있을수 있음 ################################################################################
// npm i next-themes
  
// ######## layout.tsx
'use client'  // 클라이언트 사이드에서만 사용가능
import '../styles/globals.css'  // globals.css에있는 TailwindCSS 전역 적용
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <ThemeProvider attribute='class'> // 사용범위 Provider 지정
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
  
// ######## page.tsx
function HomePage() {
  return (
    <section className="mt-16">
      <h1 className="text-7xl font-bold">
        Hi I'm <span className="dark:text-purple-600">John</span>
      </h1>
      <h3 className="text-4xl my-3">I am Web Designer</h3>
      <p className="text-gray-700 mb-8 dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        quibusdam autem doloremque beatae iure, nihil fugit doloribus cum soluta
        modi!
      </p>
      <button className={'p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-purple-600 text-white px-6'}>
        Hire Me!
      </button>
    </section>
  );
}

export default HomePage;

// ######## Header.tsx
import Link from "next/link";
import Button from "./Button";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/Bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Header() {
  const { systemTheme, theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []); // 다크모드떄 새로고침해도 태양모양 아이콘 유지시키려고

  // 다크모드 설정 및 아이콘
  const renderThemeChanger = () => {
    if (!mounted) return null; // 다크모드떄 새로고침해도 태양모양 아이콘 유지시킴

    const currentTheme = theme === "s" ? systemTheme : theme; // systemTheme은 항상 light (일반모드 light 디폴트)

    if (currentTheme === "dark") {
      // 다크모드인경우
      return (
        <button
          className={'p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200 dark:bg-gray-600'}
          onClick={() => setTheme("light")}
        >
          <BsFillSunFill />
        </button>
      );
    } else {
      // 일반모드인경우
      return (
        <button
          className={'p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200'}
          onClick={() => setTheme("dark")}
        >
          <BsFillMoonFill />
        </button>
      );
    }
  };

  // navigations 이름과 경로
  const navigations = [
    { label: "Home", path: "/" },
    { label: "About", path: "/" },
  ];

  return (
    <header className="h-16 flex items-center justify-between bg-red-300 dark:bg-gray-700">
      <ul className="flex gap-4">
        {navigations.map((nav) => (
          <Link
            key={nav.label}
            href={nav.path}
            className="font-semibold text-gray-400 hover:text-gray-500"
          >
            {nav.label}
          </Link>
        ))}
      </ul>
      {renderThemeChanger()}
    </header>
  );
}

export default Header;

// ######## tailwind.config.tsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',  // tailwind로 다크모드 사용 할 수 있도록
  theme: {
    extend: {},
  },
  plugins: [],
}

// ######## react-timeago (몇초전, 몇분전) ###################################################################################################################
// npm install react-timeago
// npm i --save-dev @types/react-timeago (타입스크립트)

// ######## MessageComponent.tsx  ({new Date(msg.created_at).toLocaleString()} 이부분을 대체함)
import TimeAgo from "react-timeago";
// ... 생략 ...
  <TimeAgo date={new Date(msg.created_at)} />   {/* // 참고로 msg.created_at = Date.now() // 기존 시간 나타날때는 new Date(msg.created_at).toLocaleString() */}  
// ... 생략 ...

// ######## React-beautiful-dnd (박스 끌어다놓기, 드래그앤 드롭) ################################################################################################
// https://www.npmjs.com/package/react-beautiful-dnd
// npm i react-beautiful-dnd
// npm i @types/react-beautiful-dnd
  
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd' // DropResult는 onDragEnd함수 매개변수의 타입(타입스크립트용)
const [todo, setTodo] = useState("");
const [todos, setTodos] = useState([]);
const [completedTodos, setCompletedTodos] = useState([]);

// 드래그앤 드롭됬을때 함수
  const onDragEnd = (result: DropResult) => {  // 콘솔로 result확인하면 로직구현하기 쉬울 것
    const { source, destination } = result; // source는 어디서 왔는지, destination은 어느 Droppable 공간으로 가는지

    // 아무대나 드롭하거나, 같은 Droppable 공간에 같은 index에 드롭하면 아무변화 X
    if(!destination || 
      (destination.droppableId === source.droppableId && destination.index === source.index)) return; 

      // 드롭 로직을 위한 변수들
      let add,  // 이동할 내용 복사용
      active = todos, // Active Tasks 리스트 공간 복사본
      complete = completedTodos; // Completed Task 리스트 공간 복사본

      // 재대로된 드롭 (source부분)
      if(source.droppableId === 'TodosList' ){  // Active Tasks가 source인경우 add에 내용복사 후, 그곳 index에서 지워버림
        add = active[source.index];
        active.splice(source.index, 1)
      } else {  // Completed Tasks가 source인경우 add에 내용복사 후, 그곳 index에서 지워버림
        add = complete[source.index];
        complete.splice(source.index, 1)
      }

      // 재대로된 드롭 (destination부분)
      if(destination.droppableId === 'TodosList' ){ // Active Tasks가 destination인경우 그곳에 드롭된 index에 내용(add)를 삽입
        active.splice(destination.index, 0, add)
      } else {  // Completed Tasks가 destination인경우 그곳에 드롭된 index에 내용(add)를 삽입
        complete.splice(destination.index, 0, add)
      }

      // 복사본을 원본에 삽입
      setCompletedTodos(complete);
      setTodos(active);

  
return (
<DragDropContext onDragEnd={onDragEnd}> {/* DragDropContext 사용 전체범위, (onDragEnd는 드롭했을때 발생) */}

  <Droppable droppableId="TodosList">   // Droppable 떨굴 수 있는 범위 1 (그 안은 콜백함수)
    {(provided, snapshot) => (
      <div ref={provided.innerRef}{...provided.droppableProps}> //  Droppable Zone
        {todos.map((todo, idx) => (
          
          <Draggable draggableId={todo.id.toString()} index={idx}> // Draggable 드래그 할 수있는 범위
            {(provided, snapshot) => (
              <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}> // Draggable Zone
              
              </div>
            )}
          </Draggable>

        ))}
        {provided.placeholder} {/* 드래그해도 draggable한 영역을 그대로 유지하게함 */}
      </div>
     )}
  </Droppable>

  <Droppable droppableId="TodosRemove"> // Droppable 떨굴 수 있는 범위 2 (그 안은 콜백함수)
    {(provided, snapshot) => (
      <div ref={provided.innerRef}{...provided.droppableProps}> //  Droppable Zone (snapshot.isDraggingOver 사용가능)
        {completedTodos.map((todo, idx) => (
          
          <Draggable draggableId={todo.id.toString()} index={idx}> // Draggable 드래그 할 수있는 범위
            {(provided, snapshot) => (
              <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}> // Draggable Zone (snapshot.isDragging 사용가능)
              
              </div>
            )}
          </Draggable>

        ))}
        {provided.placeholder} {/* 드래그해도 draggable한 영역을 그대로 유지하게함 */}
      </div>
     )}
  </Droppable>

</DragDropContext>
)

// snapshot.isDraggingOver 는 Droppable존에 클래스변화 시켜줄때 주로 사용
// snapshot.isDragging 는 Draggable안에 박스에 클래스변화 시켜줄때 주로 사용

