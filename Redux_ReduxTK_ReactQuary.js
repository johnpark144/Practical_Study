// npm install redux  // 기본 redux
// npm install react-redux  // react redux
// npm install @reduxjs/toolkit // reduxTK

// npm install react-query  // reactquery

// ####### 노마드코더 ToDolist만들기 ##############################################################################################################################
// ###### Redux (with connect) #####################################################################################################################################
// ################## index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} > 
    <App />
  </Provider>
); // Provider안에 있는 모든 컴포넌트에 store를 제공

 // ################### App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

 // ################### store.js
import { legacy_createStore as createStore } from 'redux';

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
    return{
        type: ADD,
        text
    };
};

const deleteToDo = (id) => {
    return{
        type: DELETE,
        id : parseInt(id)
    };
};

const reducer = (state = [], action) => {
    switch (action.type){
        case ADD:
            return [ { text: action.text, id: Date.now() }, ...state ];
        case DELETE:
            return state.filter(toDo => toDo.id !== action.id);
        default:
            return state;
    }
};

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo
}

export default store;

 // ################### Home.js
import { useState } from "react";
import { connect } from 'react-redux';
import { actionCreators } from "./store";
import ToDo from "./ToDo";

function Home({ toDos, addToDo }) {
    const [text, setText] = useState("");

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addToDo(text);
        setText("");
    }

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type='text' value={text} onChange={onChange} />
            </form>
            <ul>
                {toDos.map(toDo =>(
                    <ToDo {...toDo} key={toDo.id} />
                ))}
            </ul>
        </>
    );
}

// state를 가진 함수 (value를가진 key를 connect를통에 Home에 전달) // function 이름은 바꿔도 무난함
function mapStateToProps(state, ownProps){
    return { 
        toDos : state
    };
} 

// dispatch를 가진 함수 (value를가진 key를 connect를통에 Home에 전달)
function mapDispatchToProps(dispatch, ownProps){
    return {
        addToDo: text => dispatch(actionCreators.addToDo(text)) 
    }; // 리덕스 : dispatch(action) // 리덕스 툴킷 : dispatch(action(action.payload))
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// connect의 첫번째 함수인자(mapStateToProps)는 store의 state를 인자로 가졌고 리턴값을 Home의 props로 준다 (두번째인자로 ownProps)
// connect의 두번째 함수인자(mapDispatchToProps)는 store의 dispatch를 인자로 가졌고 리턴값을 Home의 props로 준다 (두번째인자로 ownProps)

 // ################### ToDo.js
import React from "react";
import { connect } from "react-redux"
import { actionCreators } from "./store";
import { Link } from "react-router-dom";

function ToDo({ text, onBtnClick, id }) {
    return (
        <li>
            <Link to={`/${id}`}>
                {text}
            </Link>
            <button onClick={onBtnClick}>Del</button>
        </li>
    )
}

// store에 정보를 전달
function mapDispatchToProps(dispatch, ownProps) {
    return {
        onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
    };
}

export default connect(null, mapDispatchToProps)(ToDo);


// ###### Redux Toolkit 으로 ToDolist ##############################################################################################################################
// ################### store.js

import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");    // createAction(type) // addToDo.type == 'ADD'
const deleteToDo = createAction("DELETE");

const reducer = createReducer([],(builder) => {
    builder
    .addCase(addToDo, (state, action) => {
        state.push({ text: action.payload, id: Date.now() });
    })// Mutate 가능  // mutate하는 경우 return 하지않아도 Immer에서 알아서 작동시켜줌
    .addCase(deleteToDo, (state, action) => 
        state.filter(toDo => toDo.id !== action.payload) 
    )// mutate이 아닌 새로운 state를 생성 하는 경우 return해줘야 하는데 JS에선 한줄짜리 식은 중괄호 빼면 자동 return
})  

const store = configureStore({ reducer });

export const actionCreators = {
    addToDo,
    deleteToDo
}

export default store;

// ###################  그외 builder callback 예시
    // addMatcher로 특정한경우에만 실행
    // .addMatcher(
    //     (action) => action.type.endsWith('t'),   // t로 끝나는경우만 밑에 state를 mutate시키거나 return해서 새로생성
    //     (state) => state + 2
    //   )

    // addDefaultCase로 일치하는 액션타입이 없는경우 디폴트 지정
    // .addDefaultCase(()=>[])  // 빈배열을 state로 리턴
    
// ###### Redux Toolkit (with CreateSlice) 으로 ToDolist #########################################################################################################
// ################### store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
    name: "toDosReducer",
    initialState: [],
    reducers:{
        addToDo: (state, action) => {
            state.push({ text: action.payload, id: Date.now() });
        },
        deleteToDo: (state, action) => state.filter(toDo => toDo.id !== action.payload) 
    }
});

export const { addToDo, deleteToDo } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });

