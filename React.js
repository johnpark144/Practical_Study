
// ######### 리마인더 #######################################################################################################################################
// axios 정리하기
// createPortal 부분 정리하기




// ######### 인덱스 (Ctrl + F) ########################################################### (-> 인덱스에 있는데 찾기 안되면 찾아서 인덱스 변경) ##################
// 링크 -- 폴더 구조
// vite
// 삭제할 것들
// 라우터 구현 -- 라우팅 안된부분, dummy, Link To, useParams, json-server, restful api 구축,
// fetch()로 API 호출 -- fetch, async와 await를 이용한 방법
// Custom hooks -- useFetch
// PUT, DELETE -- JSON.stringify, 
// Create, useNavigate, useRef -- 'Content-Type': 'application/json', JSON.stringify, 
// 로딩
// UseReducer
// UseRef 
// UseMemo 
// UseCallback 
// React.memo -- 자주렌더링될때, 렌더링 될때마다 복잡한로직
// Async(로딩)중일때 -- Suspense 
// Esc를 눌렀거나, 돔밖을 눌렀을경우 닫기
// UnSerialized 정보 상태관리 오류 해결
// localStorage
// setTimeout
// setInterval 
// innerWidth
// scrollY
// Netlify 배포후 새로고침시 에러 방지
// pathname -- 쿼리 생성
// useSearchParams -- 쿼리 만들어 주소창에 보내기, 주소창에 쿼리 가져오기
// 주소창에 params 가져오기
// Link 특정 앵커로 보내기 -- HashLink, NavHashLink
// Link 이동할때 특정 state같이 보내기 -- useLocation
// React.lazy()와 Suspense  -- 컴포넌트의 로딩 시점을 지연, 대체정보를 출력
// useTransition, useDeferredValue -- 동시 처리되어 버벅거릴 때, UX을 개선, 늦게처리함

// ######### 리액트 관한 정보 링크 #######################################################################################################################
// 폴더 구조 : https://velog.io/@raverana96/react-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%ED%8F%B4%EB%8D%94%EA%B5%AC%EC%A1%B0


// @@@@@@@@@@@ React-app 1 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ###########################################################(nodejs 명령어:npx,npm)##########################################
// npx create-react-app my-app //  (my-app)이라는 프로젝트 생성, 현재 디렉토리에 만들때는 my-app대신 . 찍어줌 (powershell x)
// npm start //  서버동작

// npm run build // 배포판을 만들게 해줌
// npx serve -s build // build폴더에 index.html을 서비스하는 웹서버가 실행

// ######### vite ##################################################################################################
// npm create vite@latest 
// npm i
// npm run dev
// npm run build
// npm run preview // 배포판 실행

// ########### 삭제할 것들 ########################################################################################
favicon.ico
logo192.png
logo512.png
robots.txt
manifest.json
App.css
App.test.js
logo.svg
seviceWorker.js
reporwebvital
setupTests.js
Readme

아래 index.html 파일 내용물 (인터넷에 더찾아보기)
주석들
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
<noscript>You need to enable JavaScript to run this app.</noscript>

아래 index.js 파일 내용물
import reporwebvital
root.render안에 React.StrictMode태그
render이후

아래 App.js 파일 내용물
import logo from './logo.svg';
import './App.css';
return내용들

index.css 모든 내용들

// ################################################################################### State의 객체와 배열 ###########################

// const [value, setValue] = useState(Primitive);           ex) string, number, bigint, boolean, undefined, symbol, null 인경우
// 일반적인 방법으로 useState실행

// const [value, setValue] = useState(Object);              ex) object, array 인경우
// 방법1. 1) newValue = {...value} (복제)    ->    2) newValue의 값변경    ->    3) setValue(newValue)
// 방법2. 1) setValue((currentValue) => [...currentValue, (값변경)]) 

// ############ Create ##################################################################################################################
function Create(props) {
    return <article>
        <h2>Create</h2>
        <form onSubmit={e => { // onSubmit함수는 submit눌렀을때만 실행됨
            e.preventDefault();
            const title = e.target.title.value; // 'name'을통해 value전달
            const body = e.target.body.value;
            props.onCreate(title, body); // submit될때 인자 title, body를 적용시켜 함수를 실행
        }}>
            <p><input type="text" name='title' placeholder='title' /></p>
            <p><textarea name='body' placeholder='body'></textarea></p>
            <p><input type='submit' value='Create'></input></p>
        </form>
    </article>
}

