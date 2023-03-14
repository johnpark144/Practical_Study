// ######### 리마인더 #######################################################################################################################################
폴더 구조 정리 되있는거 링크 넣기




// ######### 인덱스 (Ctrl + F) ########################################################### (-> 인덱스에 있는데 찾기 안되면 찾아서 인덱스 변경) ##################
// 터보팩 -- tailwind를 위한,  
// 기본 세팅 -- 프레임워크 파일 예약어, 타입스크립트 에러무시
// 다이나믹 라우팅 -- params, NotFound, 서버사이드렌더링, SSR, SSG, ISR
// 클라이언트 사이드 렌더링 -- CSR
// Params에 단어 구글검색하는 API
// Suspense fallback -- 로딩
// 폰트 
// 미들웨어 
// usePathname  -- 현재 path 가져오기
// Redirect and Rewrite -- Redirect, Rewrite, API_KEY숨기기, API_KEY를 보이지 않고 정보 가져오기
// Detail 의 query -- pathname 마킹 및 query정보 가져오기, 기존 pathname과 query를 가진 pathname을 as로, [...params], ...params 는 배열형태로, Seo title
// 이미지 컴포넌트
// Head, title
// Upstash -- 파이어베이스랑 비슷, typings.d.ts, 유저의 시간을 서버의 시간으로
// Pusher  -- 실시간 기능, swr, 서버사이드 렌더링, SSR
// 로딩 컴포넌트 -- flowbite
// NextAuth 
// 미들웨어 -- 로그인 안되있으면 로그인페이지로 이동시키기
// 현재 pathname 보여주기 -- usePathname
// pathname으로 보내버리기 -- useRouter, router.push, router.back
// 서버사이드없이 import -- "window is not defined"방지, dynamic
// 환경변수 사용

// ######### Nextjs 관한 정보 링크 #######################################################################################################################






// ######### 기본 #######################################################################################################################################
// npx create-next-app@latest   // 자바스크립트용
// npx create-next-app@latest --typescript    // 타입스크립트용

// npx create-next-app@latest -e with-tailwindcss  // 자바스크립트 + tailwindcss용
// npx create-next-app@13.0.6 styled-components-ex // 자바스크립트 + styled-components용 // 오류해결전까지 @13.0.6

// code (app이름)   // vscode로 가게함

// npm run dev  // 개발자모드 (서버사이드 렌더만)

// npm run build // ssg테스트는 build한 뒤에 start로 확인 가능
// npm run start


// ######### 터보팩 #######################################################################################################################################
// https://blog.theashishmaurya.me/using-tailwind-css-in-nextjs-13-with-turbopack // 터보팩 tailwindcss 참고

// npx create-next-app --example with-turbopack // 터보팩
// npm i -- save-dev concurrently // 서버, 클라이언트 동시실행

// npm run dev --turbo // 터보팩 서버

// npm install -D tailwindcss postcss autoprefixer // tailwind
// npx tailwindcss init -p

// ######### package.json (tailwind를 위한)
// "dev": "concurrently \"next dev --turbo\" \"tailwindcss --input styles/globals.css --output styles/dist.css --watch\"",
// "build": "tailwindcss -i styles/globals.css --output styles/dist.css && next build",

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@ 투두리스트API, 구글서치API (nextjs13) @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ############ 기본 세팅 ###################################################################################################################################
// app폴더를 생성 // (layout, head, page, loading, not-found, Error, Template) 프레임워크 파일 예약어

// ############ next.config.js  (appDir:true설정 -> pages에 index, _app삭제 -> 서버 재시작)
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental:{
    appDir: true, // app 폴더를 사용가능하게(nextjs13)
  },
};

// ############ app/page.tsx (page페이지 생성하면 head, layout 자동생성)
// rfce

// ############ app/layout.tsx
import '../styles/globals.css'  // globals.css에있는 TailwindCSS 전역 적용
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <head />
        <body>
          <Header />
          {children}
        </body>
      </html>
      
    </>
  );
}

