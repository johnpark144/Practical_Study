// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@ 영화 정보 사이트 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// npx create-next-app@latest   // 자바스크립트용
// npx create-next-app@latest --typescript    // 타입스크립트용
// npx create-next-app -e with-tailwindcss  // tailwindcss용

// code (app이름)   // vscode로 가게함
// npm run dev

// ########### 삭제할 것들 ##################################################################################################################################
public안에 파일들

// ########### 기본 라우팅 ########################################################################################################################################
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
// ext install vscode-styled-components

// ############ NavBar.js
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

// ############### Custom App #############################################################################################################################
// ############ _app.js (page들을 렌더링 할때 _app.js의 Component파라미터를 거쳐감 -> styled-components를 이용한 CSS를 전역으로 사용가능 , 네비바랑 footer 사용가능)

import NavBar from "./../components/NavBar";
import "../styles/globals.css"; // _app.js에서만 글로벌 CSS사용가능

function _app({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      {/* 모든 페이지*/}
      <Component {...pageProps} />  {/* pageProps은 서버사이드에서 보내준 props */}

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

// ########### Head Title Pattern #########################################################################################################################
// ############ components/Seo.js
import Head from 'next/head';

function Seo({ title }) {
  return (<>
    {/* 헤드 타이틀 바꾸기 */}
    <Head>
      <title>{title} | Next movies</title>
    </Head>
    </>)
}

export default Seo

// ############ components/Layout.js
import NavBar from "./NavBar"

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default Layout

// ############ _app.js
import Layout from './../components/Layout';

function _app({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default _app;

// ############ index.js
import Seo from '../components/Seo';

function index() {
  return (
    <>
      <Seo title='Home' /> {/* 타이틀 변경 가능 */}
      <div>"hi"</div>
    </>
  );
}

export default index;

// ########### Data fetch (useQuery사용) ###########################################################################################################
// ############ index.js

import { useQuery } from "react-query";
import Seo from "../components/Seo";

function index() {
  const fetchMovies = async () => {
    const response = await fetch(
      `/api/movies`
    );
    return response.json();
  };

  const { data, isLoading } = useQuery("movies", fetchMovies);

  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}
      {isLoading && <h4>Loading...</h4>}
      {data?.results.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default index;

// ########### Redirect and Rewrite (API_KEY숨기기) ###########################################################################################################
// ############ next.config.js  (변경시마다 서버재시작 해줘야함)
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact/:path*",      // 기존 주소 (:는 아무문자나, *는 뒤에 모든것을 캐치함)
        destination: "/form/:path*",    // 리디렉트할 주소
        permanent: false,
      },
    ]
  },
  
  async rewrites(){
    return [
      {
        source: "/api/movies",    // 기존 주소
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`    // 가져올 정보의 주소(즉 API_KEY를 보이지 않고 정보가져오기 가능)
      },
    ]
  }
}

module.exports = nextConfig

// ############ .env
API_KEY="453c0ea4912bfd2992005c0b2daf7663"

// ############ .gitignore  (.env의 정보를 업로드하지 않게 함)
# API_KEY
.env

// ########### Server Side Rendering (SSR) ###########################################################################################################
// ############ index.js

import Seo from "../components/Seo";

function index({ data }) {  // SSR props (pageProps)
  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}
      {data?.results.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}


export async function getServerSideProps(){ // 백엔드에서 작동되는 부분 (function이름 고정)
  const data = await (await fetch(`http://localhost:3000//api/movies`)).json();

  return {
    props: {
      data,   // 데이터를 props으로 전달
    },
  }
}

export default index;

// ########### Dynamic 라우팅 (폴더사용) ##########################################################################################################################
// pages/폴더명/index.js -> http://localhost:3000/폴더명
// pages/폴더명/all.js -> http://localhost:3000/폴더명/all
// pages/폴더명/[id].js -> http://localhost:3000/폴더명/:id
// pages/폴더명/[...params].js -> http://localhost:3000/폴더명/:params[0]/:params[1]/:params[2]...

// ############ pages/movies/[...params].js
import { useRouter } from "next/router";

function Detail() {
  const router = useRouter();
  
  return <div>{router.query.params}</div>;  // 파일명 [params] (주소창에 입력한 params) 와 같은값
}

export default Detail;

// ########### Detail 의 query, pathname 마킹 및 query정보 가져오기 ##############################################################################################
// ############ next.config.js

// ...생략...
async rewrites(){
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}` 
      },
      {
        source:"/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`  
      }
    ]
  }
}
// ...생략...

// ############ index.js (방법1)