function App() {
    const [mode, setMode] = useState('welcome'); // mode가 useState의 인자 즉 초기값(welcome), setMode는 변경될값
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' },
        { id: 3, title: 'js', body: 'js is...' }
    ]);
    let content;

    if (mode === 'welcome') {
        //  ...생략...
    } else if (mode === 'create') {
        content = <Create
            onCreate={(title, body) => { // form에서 submit눌렀을때만 실행되는 함수 (평소에는 그냥 <Create></Create> 즉 create 폼들만 보여줌)
                const newTopic = { id: nextId, title: title, body: body } // submit 됬을때 함수가 실행되어 title,body인자가 여기에 적용됨
                const newTopics = [...topics] // 복제
                newTopics.push(newTopic) // 복제한것에 새로운 데이터 추가
                setTopics(newTopics); //추가된 데이터가 담긴 복제리스트를 다시 topics로
                setMode('read');
                setId(nextId); // 원래 저장되있던 id:4부터
                setNextId(nextId + 1); // nextId를 미리만들어놈
            }}>
        </Create>
    }

    return (
        <div>
            {/* ...생략... */}
            {content}
            <a href='/create' onClick={e => {
                e.preventDefault();
                setMode('create');
            }}>Create</a>
        </div> // Create누르면 create모드
    );
}
// ############ Update ##################################################################################################################

function Update(props) {
    const [title, setTitle] = useState(props.title); // 타자칠때 마다 실시간으로 적히도록
    const [body, setBody] = useState(props.body); // 타자칠때 마다 실시간으로 적히도록
    return <article>
        <h2>Update</h2>
        <form onSubmit={e => {
            e.preventDefault();
            const title = e.target.title.value; // 수정된 title 전송하기위해
            const body = e.target.body.value; // 수정된 body 전송하기위해
            props.onUpdate(title, body); // onUpdate 함수를통해 title과 body 데이터 전송
        }}>
            <p><input type="text" name='title' placeholder='title' value={title} // value로 수정전 내용들이 폼에 적용되어있도록,
                onChange={e => { // 리액트에서 onChange는 값을 입력 할때 마다호출 (html과다름, html은 마우스포인트가 빠져나갈때 호출)
                    setTitle(e.target.value); // 수정된title을 useState의 setTitle를 통해 title에적용
                }} /></p>
            <p><textarea name='body' placeholder='body' value={body}
                onChange={e => {
                    setBody(e.target.value);
                }}></textarea></p>
            <p><input type='submit' value='Update'></input></p>
        </form>
    </article>
}

function App() {
    const [mode, setMode] = useState('welcome'); // mode가 useState의 인자 즉 초기값(welcome), setMode는 변경될값
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' },
        { id: 3, title: 'js', body: 'js is...' }
    ]);
    let content;
    let contextControl;

    if (mode === 'welcome') {
        content = <Article title="welcome" body="hello, web"></Article>

    } else if (mode === 'read') {
        //  ... 생략 ...
        contextControl = <li><a href={'/update/' + id} onClick={e => {   // 수정가능한 것을 클릭했을때만 (read에서만) Update 표시, 클릭한 id도 전달됨
            e.preventDefault();
            setMode('update'); // Update버튼 눌렀을때 update모드로
        }}>Update</a></li>

        // ... 생략 ...
    } else if (mode === 'update') {
        let title, body;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            } // Update버튼 눌렀을 때 id 판단하여 그 title과 body값을 가져옴
        }
        content = <Update title={title} body={body} // Update함수에 title,body 인자전달
            onUpdate={(title, body) => { // 평소에 실행x, Update버튼 눌러서 form태그에 함수요청할때만 실행
                const newTopics = [...topics] // newTopics로 원래 데이터 복제
                const updatedTopic = { id: id, title: title, body: body } // 수정된 데이터 정보
                for (let i = 0; i < newTopics.length; i++) {
                    if (newTopics[i].id === id) {
                        newTopics[i] = updatedTopic; // 수정된 데이터 id값을 가진정보로 덮어씌움(아직복제상수안)
                        break;
                    }
                }
                setTopics(newTopics); // 수정된 복제품을 원래데이터에 덮어씌움
                setMode('READ');
            }
            }></Update>
    }
    return (
        <div>
            {/* ...생략... */}
            {content}
            <ul>
                <li>
                    <a href='/create' onClick={e => {
                        e.preventDefault();
                        setMode('create');
                    }}>Create</a>
                </li>
                {contextControl}
            </ul>
        </div> // {contextControl}는 필요한부분에만 update버튼을 부여하였기때문에 있는경우에만 출력
    );
}

// ############ Delete #########################################################################################################
function App() {
    const [mode, setMode] = useState('welcome'); // mode가 useState의 인자 즉 초기값(welcome), setMode는 변경될값
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' },
        { id: 3, title: 'js', body: 'js is...' }
    ]);
    let content;
    let contextControl;

    if (mode === 'welcome') {
        content = <Article title="welcome" body="hello, web"></Article>

    } else if (mode === 'read') {
        <> {/* 복수의 태그를 그루핑 하기위한 빈태그 */}
            {/*  ... 생략 ... */}
            <li><input type='button' value='delete' onClick={() => {
                if (window.confirm('삭제할래?')) {
                    const newTopics = []
                    for (let i = 0; i < topics.length; i++) {
                        if (topics[i].id !== id) {
                            newTopics.push(topics[i]); // id가 일치하지 않는 데이터만 빈리스트에 집어넣음 (삭제기능)
                        }
                    }
                    setTopics(newTopics); // 선택되었던id를 제외한 모든 데이터를 기존데이터에 덮어씌움
                    setMode('welcome');
                }
            }} /></li>
        </>
        // ...생략...
    }
}
// #################################################################################################################################
// ####################################################### React-app 2 #############################################################
// ###### component분리와 CSS #####################################################################################################