// ############ app/Header.tsx
import React from 'react'
import Link from 'next/link';

function Header() {
  return (
    <div className='p-5 bg-blue-500'>
      <Link href='/' className='px-2 py-1 mx-1 bg-white text-blue-500 rounded-lg'>Home</Link>
      <Link href='/todos' className='px-2 py-1 mx-1 bg-white text-blue-500 rounded-lg'>Todos</Link>
      <Link href='/search' className='px-2 py-1 mx-1 bg-white text-blue-500 rounded-lg'>Search</Link>
    </div>
  )
}

export default Header

// ############ 라우팅 및 컴포넌트 ##############################################################################################################################
// 소괄호 () 를 폴더 이름에 붙이면 라우팅 생략하여 폴더 정리가능

// ############ app/todos/page.tsx
import React from 'react'

function Todos() {
  return (
    <div>
        <h1>This is where the Todos will be listed...</h1>
    </div>
  )
}

export default Todos

// ############ app/todos/layout.tsx
import TodosList from './TodosList'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex'>
        <div>
        {/* @ts-ignore */}  {/* 타입스크립트 에러무시 주석 */}
        <TodosList />
        </div>
        <div className='flex-1'>{children}</div>
    </main>
  );
}

// ############ app/todos/TodosList.tsx
import React from "react";
import Link from "next/link";
import { Todo } from "../../../typings";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos: Todo[] = await res.json();
  return todos;
};

async function TodosList() {
  const todos = await fetchTodos();

  return <>
    {todos.map((todo)=>(
        <p key={todo.id}>
            <Link href={`/todos/${todo.id}`}>Todo:{todo.id}</Link> 
        </p>
    ))}
  </>;
}

export default TodosList;
// ############ typings.d.ts
export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

// ##### 다이나믹 라우팅과 params // NotFound // 서버사이드렌더링(SSR), Static Site Generator(SSG), Incremental Static Regeneration(ISR) ##############################
// ############ app/todos/[todoId]/page.tsx
import React from "react";
import { notFound } from "next/navigation"
import { Todo } from "../../../../typings";

type PageProps = {
  params: {
    todoId: string;
  };
};

const fetchTodo = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 60 } }
  ); // SSR은 { cache: "no-cache" }, SSG는 { cache: "force-cache" }, ISR은 { next: { revalidate: 60 } } 숫자는 시간(초)
  const todo: Todo = await res.json();
  return todo;
};

async function TodoPage({ params: { todoId } }: PageProps) {
  const todo = await fetchTodo(todoId);

  if (!todo.id) return notFound() // id가 없는 부분은 notfound에러

  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}:{todo.title}
      </p>
      <p>complete: {todo.completed ? "Yes" : "No"}</p>

      <p className="border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </p>
    </div>
  );
}

export default TodoPage;

// SSG나 ISR를 사용하는경우 todoId 캐시를 미리 생성하기위해 만들어놈 (nup run build 해야함) // SSR은 사용자가 접속했을때 캐시저장
export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos: Todo[] = await res.json();

  const trimmedTodos = todos.splice(0, 10); // api 리퀘스트 제한 떄문에 10번만 시범으로 

  return trimmedTodos.map(todo => ({
    todoId : todo.id.toString(),  // 무조건 숫자는 string으로 바꿔줘야함
  }))
}

// ############ app/todos/[todoId]/not-found.tsx
import React from 'react'

function NotFound() {
  return (
    <div>
      404 NotFound
    </div>
  )
}

export default NotFound

// ########### 클라이언트 사이드 렌더링 (CSR) #####################################################################################################################
// ############ app/search/layout.tsx
'use client' // CSR 사용선언 (layout에 선언하면 그밑에 다 적용됨)
import Search from "./Search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex space-x-4 divide-x-2 p-5">
      <div className="search">
        <h1>Search</h1>
      </div>
      <div className="flex-1 pl-5">
        <Search />

        <div>{children}</div>
      </div>

      <style jsx>{`
        .search {
          color: blue;
        }
      `}</style>
    </main>
  );
}
// ############ app/search/page.tsx
// ... 생략 ...
// ############ app/search/Search.tsx
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