import Seo from "../components/Seo";
import Link from "next/link";

function index({ data }) {
  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}

      {data?.results.map((movie) => (
        <Link href={{
          pathname: `/movies/${movie.id}`,
          query:{
            title: movie.original_title,   // ex) ?title=Black+Adam
          },
        }} as={`/movies/${movie.id}`} // 기존 pathname과 query를 가진 pathname을 as로 다시 만듬
        key={movie.id}>
        
          <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        </Link>
      ))}
      
// ...생략...
      
// ############ index.js (방법2)
      
import Seo from "../components/Seo";
import Link from "next/link";

function index({ data }) {
  return (
    <div className="container">
      <Seo title="Home" /> {/* 타이틀 변경 가능 */}
      
      {data?.results.map((movie) => (
        <Link href={`/movies/${movie.original_title}/${movie.id}`} key={movie.id}>  
          <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        </Link>
      ))}
// ...생략...
      
// ############ [...params].js
import { useRouter } from "next/router";

function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || []; // ...params 는 배열형태로 
  return (
  <div>
    <Seo title={title} />
    {title}
  </div>
)}

export async function getServerSideProps({ query:{params} }){ // 백엔드 (getServerSideProps context prop제공)
  return {
    props: {
      params
    },
  }
}

export default Detail;

// ########### Notfound Error (404) ##########################################################################################################################
// ############ pages/404.js (404.js에 매칭되지 않은 페이지들이 다감)
function NotFound() {
  return (
    <div>
      Not Found error
    </div>
  )
}
export default NotFound


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@ Meta 메신저 (nextjs13, Tailwind, Typescript, Upstash, Redis, NextAuth) @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ############ next.config.js  (appDir:true설정 -> pages에 index, _app삭제 -> 서버 재시작)
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental:{
    appDir: true, // app 폴더를 사용가능하게(nextjs13)
  },
};

// ############ app/layout.tsx
import '../styles/globals.css'  // globals.css에있는 TailwindCSS 전역 적용

// ######## 이미지 컴포넌트 #####################################################################################################################################
// ############ app/Header.tsx
import React from 'react'
import Image from 'next/image';

function Header() { // nextjs13에선 Header가 예약어로 되있어서 header라는 페이지가 만들어지지 않음
  return (
    <header>
      <div>
        <div>
            <Image
             src='http://links.papareact.com/jne'
             height={10}
             width={50}
             alt='Logo'
             />
        </div>
      </div>
    </header>
  )
}
export default Header

// ############ app/layout.tsx
import Header from './Header';

// ... 생략 ...
return (
    <html>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );

// ############ next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images:{
    domains: ['links.papareact.com'],   // 특정 도메인으로 이미지컴포넌트 사용가능 하게
  },
  // ... 생략 ...
};

// ######## Header with tailwind Css ########################################################################################################
// ############ Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoggoutButton from './LoggoutButton';

function Header() { // nextjs13에선 Header가 예약어로 되있어서 header라는 페이지가 만들어지지 않음
    const session = true;

    if (session)  
      return (  // 로그인하기전 헤더
        <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
          <div className="flex space-x-2">
            <Image
              className="rounded-full mx-2 object-contain"
              height={10}
              width={50}
              src="http://links.papareact.com/jne"
              alt="Profile picture"
            />

            <div>
              <p className="text-blue-400">Logged in as:</p>
              <p className="font-bold text-lg">john</p>
            </div>
          </div>

          <LoggoutButton /> // 로그아웃 버튼
        </header>
      );

  return (  // 로그인후 헤더
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="http://links.papareact.com/jne"
            height={10}
            width={50}
            alt="Logo"
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          sign in
        </Link>
      </div>
    </header>
  );
}
export default Header;

// ############ LoggoutButton.tsx
import React from "react";

function LoggoutButton() {
  return (
    <button
     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      sign out
    </button>
  );
}

export default LoggoutButton;

// ######## ChatInput 컴포넌트 with tailwind Css ########################################################################################################
// ############ page.tsx
import React from 'react'
import MessageList from './MessageList';
import ChatInput from './ChatInput';

function HomePage() {
  return (
    <div>
        <MessageList />
        <ChatInput />
    </div>
  )
}
export default HomePage

// ############ MessageList.tsx
import React from 'react'

function MessageList() {   // 아직 완성되지 않음
  return (  
    <div>
        <p>message</p> 
        <p>message</p>
        <p>message</p>
    </div>
  )
}
export default MessageList

// ############ ChatInput.tsx
'use client';   // 리액트 use를 사용하려면 적어둬야함
import React, { useState } from "react";