// App.js
import Hello from './component/Hello'; // 현디렉토리의 component폴더의 Hello모듈(Hello.js)
function App() {
    return (
        <>
            <Hello />
        </>
    )
}

// component/Hello.js
import World from './World'; // 다른 component를 사용가능
import styles from './Hello.module.css'; // 전체 적용되는 css가아니고 따로 적용해주려고
export default function Hello() {
    return (
        <>
            <h1 className={styles.box}>Hello</h1>   {/* CSS가 그대로 적용되는 랜덤 클래스이름 만들어줌 (해당 태그에 특화된 class) */}
            <World />
        </>
    );
}

// ############ filter함수, Map함수(for문대신) 활용 ################################################################################
// db.data.json
// { 
//     "days":[
//         {"id":1, "day":1},
//         {"id":2, "day":2},
//         {"id":3, "day":3}
//     ],
//     "words:"[
//         {
//             "id":1,
//             "day":1,
//             "eng":"book",
//             "kor":"책",
//             "isDone": false
//         },
//         {
//             "id":2,
//             "day":1,
//             "eng":"apple",
//             "kor":"사과",
//             "isDone": false
//         },
//         ...
//     ]
// }

// component/Hello.js
import dummy from '../db/data.json';
export default function DayList() {
    const day = 1;
    const wordList = dummy.words.filter(word => (
        word.day === day
    )) // 현재 1일차거만 모은 리스트(페이지)
    return (
        <>
            {dummy.days.map(day => ( //배열 하나하나를 day라는 인자로 // day인자 배열안애 만약 id가없는경우 map((day, idx)=>(...)) 형식처럼 두번째인자에 idx줄수있음
                <li key={day.id}> Day {day.day} </li>
                // Map이나 for문 사용하는경우 key 값 필요 //day.day Key 즉 value 1,2,3...을출력 // Map함수로 1,2,3...을 Day1, Day2, Day3으로 동시에 출력하게함
            ))}
            {wordList.map(word => (
                <span key={day.id}> {word.eng} : {word.kor} </span>
            ))}


        </>
    );
}
// ############ 라우터 구현 ################################################################################################

// npm install react-router-dom --save  // 라우팅구현도구 설치

import DayList from './component/DayList';  // App.js
import Header from './component/Header';
import Day from './component/Day';
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header /> {/* Routes외부는 공동으로 노출*/}
                <Routes> {/* Routes내부는 url에따라 다른 페이지를 보여줌*/}
                    <Route exact path='/' element={<DayList />} /> {/* 슬래시/는 첫페이지를 의미, exact path는 정확하게 슬래시가 일치할때만*/}
                    <Route path='/day/:day' element={<Day />} />{/* 콜론(:) 을붙여서 뒤에 day는 어떤값이 들어오든 변수로 가져감 */}
                    <Route path='/create_word' element={<CreateWord />} />
                    <Route element={<EmptyPage />} />{/* 나머지 라우팅 안된부분은 일로처리(항상 맨밑에다 작성할것)*/}
                </Routes>

            </div>
        </BrowserRouter>
    );
}

import { Link } from 'react-router-dom'; // DayList.js
import dummy from '../db/data.json'
export default function DayList() {
    return (
        <ul className='list_day'>
            {dummy.days.map(day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day{day.day} </Link>
                    {/* Link to로 url연결 (a href태그)X 실제론 a태그로 렌더링됨*/}
                    {/* JS포맷${day.day}로 day마다 링크가 바뀌도록 (useParams)로 가져옴*/}
                    {/* day.day Key 즉 value 1,2,3...을출력 // Map함수로 1,2,3...을 Day1, Day2, Day3으로 동시에 출력하게함 */}
                </li>
            ))}
        </ul>
    );
}

