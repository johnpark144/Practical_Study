// npm install redux  // 기본 redux
// npm install react-redux  // react에서 사용할 redux
// npm install @reduxjs/toolkit // reduxTK

// ###### Redux로 ToDo ####################################################################################################################################
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


// ###### Redux Toolkit로 ToDo ####################################################################################################################################
// ################### store.js

import { legacy_createStore as createStore} from 'redux';
import { createAction } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");    // createAction(type) // addToDo.type == 'ADD'
const deleteToDo = createAction("DELETE");

const reducer = (state = [], action) => {
    switch (action.type){
        case addToDo.type:
            return [ { text: action.payload, id: Date.now() }, ...state ];
        case deleteToDo.type:
            return state.filter(toDo => toDo.id !== action.payload);
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