function ChatInput() {
    const [input, setInput] = useState("");

    const addMessage = (e:React.FormEvent<HTMLFormElement>) =>{   // 아직 완성되지 않음
        e.preventDefault()
        if(!input) return;

        const messageToSend = input;  

        setInput('');
    }

  return (
    <form onSubmit={addMessage} className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2
        focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-whtie font-bold py-2 px-4 rounded
      disabled:opacity-50 disabled:cursor-not-allowed"
      >
        send
      </button>
    </form>
  );
}
export default ChatInput;


// ######## Upstash (Data GET, POST) #############################################################################################################################
// https://console.upstash.com/  // 사이트 참고
// npm install ioredis

// npm install uuid
// npm i --save-dev @types/uuid

// ############ redis.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!)

export default redis;

// ############ .env
REDIS_URL="redis://default:472fc2e8a5bf470dadf7f3dd282d63f8@global-main-goldfish-30669.upstash.io:30669"

// ############ utils/fetchMessages.ts
import { Message } from "../typings";

const fetcher = async () => {
    const res = await fetch('/api/getMessages');
    const data = await res.json();
    const messages: Message[] = data.messages;

    return messages;
}

export default fetcher;

// ############ app/ChatInput.tsx
"use client"; // 리액트 use를 사용하려면 적어둬야함
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import { useQuery, useMutation, useQueryClient } from "react-query";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");

  // 메시지 데이터를 서버에서 받아오기
  const {
    data: Message,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("/api/getMessages", fetcher);

  // 메시지 데이터를 서버에 보내기
  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = input;
    setInput("");
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "John park",
      profilePic:
        "https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=w240-h480-rw",
      email: "abc@gmail.com",
    };

    const res = await fetch("/api/addMessage", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        message,
    }),
    });

  };

  const { mutate } = useMutation(addMessage, {
    onSuccess: (data) => {
        refetch();
    }
  })
  
  return (
    <form
      onSubmit={(e) => mutate(e)}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
    >
// ... 생략 ...
  );
}

export default ChatInput;

// ############ typings.d.ts (타입들 보관)
export type Message = {
    id: string;
    message: string;
    created_at: number;
    username: string;
    profilePic: string;
    email: string;
};

// ############ pages/api/addMessage.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { Message } from '../../typings';

type Data = {
    message: Message;
}

type ErrorData = {
    body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    if(req.method !== 'POST'){
        res.status(405).json({ body: 'Method Not Allowed' })
        return;
    }
    const { message } = req.body;

    const newMessge = {
        ...message,
        created_at: Date.now()  // 유저의 시간을 서버의 시간으로 교체
    }

    await redis.hset('messages', message.id, JSON.stringify(newMessge));

  res.status(200).json({ message: newMessge })
}

// ############ pages/api/getMessages.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { Message } from '../../typings';

type Data = {
    messages: Message[];
}

type ErrorData = {
    body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    if(req.method !== 'GET'){
        res.status(405).json({ body: 'Method Not Allowed' })
        return;
    }
    
    const messagesRes = await redis.hvals('messages')
    const messages: Message[] =
        messagesRes.map((message) => JSON.parse(message)).sort((a, b) => b.created_at - a.created_at); // 오름차순

  res.status(200).json({ messages })
}

// ######## 실시간 기능 Pusher ############################################################################################################################
// https://dashboard.pusher.com/ (create App)

// ######## pusher.ts  (Getting Started메뉴와 App Keys에 나와있는 정보를 이와같이 복사)
import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({  // 백엔드
  appId: "1524994",
  key: process.env.CLIENT_ID!,
  secret: process.env.SERVER_SECRET!,
  cluster: "us2",
  useTLS: true,
});

export const clientPusher = new ClientPusher('218a5df1343502f27233', {  // 프론트엔드
  cluster: "us2",
  forceTLS: true,
});

// ######## .env
REDIS_URL="redis://default:472fc2e8a5bf470dadf7f3dd282d63f8@global-main-goldfish-30669.upstash.io:30669"
CLIENT_ID="218a5df1343502f27233"
SERVER_SECRET="7fc77533a3747a9ecaca"

// ######## addMessage.ts
import { serverPusher } from '../../pusher';

// ... 생략 ...
  await redis.hset('messages', message.id, JSON.stringify(newMessge));
  serverPusher.trigger('messages', 'new-message', newMessge)  // Channel, Event, Content (데이터 보낼때 Pusher에도 realtime위해서 전해줌)
 res.status(200).json({ message: newMessge })
}