import dummy from '../db/data.json'; // Day.js
import { useParams } from 'react-router-dom';
export default function Day() {
    // dummy.words
    const day = useParams().day;  // useParams는 Url에 포함된 값을 객체형태로로 가져옴({day:1})
    const wordList = dummy.words.filter(word => (
        word.day === day
    )) // 현재 1일차거만 모은 리스트(페이지) 
    return <>
        <h2>Day {day}</h2>
        <table>
            <tbody>
                {wordList.map(word => (
                    <tr key={word.id}>
                        <td>
                            {word.eng}
                        </td>
                        <td>
                            {word.kor}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

import { Link } from 'react-router-dom';  // EmptyPage.js
export default function EmptyPage() {
    return (
        <>
            <h2>잘못된 접근입니다.</h2>
            <Link to="/">돌아가기</Link>
        </>
    );
}

// ############ 라우터 구현 및 쓸만한 연산자 #########################################################################################

// npm install -g json-server // json-server로 rest-API 설치
// json-server --watch ./src/db/data.json --port 3001    // restful api 구축 // json-server --watch + 경로 + 몇번 port에 

import Word from './Word'; // Day.js (Word 컴포넌트를 따로 만듬)
export default function Day() {
    // ...생략...
    <tbody>
        {wordList.map(word => (
            <Word word={word} key={word.id} />
        ))}
    </tbody>
    // ...생략...
}


import { useState } from "react"; // Word.js
export default function Word({ word }) {
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);
    function toggleShow() {
        setIsShow(!isShow) // !는 현재것의 반대값을 반환
    }
    function toggleDone() {
        setIsDone(!isDone)
    }
    return (
        <tr className={isDone ? 'off' : ''}> {/* isDone의 디폴트는 false 즉 테이블의 행이보임  */}
            <td><input type='checkbox' checked={isDone} onChange={toggleDone} /></td>{/* 누를때마다 toggleDone함수실행하여 체크박스와 테이블 행에 변화  */}
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>{/* 앞에것이 존재할때(참일때) 뒤에거도 보여짐*/}
            <td>
                <button onClick={toggleShow}>뜻 {(isShow) ? ` 가리기` : ` 보기`}</button> {/* isShow가 참이면 가리기가 출력 (삼항연산자) */}
                <button className='btn_del'>삭제</button>
            </td>
        </tr>
    );
}
// #### useEffect, fetch()로 API 호출 #######################################################################################

import { useEffect, useState } from 'react'; // DayList.js
import { Link } from 'react-router-dom';

export default function DayList() {
    const [days, setDays] = useState([]);
    useEffect(() => { // 어떤 상태값이 바뀌었을때 자동으로 동작하는 함수(디폴트는 전체)
        fetch('http://localhost:3001/days')
            .then(res => {
                return res.json();// html response를 json data로 반환
            })
            .then(data => {
                setDays(data); // json data를 useState를 통해 days로만듬
            });
    }, [])// 빈배열[]인경우 렌더링후 한번만 실행(실행되야 json정보를 가져오도록), 매개변수로 배열[count]를 전달하면 [count]가 변경될때만 함수실행

// async와 await를 이용한 방법
//     async () => {
//     const res = await fetch(`http://localhost:3001/days`);
//     const json = await res.json(); // async와 await를 이용하면 then을 안써도됨
//     setDays(json.data);
//   }

    return (
        <ul className='list_day'>
            {days.map(day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day{day.day} </Link>
                </li>
            ))}
        </ul>
    );
}


import { useParams } from 'react-router-dom'; // Day.js
import Word from './Word';
import { useEffect, useState } from 'react';

export default function Day() {
    const { day } = useParams();  // useParams는 Url에 포함된 값을 객체형태로로 가져옴({day:1})
    const [words, setWords] = useState([]);

    useEffect(() => { // 어떤 상태값이 바뀌었을때 자동으로 동작하는 함수(디폴트는 전체)
        fetch(`http://localhost:3001/words?day=${day}`) // ?day=${day}에 한 day값만 가져오도록
            .then(res => {
                return res.json(); // html response를 json data로 반환
            })
            .then(data => {
                setWords(data); // json data를 useState를 통해 words로만듬
            });
    }, [day])// 빈배열[]인경우 렌더링후 한번만 실행, 매개변수로 배열[day]를 전달하면 [day]가 변경될때만 함수실행

    const wordList = dummy.words.filter(word => (
        word.day === Number(day)
    )) // 현재 1일차거만 모은 리스트(페이지) 
    return <>
        <h2>Day {day}</h2>
        <table>
            <tbody>
                {wordList.map(word => (
                    <Word word={word} key={word.id} />
                ))}
            </tbody>
        </table>
    </>
}

// #### Custom hooks ##################################################################################################################
import { useEffect, useState } from "react";  // .hooks/useFetch.js
export default function useFetch(url) { // 자주사용하는 함수를 커스텀화 시킴
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data);
            });
    }, [url]);
    return data
}
// #### PUT, DELETE ##################################################################################################################