// ################### Home.js
import { addToDo } from "./store";
// actionCreators의 흔적을 지워줌

// ################### ToDo.js
import { deleteToDo } from "./store";
// actionCreators의 흔적을 


// ####### 생활코딩 async fetch 버튼 #####################################################################################################################
// ####### Redux Toolkit-thunk(비동기작업) with useDispatch, useSelector (no connect) ####################################################################
// ################### index.js (범위 부분)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

// ################### store.js (slice 저장소 부분)
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from './counterSlice';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

export default store;

// ################### App.js(작동하는 부분)
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { up } from './counterSlice';
import { asyncUpFetch } from './counterSlice'

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => {
    return state.counter.value;
  });
  const status = useSelector(state => {
    return state.counter.status;
  });

  return (<>
    <button onClick={() => {
      dispatch(up(2));
    }}>+</button>

    <button onClick={() => {
      dispatch(asyncUpFetch());
    }}>+ async fetch </button>
    <br/>

    <div>{count} | {status} </div>
  </>);
}

export default App;

// ################### counterSlice.js (createAsyncThunk, slice부분)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch',
  async () => {
    const resp = await fetch('https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits')
    const data = await resp.json();
    return data.value;
  }
)

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: { value: 0, status: 'welcome' },
  reducers: { // 동기적
    up: (state, action) => {
      state.value = state.value + action.payload;
    }
  },
  extraReducers: (builder) => { // 비동기적
    builder
      .addCase(asyncUpFetch.pending, (state, action) => {
        state.status = 'Loading';
      })
      .addCase(asyncUpFetch.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = 'Complete';
      })
      .addCase(asyncUpFetch.rejected, (state, action) => {
        state.status = 'Fail';
      })
  }
})

export default counterSlice;
export const { up } = counterSlice.actions;
export { asyncUpFetch }


// ########################################################################################################################################################
// ###### ReactQuary ######################################################################################################################################
// ################### Characters.js

import React from 'react';
import { useQuery } from "react-query";

function Characters() {

  const fetchCharacters = async () => {
    const response = await fetch("http://rickandmortyapi.com/api/character")
    return response.json();
  };

  const { data, status } = useQuery("characters", fetchCharacters); // useQuery("키", 데이터불러올함수)

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error</div>;
  }

  return (
    <div>
      {data.results.map(character => (
        <div key={character.id}>
          <img src={character.image} alt='' />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default Characters

// ################### Home.js

import Characters from "./Characters";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient()   // export default밖에서

function Home() {
// ...생략...
return (
<QueryClientProvider client={queryClient}>
    <Characters />
</QueryClientProvider>
);
}
export default Home;

// ################################################################################################################# 페이지네이션 with ReactQuary  ###############
// ################### Characters.js

import React, { useState } from 'react';
import { useQuery } from "react-query";

function Characters() {
  const [page, setPage] = useState(1)

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(`http://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
    return response.json();
  };

  // useQuery("queryKey(고유키)", 데이터불러올함수)
  const { data, status, isPreviousData, isLoading, isError } = useQuery(["characters", page], fetchCharacters, // error, isFetching, isSuccess 등 
  {  
    keepPreviousData: true, // 다음 fetch시까지 이전 데이터들로 일처리함
  }); // onSuccess, onError, onSettled : 성공,실패,완료시 sideEffect 정의가능
  // enabled : 자동실행할지여부, retry : 동작실패시 자동 retry여부, refetchInterval : 주기적으로 refetch여부

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const paginations = [...Array(data?.info.pages)]  // [...Array(number)] 숫자만큼배열을 만들어줌

return (<>
{/* 페이지네이션 */}
    <button disabled={page === 1} onClick={() => setPage(page - 1)} 
    style={{ cursor: "pointer", height: "30px" }}>
      Previous
    </button>
    {paginations.map((x, idx) => (
      idx + 1 === page ? (
        <button key={idx + 1}
          style={{ border: "1px solid blue", color: "black", backgroundColor: "blue", cursor: "pointer", height: "30px" }}
          onClick={() => { setPage(idx + 1) }} >
          {idx + 1}
        </button>
      ) : (
        idx - 4 < page && page < idx + 6 ? (
          <button key={idx + 1}
            style={{ border: "1px solid gray", color: "gray", cursor: "pointer", height: "30px" }}
            onClick={() => { setPage(idx + 1) }} >
            {idx + 1}
          </button>
        ) : (
          ""
        )
      )
    ))}
    <button disabled={ isPreviousData && (page === data?.info.pages) } onClick={() => setPage(page + 1)} 
    style={{ cursor: "pointer", height: "30px"  }}>
      Next
    </button>
    {/* 캐릭터 이미지와 이름 */}
    <div>
      {data.results.map(character => (
        <div key={character.id}>
          <img src={character.image} alt='' />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  </>)
}

export default Characters