// ######## MessageList.tsx // 방법1) (swr로 구현하기) // npm install swr
// "use client"; // 리액트 use를 사용하려면 적어둬야함
// import React, { useEffect } from "react";
// import useSWR from "swr";
// import { clientPusher } from "../pusher";
// import { Message } from "../typings";
// import fetcher from "../utils/fetchMessages";
// import MessageComponent from "./MessageComponent";

// function MessageList() {
//   // useSWR로 메시지 데이터를 서버에서 받아오기
//   const { data: messages, mutate } = useSWR<Message[]>(
//     "/api/getMessages",
//     fetcher
//   );

//   useEffect(() => {
//     const channel = clientPusher.subscribe("messages");

//     channel.bind("new-message", async (data: Message) => {
//       if (messages?.find((msg) => msg.id === data.id)) return;
//       if (!messages) {
//         mutate(fetcher);
//       } else {
//         mutate(fetcher, {
//           optimisticData: [data, ...messages!],
//           rollbackOnError: true,
//         });
//       }
//     });

//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   }, [messages, mutate, clientPusher]);

//   return (
//     <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
//       {messages?.map((msg) => (
//         <MessageComponent key={msg.id} msg={msg} />
//       ))}
//     </div>
//   );
// }

// export default MessageList;

// ######## MessageList.tsx // 방법2) (reactquery로 구현하기)
"use client"; // 리액트 use를 사용하려면 적어둬야함
import React, { useEffect } from 'react'
import { useQuery, useMutation } from 'react-query';
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';

function MessageList() {
  // 메시지 데이터를 서버에서 받아오기
  const { data:messages, refetch } = useQuery<Message[]>("/api/getMessages", fetcher);

  // 실시간으로 데이터 가져오기
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      if (!messages) return;
      if (messages?.find((msg) => msg.id === data.id)) return; // 트리거된 데이터의 id와 현재 데이터의 id가 중복되면
      refetch();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, clientPusher]);

  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
        {messages?.map(msg=>(
          <MessageComponent key={msg.id} msg={msg} />
        ))}
    </div>
  )
}

export default MessageList

// ######## 서버사이드 렌더링 (SSR) ##########################################################################################################################
// ######## page.tsx
import React from 'react'
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from '../typings';

async function HomePage() {;
  const data = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`).then((res) => res.json()) // 그냥 SSR됨
  const messages: Message[] = data.messages;

  return (
    <div>
        <MessageList initialMsg={messages} />
        <ChatInput />
    </div>
  )
}

export default HomePage


// ######## MessageList.tsx
// ... 생략 ...
type Props = {
  initialMsg: Message[];
}

function MessageList({ initialMsg }: Props) {
// ... 생략 ...
return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMsg).map((msg) => (
        <MessageComponent key={msg.id} msg={msg} />
      ))}
    </div>
  );

// ######## 로딩 컴포넌트 (flowbite이용) ###################################################################################################################
// ######## loading.tsx
import React from "react";

function Loading() {
  return (
    <div className="text-center pt-8">
      <p className='text-blue-400 pb-5 animate-pulse'>Loading Messenger</p>
      <div role="status">
        <svg
          className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;

// ######## NextAuth (Facebook 아이디) ##########################################################################################################################
// https://next-auth.js.org/
// npm install next-auth

// ######## pages/api/auth/[...nextauth].tsx
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,  // https://developers.facebook.com/apps에서 받아서 .env에 보관
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin'
  },
}
export default NextAuth(authOptions)

// ######## app/auth/signin/page.tsx
import { getProviders } from "next-auth/react";
import Image from 'next/image';
import SignInComponent from './SignInComponent';

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image className="rounded-full mx-2 object-cover" width={700} height={700} src="https://links.papareact.com/161" alt="Profile Picture" />
      </div>

      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;


// ######## app/auth/signin/SignInComponent.tsx
'use client'
import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react"

type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
}

function SignInComponent({ providers }: Props) {
  return (
    <div className="flex justify-center">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={()=> signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || 'http://localhost:3000',
            })}>
                sign in with {provider.name}
            </button>
        </div>
      ))}
    </div>
  )
}

export default SignInComponent

// ######## 로그인 세션 #############################################################################################################################
// ######## app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";

export function Providers({ session, children }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Providers;

// ######## app/layout.tsx
import Providers from "./providers";
import { unstable_getServerSession } from 'next-auth/next';
// ... 생략 ...
const session = await unstable_getServerSession();
// ... 생략 ...
  <Providers session={session}>
    {children}
  </Providers>

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@ 그외에 쓸만한 것들 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ############ 