import { useState } from "react"; // word.js
export default function Word({ word: w }) { // word를 w라는 변수명으로 사용
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);
    // ... 생략 ...
    function toggleDone() {
        fetch(`http://localhost:3001/words/${word.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // 보내는 리소스의 타입을 지정함 (html, image, json 등)
            },
            body: JSON.stringify({ // body엔 수정을 위한 정보 입력
                ...word,
                isDone: !isDone,
            }),
        })
            .then(res => {
                if (res.ok) {
                    setIsDone(!isDone);
                }
            });
    }

    function del() {
        if (window.confirm('삭제 할거니?')) {
            fetch(`http://localhost:3001/words/${word.id}`, { // 데이터 삭제
                method: 'DELETE'
            }).then(res => {
                if (res.ok) {
                    setWord({ id: 0 }) // 단어삭제 실시간적용
                }
            })
        }
    }
    if (word.id === 0) { // 단어가 실시간으로 삭제될때 표 전체가 바로 삭제되려면 null이 되야함
        return null;
    }

    return (
        <tr className={isDone ? 'off' : ''}>
            <td><input type='checkbox' checked={isDone} onChange={toggleDone} /></td>
            {/* ... 생략 ... */}
            <td>
                <button onClick={toggleShow}>뜻 {(isShow) ? ` 가리기` : ` 보기`}</button> {/* 삼항연산자 */}
                <button onClick={del} className='btn_del'>삭제</button>
            </td>
        </tr>
    );
}

// #### Create, useNavigate, useRef ########################################################################################################

import './App.css'; // App.js
import DayList from './component/DayList';
import Header from './component/Header';
import Day from './component/Day';
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header /> {/* Routes외부는 공동으로 노출*/}
                <Routes> {/* Routes내부는 url에따라 다른 페이지를 보여줌*/}
                    <Route exact path='/' element={<DayList />} /> {/* 슬래시/는 첫페이지를 의미, exact path는 정확하게 슬래시가 일치할때만*/}
                    <Route path='/day/:day' element={<Day />} />{/* 콜론(:) 을붙여서 뒤에 day는 어떤값이 들어오든 변수로 가져감 */}
                    <Route path='/create_word' element={<CreateWord />} />
                    <Route path='/create_day' element={<CreateDay />} />
                    <Route element={<EmptyPage />} />{/* 나머지 라우팅 안된부분은 일로처리(항상 맨밑에다 작성할것)*/}
                </Routes>

            </div>
        </BrowserRouter>
    );
}


import { Link } from "react-router-dom"; // Header.js
export default function Header() {
    return (
        <div className="header">
            <h1>
                <Link to="/">토익 영단어(고급)</Link>
            </h1>
            <div className="menu">
                <Link to="/create_word" className="link">{/* 링크변경하여 라우팅 */}
                    단어 추가
                </Link>
                <Link to="/create_day" className="link">
                    Day 추가
                </Link>
            </div>
        </div>
    );
}


import { useRef } from "react";     // CreateWord.js
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateWord() {
    const days = useFetch('http://localhost:3001/days');
    const navigate = useNavigate(); // a태그사용없이 페이지를 전환시켜줌

    function onSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/words/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 보내는 리소스의 타입을 지정함 (html, image, json 등)
            },
            body: JSON.stringify({ // body엔 수정을 위한 정보 입력
                day: dayRef.current.value,// 하단에 dayRef=useRef(null) // current는 해당요소로접근 // value는 입력되있는 값
                eng: engRef.current.value,
                kor: korRef.current.value,
                isDone: false,
            }),
        })
            .then(res => {
                if (res.ok) {
                    alert('생성완료')
                    navigate(`/day/${dayRef.current.value}`) // useNavigate()에 입력한 주소로 이동시킴
                }
            });
    }
    const engRef = useRef(null); // useRef는 DOM에 접근하게함 (ex:스크롤위치확인, focus등)
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return (
        <form onSubmit={onSubmit}>{/*Submit될때마다 onSubmit함수를 실행*/}
            <div className="input_area">
                <label>Eng</label>
                <input type='text' placeholder="ex) computer" ref={engRef} />{/* useRef로인해 이 DOM에 접근시킴 */}
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type='text' placeholder="ex) 컴퓨터" ref={korRef} />
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button>저장</button>
        </form>
    )
}