function Search() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch('');
        router.push(`/search/${search}`);
    };

    return(
        <form onSubmit={handleSearch}>
            <input
            type='text'
            value={search}
            placeholder="Enter the Search term"
            onChange={(e)=>setSearch(e.target.value)}
            />
            <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg btn'>
                Search
            </button>
        </form>
    )
}

export default Search

// ########### Params에 단어 구글검색하는 API // 로딩(loading) //에러(error)  #################################################################################
// ########### app/search/[searchTerm]/page.tsx
import React from "react";

type PageProps = {
  params: {
    searchTerm: string;
  };
};

type SearchResult = {
    organic_results: [
        {
            position: number;
            title: string;
            link: string;
            thumbnail: string;
            snippet: string;
        }
    ]
}

const search = async (searchTerm: string) => {
  const res = await fetch(
    `http://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`
  ); // https://serpapi.com/

  // throw new Error('somthing broke!') // 에러 유발

  const data: SearchResult = await res.json();
  return data;
};


async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await search(searchTerm);
  return (
  <div>
    <p className="text-gray-500 text-sm">You searched for: {searchTerm}</p>
    
    <ol className="space-y-5 p-5">
    {searchResults.organic_results.map((result) => (
        <li key={result.position} className='list-decimal'>
            <p className="font-bold">{result.title}</p>
            <p>{result.snippet}</p>
        </li>
    ))}
    </ol> 
  </div>
  );
}

export default SearchResults;

// ########### error.tsx (docs 에있는 예시)
'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}

// ########### loading.tsx
import React from 'react'

function Loading() {
  return (
    <div>
      Loading SearchResults
    </div>
  )
}

export default Loading

// ########### 번외) Suspense fallback 로딩 ###########################################################################################################
import React, { Suspense } from "react";
import TodosList from './(user)/todos/TodosList';

<Suspense fallback={<p>Loading the Todos</p>}> // TodosList가 보일때까지 fallback을 렌더링
  {/* @ts-ignore */}
  <TodosList />
</Suspense>

// ########### 번외) 폰트 ##############################################################################################################################
// npm i @next/font // nextjs 폰트 설치

// ########### layout.tsx
// ... 생략 ...
import { Roboto } from '@next/font/google'; // 글꼴 종류별로 변경 가능

const roboto = Roboto({
  subsets: ['latin'],  
  weight: ['400', '700']   // 글꼴옵션 (구글아이콘 참고)
})
// ... 생략 ...
<html className={roboto.className}> {/* 글꼴 전체 지정 */}
// ... 생략 ...

// ########### 번외) 미들웨어 ################################################################################################################################
// https://nextjs.org/docs/advanced-features/middleware  참고
// middleware.ts(또는 .js) 파일을 src디렉토리와 같은 루트 에 생성
// ########### middleware.ts (예시)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'// 타입스크립트 전용

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }

// matcher에 특정 경로에서 실행되도록 미들웨어를 필터링함
export const config = {
  matcher: '/about/:path*',
}


// ########### 번외) usePathname (현재 path 가져오기) ########################################################################################################
import { usePathname } from 'next/navigation';
const pathname = usePathname();
 
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@ 영화 정보 사이트 (노마드 코더 nextjs12) @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@ Meta 메신저 (nextjs13, Tailwind, Typescript, Upstash, Redis, NextAuth) @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ######## 이미지 컴포넌트 ##################################################################################################################################
// div 크기에 따라 크기 정하기
//<div className="relative.."> {/* 배너이미지 // 부모: relative, 이미지: fill */}
//  <Image
//    src=""
//    layout="fill"
//    objectFit="contain"
//    objectPosition="left"
//    />
//</div>
  
// ############ app/Header.tsx
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

