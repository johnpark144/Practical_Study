// ####### React-app 1 ######################################################################################################
// ###########################################################(nodejs 명령어:npx,npm)##########################################
// npx create-react-app my-app //  (my-app)이라는 프로젝트 생성, 현재 디렉토리에 만들때는 my-app대신 . 찍어줌 (powershell x)
// npm start //  서버동작

// npm run build // 배포판을 만들게 해줌
// npx serve -s build // build폴더에 index.html을 서비스하는 웹서버가 실행

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

index.js 파일
import reporwebvital
root.render안에 React태그
.StrictMode
render이후

App.js 파일 
import logo from './logo.svg';
import './App.css';
return내용들

// ####### Component (사용자 정의 태그) #####################################################################################
function Header() { // 함수인데 대문자로
    return <header>
        <h1><a href='/'>WEB</a></h1>
    </header>
} // 태그는 하나만 return가능 (태그하나에 여러태그는 가능)

function App() {
    return (
        <Header></Header> // 위에 'Header'라는 함수 불러올때
    )
}
// ####### PROP (속성) #######################################################################################################
function Header(props) {      // function Nav({ title }) 로 써도됨 (props.title)
    return <header>
        <h1><a href='/'>{props.title}</a></h1>  // 만약 인자를 ({ title })로 받은경우 props.title이 아닌 그냥 title
    </header> // {}는 JS 표현식으로 취급
}
Header.propTypes = {
    title: PropTypes.string.isRequired, // PropTypes.string만쓰면 문자열와야되는데 비워둘순있음(PropTypes 종류 참고)
}
function App() {
    return (
        <Header title="React"></Header> // Header함수에 props 인자에 들어감
    )
}

// ############################################################################################# 리스트 PROP ##################
function Nav(props) {
    const lis = []
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}><a href={'/read/' + t.id}>{t.title}</a></li>) // 반복문안에서 key라는 고유값을 가져야함
    }
    return <nav>
        <ol>
            {lis}
        </ol>
    </nav>
}
function App() {
    const topics = [
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' },
        { id: 3, title: 'js', body: 'js is...' }
    ]
    return (
        <div>
            <Header title="React"></Header>
            <Nav topics={topics}></Nav>
            <Article title="Welcome" body="hello, web"></Article>
        </div> // Nav함수에 topics리스트 전달
    );
}

// ########### 이벤트 ###########################################################################################################
function Header(props) {
    return <header>
        <h1><a href='/' onClick={(e) => {
            e.preventDefault(); // 기본동작 방지
            props.onChangeMode(); // onChangeMode 함수실행
        }}>{props.title}</a></h1>
    </header>
}

function App() {
    // ...생략...
    return (
        <div>
            <Header title="Web" onChangeMode={() => { alert('header') }}></Header>
            <Nav topics={topics}></Nav>
            <Article title="Welcome" body="hello, web"></Article>
        </div>
    );
}
// ########### State ###############################################################################################################
import { useState } from 'react';

function Nav(props) {
    const lis = []
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}>
            <a id={t.id} href={'/read/' + t.id} onClick={(e) => {
                e.preventDefault();
                props.onChangeMode(Number(e.target.id)); // id를 태그에서 가져오면 문자열로 되있기 때문에 정수형으로 변환
            }}>{t.title}</a></li>)
    }
    return <nav>
        <ol>
            {lis}
        </ol>
    </nav>
}

function App() {
    const [mode, setMode] = useState('welcome');
    // mode = useState('welcome')[0] 은 'wellcome'(초기값)
    // setMode() = useState('welcome')[1] 은 나중에 변경될값, 변경된뒤 [0]도 같이 변경됨
    const [id, setId] = useState(null);

    const topics = [
        { id: 1, title: 'html', body: 'html is...' },
        { id: 2, title: 'css', body: 'css is...' },
        { id: 3, title: 'js', body: 'js is...' }
    ]
    let content;

    if (mode === 'welcome') {
        content = <Article title="welcome" body="hello, web"></Article>

    } else if (mode === 'read') {
        let title, body;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>
    }

    return (
        <div>
            <Header title="Web" onChangeMode={() => {
                setMode('welcome');
            }}></Header>
            <Nav topics={topics} onChangeMode={(_id) => {
                setMode('read');
                setId(_id);
            }}></Nav>
            {content}
        </div>
    );
}

// ################################################################################### 단위변환기 (State 연습 from 노마드강의) ##############


function KmToMiles(){
//  ... 비슷해서 생략 ...
}

function MinutesToHours() {
  const [amount, setAmount] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const onChange = (e) => {
    setAmount(e.target.value);
  };
  const reset = () => setAmount(0);
  const onFlip = () => {
    flipped ? setAmount(amount*60) : setAmount(amount/60);
    setFlipped((current) => !current);
  }
  return <>
    <div>
      <label htmlFor='minutes'>Minutes</label>
      <div>
        <input
          value={flipped ? amount*60 : amount}
          id='minutes'
          placeholder='Minutes'
          type="number"
          onChange={onChange}
          disabled={flipped}
        />
      </div>
      <label htmlFor='hours'>Hours</label>
      <div>
        <input
          value={flipped ? amount : amount/60}
          id='hours'
          placeholder='Hours'
          type="number"
          onChange={onChange}
          disabled={!flipped}
        />
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={onFlip}>Flip</button>
    </div>
  </>
}

function App() {
//  ... 생략 ...
  const [index, setIndex] = useState(0);
    
  const onSelect = (e) =>{
    setIndex(e.target.value) // index를 밑에서 받아온 option value로
  }
  return (
    //  ... 생략 ...
      <h1>Super Converter</h1>
      <select onChange={onSelect}> // 옵션 선택시 onChange가 발생하여 onSelect 함수실행 
        <option value="0">select what to convert</option>
        <option value="1">Minutes & Hours</option>
        <option value="2">Km & Miles</option>
      </select>
      {index === '0' ? <p>select what to convert</p> : null} // index의 변경에 따라 
      {index === '1' ? <MinutesToHours /> : null}
      {index === '2' ? <KmToMiles /> : null}
    //  ... 생략 ...
  )
}
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