import { useNavigate } from "react-router";  // CreateDay.js
import useFetch from "../hooks/useFetch"
export default function CreateDay() {
    const days = useFetch('http://localhost:3001/days');
    const navigate = useNavigate();

    function addDay() {
        fetch(`http://localhost:3001/days/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 보내는 리소스의 타입을 지정함 (html, image, json 등)
            },
            body: JSON.stringify({ // body엔 정보 입력
                day: days.length + 1,
            }),
        })
            .then(res => {
                if (res.ok) {
                    alert('생성완료')
                    navigate(`/`) // useNavigate()에 입력한 주소로 이동시킴
                }
            });
    }
    return (
        <div>
            <h3>현재일수 : {days.length}일</h3>
            <button onClick={addDay}>Day 추가</button>
        </div>
    )
}
// #### 로딩 ###############################################################################################################################

// DayList.js
// ...생략...
if (days.length === 0) { // 초기값이 빈배열이여서 그떄 로딩중이라는 메시지
    return <span>Loading...</span>
}
// ...생략...


//Day.js
// ...생략...
return <>
    <h2>Day {day}</h2>
    {words.length === 0 && <span>Loding...</span>}{/*처음에 로딩중 */}
    {/*...생략...*/}
</>


//CreateWord.js
// ...생략...
export default function CreateWord() {
    // ...생략...
    function onSubmit(e) {
        e.preventDefault();
        if (!isLoading) { // isLoding이 false인 경우만 사용
            setIsLoading(true); // setIsLoading을 if문 처음에 true, 끝에 false를 줌으로써 데이터생성중(로딩중)에는 다른 생성불가 
            fetch(`http://localhost:3001/words/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day: dayRef.current.value,
                    eng: engRef.current.value,
                    kor: korRef.current.value,
                    isDone: false,
                }),
            })
                .then(res => {
                    if (res.ok) {
                        alert('생성완료')
                        navigate(`/day/${dayRef.current.value}`)
                        setIsLoading(false);// setIsLoading을 if문 처음에 true, 끝에 false를 줌으로써 데이터생성중(로딩중)에는 다른 생성불가 
                    }
                });
        }
    }
    // ...생략...
    return (
        <form onSubmit={onSubmit}>{/*Submit될때마다 onSubmit함수를 실행*/}

            {/* ...생략... */}

            <button style={{
                opacity: isLoading ? 0.3 : 1,  // opacity로 흐리게 만들수있음 (로딩중이면 0.3)
            }}>{isLoading ? "Saving..." : "저장"}</button>{/* 로딩중이면 Saving...표시 */}
        </form>
    )
}

// #### UseReducer ###############################################################################################################################
// #### 은행 : input에 액수(number)를 입력한뒤 + or -를 누르면 계산됨(money) ########################################################################
import { useReducer, useState } from "react";

// reducer - state를 업데이트 하는 역할 (은행)
// dispatch - state 업데이트를 위한 요구
// action - 요구의 내용

const ACTION_TYPES = {
  deposit: 'deposit',
  withdraw: 'withdraw',
}

const reducer = (state, action) => {
  switch (action.type){
    case ACTION_TYPES.deposit:
      return state + action.payload;
    case ACTION_TYPES.withdraw:
      return state - action.payload;
    default:
      return state
  }
};

function App(){
  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0); // const [state, action] = useReducer(reducer함수, state초기값)
  return(
    <div>
      <p>잔고: {money}원</p>

      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} step="1000"/>
      
      <button onClick={()=>{
        dispatch({ type:ACTION_TYPES.deposit, payload: number })    // dispatch({ action.type, action.payload })
      }}>
        +
      </button>

      <button onClick={()=>{
        dispatch({ type:ACTION_TYPES.withdraw, payload: number })
      }}>
        -
      </button>
    </div>
  )
}

export default App;

// #### UseRef 1 ###############################################################################################################################
// #### useRef, useState 비교 ################################################################################################################
import { useRef, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0); // 초기값 0

  const addCountState = () => {
    setCount(count + 1);
  };

  const addCountRef = () => {
    countRef.current = countRef.current + 1;  //  값은 올라가지만 재렌더가 되지않음
  };

  return (<>
    <div>
      <p>State: {count}</p>
      <button onClick={addCountState}>State 올려</button>
    </div>
    <div>
      <p>State: {countRef.current}</p>
      <button onClick={addCountRef}>Ref 올려</button>
    </div>
  </>)
}

export default App;

// #### UseRef 2 ###############################################################################################################################
// #### Dom요소 접근 : 화면 들어올때 자동으로 커서가 text창에 ######################################################################################
import { useEffect, useRef } from 'react';

function App() {
  const inputRef = useRef();

  useEffect(()=>{
    inputRef.current.focus();
  }, []);

  const login = () =>{
    alert(`Hello ${inputRef.current.value}`);
  }

  return (<>
    <div>
      <input ref={inputRef} type='text' placeholder='username' />  {/* input정보가 inputRef에 담김 */}
      <button onClick={login}>로그인</button>
    </div>
  </>)
}

export default App;

// #### UseMemo ###############################################################################################################################
// #### 어려운계산기, 쉬운계산기 : 쉬운계산기 실행시 어려운계산기 실행은 하지않아 딜레이시간을 단축 ###################################################

import { useMemo, useState } from 'react';
const hardCalc = (num) =>{
  for(let i = 0; i < 999999999; i++) {} // 생각하는 시간
  return num + 100;
};

const easyCalc = (num) =>{
  return num + 1;
};