// ######## Header with tailwind Css ######################################################################################################################
// ############ Header.tsx
import Image from "next/image";
import Link from "next/link";
import LoggoutButton from './LoggoutButton';

function Header() { // nextjs13에선 Header가 예약어로 되있어서 header라는 페이지가 만들어지지 않음
    const session = true;

    if (session)  
      return (  // 로그인후 헤더
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

  return (   // 로그인하기전 헤더
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

// ######## Head, title ##########################################################################################################################
// ######## head.tsx  // nextjs13에선 Head가 예약어로 되있어서 head역할하게함
export default function Head() {
  return (
    <>
      <title>Meta Messenger</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}


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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
      disabled:opacity-50 disabled:cursor-not-allowed"
      >
        send
      </button>
    </form>
  );
}
export default ChatInput;


// ######## Upstash (Data GET, POST) // 파이어베이스랑 비슷 ##################################################################################################
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
        messagesRes.map((message) => JSON.parse(message)).sort((a, b) => a.created_at - b.created_at);

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

// ######## NextAuth 로그인 세션 및 로그아웃 ####################################################################################################################
// ######## app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function Providers({ session, children }: any) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}

// ######## app/page.tsx
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { unstable_getServerSession } from "next-auth/next";
import { Providers } from "./providers";

async function HomePage() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json()); // 그냥 SSR됨
  const messages: Message[] = data.messages;
  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
        <main>
          <MessageList initialMsg={messages} />
          <ChatInput session={session} />
        </main>
    </Providers>
  );
}

export default HomePage;


// ######## app/layout.tsx
import "../styles/globals.css";
import Header from "./Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

// ######## app/LoggoutButton.tsx
"use client";
import { signOut } from "next-auth/react";

function LoggoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      sign out
    </button>
  );
}

export default LoggoutButton;

// ######## app/Header.tsx
import Image from "next/image";
import Link from "next/link";
import LoggoutButton from './LoggoutButton';
import { unstable_getServerSession } from 'next-auth';

async function Header() { // nextjs13에선 Header가 예약어로 되있어서 Header라는 페이지가 만들어지지 않음
    const session = await unstable_getServerSession();

    if (session)
      return (  // 로그인후 헤더
        <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
          <div className="flex space-x-2">
            <Image
              className="rounded-full mx-2 object-contain"
              height={10}
              width={50}
              src={session.user?.image!}  // 로그인한 유저의 페북이미지
              alt="Profile picture"
            />

            <div>
              <p className="text-blue-400">Logged in as:</p>
              <p className="font-bold text-lg">{session.user?.name}</p> {/* 로그인한 유저의 페북 유저이름 */}
            </div>
          </div>

          <LoggoutButton />
        </header>
      );
// ... 생략 ...


// ######## app/MessageComponent.tsx
// parant 컴포넌트가 "use client"여서 안적어도됨
import Image from "next/image";
import { Message } from "../typings";
import { useSession } from "next-auth/react"

type Prop = {
  msg: Message;
};

function MessageComponent({ msg }: Prop) {
  const {data : session} = useSession();  // 클라이언트 사이드 세션가져오기
  const isUser = session?.user?.email === msg.email;
// ... 생략 ...

// ######## app/ChatInput.tsx
// ... 생략 ...
// 메시지 데이터를 서버에 보내기
  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;
    const messageToSend = input;
    setInput("");
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };
// ... 생략 ...

// ######## 미들웨어 (로그인 안되있으면 로그인페이지로 이동시키기)#################################################################################################
// ######## middleware.ts
export { default } from "next-auth/middleware";
export const config = { matcher: ["/"] };  // 로그인 안된상태에서 '/'페이지로 갔을때 [...nextauth]에 지정해둔 페이지로감


// ###############################################################################################################################
// ########## 기타 NEXT JS 유용한것들 ##############################################################################################
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
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map'), { ssr: false }) // Import witout SSR // To prevent from Error "window is not defined"


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