function App() {
  const [hardNum, setHardNum] = useState(1);
  const [easyNum, setEasyNum] = useState(1);

  const hardAdd = useMemo(()=>{
    return hardCalc(hardNum);
  },[hardNum]);  // 값이 변경 되지 않으면 캐시에 메모이제이션 되있는 값을 그대로 보여줌, 값이 변경될때만 실행 (객체타입 주소를 저장해둘때 유용하게 쓰임)

  const easyAdd = easyCalc(easyNum)
  
  return (<>
    <h3>어려운 계산기</h3>
    <input
    type='number'
    value={hardNum}
    onChange={(e) => setHardNum(parseInt(e.target.value))}
    />
    <span> + 100 = {hardAdd}</span>

    <h3>쉬운 계산기</h3>
    <input
    type='number'
    value={easyNum}
    onChange={(e) => setEasyNum(parseInt(e.target.value))}
    />
    <span> + 1 = {easyAdd}</span>
  </>)
}

export default App;

// #### UseCallback ###############################################################################################################################
// #### 박스크기와 테마변경  : 테마변경시에는 불필요하게 박스사이즈 변경하는 useEffect를 실행시키지 않음 ###################################################
// ############ App.js
import { useCallback, useState } from 'react';
import Box from './Box';

function App() {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: 'pink',
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);  // 함수의 주소를 메모이제이션 해둠으로 변경 없이 재실행됨을 방지 (함수도 객체타입에 속함)

  return (<>
    <div style={{ background: isDark ? 'black' : 'white' }}>
      <input type='number' value={size} onChange={(e) => setSize(e.target.value)} />
      <button onClick={() => setIsDark(!isDark)}>테마변경</button>
      <Box createBoxStyle={createBoxStyle} />
    </div>
  </>)
}

export default App;

// ############ Box.js
import React from 'react'
import { useState, useEffect } from 'react';

function Box({ createBoxStyle }) {
    const [style, setStyle] = useState({});

    useEffect(() => {
        console.log('박스사이즈변경시 O, 테마변경시 X')
        setStyle(createBoxStyle());
    }, [createBoxStyle])

    return (
        <div style={style}></div>
    )
}

export default Box

// #### React.memo (useMemo, useCallback의 활용) ################################################################################################
// #### 1) 같은 props로 자주렌더링될때, 2) 렌더링 될때마다 복잡한로직이 처리될때 만 사용 #############################################################
// ############ App.js
import { useState, useMemo, useCallback } from 'react';
import Child from './Child';

function App() {
  const [parentAge, setParentAge] = useState(0);
  const [childAge, setChildAge] = useState(0);

  const increaseParentAge = () => {
    setParentAge(parentAge + 1);
  };

  const increaseChildAge = () => {
    setChildAge(childAge + 1);
  };
  
  const name = useMemo(() => {  // 리턴할 객체(객체타입)의 주소를 저장
    return {
      lastName: '홍',
      firstName: '길동',
    };
  }, []);

  const tellme = useCallback(() => { // 함수(객체타입)의 주소를 저장
    console.log('길동아!!')
  }, []);

  console.log("부모 컴포넌트 렌더링");
  return (<>
    <h1>부모</h1>
    <p>age : {parentAge}</p>
    <button onClick={increaseParentAge}>부모 나이 증가</button>
    <button onClick={increaseChildAge}>자녀 나이 증가</button>
    <Child name={name} age={childAge} tellme={tellme} />
  </>)
} // name은 useMemo, tellme는 useCallback을 사용하여서 Props가 바뀌지 않는 것으로봄
export default App;


// ############ Child.js
import React, { memo } from 'react'

function Child({ name, age, tellme }) {
    console.log('자녀 컴포넌트 렌더링')

    return (
        <div style={{ border: '2px solid blue', padding: '10px' }}>
            <h3>자녀</h3>
            <p>lastName : {name.lastName}</p>
            <p>firstName : {name.firstName}</p>
            <p>age : {age}</p>
            <button onClick={tellme}>tellme</button>
        </div>
    )
}

export default memo(Child); // props에 변화가 없는경우 재랜더링이 되지않도록 메모제이션 되있는 기존 컴포넌트 사용

// ###############################################################################################################################
// ########## 기타 React 유용한것들 ################################################################################################
// ###############################################################################################################################
// ######## Async(로딩)중일때 대비 #################################################################################################
import React, { Suspense } from 'react'

<Suspense fallback={null}>
  <Model />
</Suspense>


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

// ######## scroll 할때마다 scrollY 변경 (스크롤할때마다 실시간으로 출력) #################################################################
// ScrollY value for Cart
    const [scrollYValue, setScrollYValue] = useState(window.scrollY)
    
    window.addEventListener('scroll', () => {
        setScrollYValue(window.scrollY)
    })

console.log("scrollYValue--------->",scrollYValue)

// ######## scroll의 위치 좌표 변경 #################################################################
    <button onClick={()=>{ window.scrollTo({ top: 0, behavior: "smooth" })}}>zzz</button>
    // window.scrollTo(0,0); 이런식으로도 가능

// ######## 404 Notfound page(only for react) #################################################################
{/* 404, unmatched with any routes (always very bottom)*/}
<Route path='*' element={<EmptyPage />} />  // 라우트 맨하단에 작성해야함

// ######## Netlify 배포후 새로고침시 에러 방지#################################################################################################
// "_redirects" 이라는 이름을 가진 폴더안에 "/* /index.html 200" 이와같이 적은후 index.html파일이있는 public폴더에 보관한다

    
// ######## pathname 혹은 쿼리 생성 ####################################################################################################
window.location.href = 'portfolio1/about' // http://localhost:3000/portfolio1/about 로 보내버림

// ######## 주소창에 쿼리 (useSearchParams) #################################################################################################
// ######## 쿼리 만들어 주소창에 보내기
import { useSearchParams } from 'react-router-dom';
const [searchParams, setSearchParams] = useSearchParams();
const doSearch = (e) => {
        const currentQuery = e.target.search.query.toString();  // search에 들어가 있는 내용
        setSearchParams({
            filter: currentQuery,
        });
    };
return(
        <form onSubmit={doSearch}>
                <div>
                    <span>
                        <input type="search" name="search" placeholder="Search" /> // name(search)이 쿼리 네임
                    </span>
                    <button type='submit' className={`${styles.searchIcon} material-icons-outlined`}>
                        search
                    </button>
                </div>
        </form>
)

// ######## 주소창에 쿼리 가져오기
searchParams.get('search'))     // 키워드 저장 '?search='

// ####### 주소창에 params 가져오기############################################################################################
// ####### 라우터
// <Route path='/memorize/:day' element={<Day userObj={userObj} btnClass={btnClass} />} />

// ####### 
import { useParams } from 'react-router-dom';

const { day } = useParams();  // UseParams 는 url에 params값을 가져 // nextJS는 매개변수로 가져
<Route path='/memorize/:day' element={<Day userObj={userObj} btnClass={btnClass} />} /> // 

// ####### Link의 특정 앵커로 보내기 (HashLink) ##################################################################################################
import { HashLink as Link } from 'react-router-hash-link';

<Link smooth to='/category#1' state={{ category: "MENS" }}>     // smooth 는 스크롤을 스무스하게
    <li>
        Mens
    </li>
</Link>

// ####### category.jsx
<div id={product.id}>   
    Here
</div>


// ####### 링크시 특정 스타일 주기 (NavHashLink)
import { NavHashLink } from 'react-router-hash-link';
<NavHashLink to="/some/path#1" activeClassName="selected" activeStyle={{ color: 'red' }} >링크</NavHashLink>

// ####### Link 이동할때 특정 state같이 보내기 (useLocation) ##################################################################################################
// ####### Link
import { Link } from 'react-router-dom';
<Link to='/category' state={{ category: "man" }}>
    <li>
        For man
    </li>
</Link>

// ####### Link를 통해 보낸 state 출력
import { useLocation } from 'react-router-dom';

const location = useLocation(); 
console.log(location?.state?.category)

// ####### React.lazy()와 Suspense  ##############################################################################################################################
// React.lazy는 로딩이 오래걸릴 것 같은 컴포넌트의 로딩 시점을 지연시켜, 초기 로딩 속도를 줄일 수 있습니다.
// 즉 그 이후의 것을 먼저 화면에 렌더링 해주고 불러온다, 이떄 Suspense와 같이 이용해 줘야 컴포넌트를 불러오기 전 "로딩중"과 같은 대체정보를 출력하게 해준다.

// #######
const MyComponent = React.lazy(() => import('./MyComponent')); // 동적으로 컴포넌트를 불러옴
import React, { Suspense } from 'react';

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}

// ####### useTransition, useDeferredValue #######################################################################################################################
// 비동기적인 작업이 수행되어 여러가지 작업이 동시 처리되어 버벅거릴 때 잠시 화면상의 변화가 일어나지 않도록 설정할 수 있습니다. 이를 통해 UX을 개선할 수 있습니다

// ####### useTransition 예시
import { useTransition, useState } from "react";
const [name, setName] = useState('')
const [startTransition, isPending] = useTransition({ timeoutMs });  // timeoutMs는 사용하지 않아도 됨

return(<>
    <input onChange={(e)=>{
        startTransition(()=>{       // startTransition으로 성능저하를 일으키는 부분을 감싸기 (startTransition안에 있는 부분을 동시처리하는게 아니라 좀 늦게처리함)
            setName(e.target.value)
      })
    }} />
    {
        isPending ? "로딩중" : <div>{name}</div>   // startTransition부분이 여전히 처리되고 있을때 isPending이 참이됨
     }
</>)

// ####### useDeferredValue 예시
import { useDeferredValue } from "react";
const deferredValue = useDeferredValue(value, { timeoutMs });  // value가 변할때 같은 값을 좀 늦게처리하여 deferredValue에 전달 // timeoutMs는 사용하지 않아도 됨
