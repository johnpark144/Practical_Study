//##################################### 일반 리덕스 #########################################
// import { legacy_createStore as createStore} from 'redux';
// import { createAction, createReducer } from "@reduxjs/toolkit";

// const ADD = "ADD";
// const DELETE = "DELETE";

// const addToDo = (text) => {
//     return{
//         type: ADD,
//         text
//     };
// };

// const deleteToDo = (id) => {
//     return{
//         type: DELETE,
//         id : parseInt(id)
//     };
// };

// const reducer = (state = [], action) => {
//     switch (action.type){
//         case ADD:
//             return [ { text: action.text, id: Date.now() }, ...state ];   // Mutate 불가능
//         case DELETE:
//             return state.filter(toDo => toDo.id !== action.id);
//         default:
//             return state;
//     }
// };

// const store = createStore(reducer);

// export const actionCreators = {
//     addToDo,
//     deleteToDo
// }

// export default store;

//##################################### 리덕스 툴킷 #########################################
// import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

// const addToDo = createAction("ADD");    // createAction(type) // addToDo.type == 'ADD'
// const deleteToDo = createAction("DELETE");

// const reducer = createReducer([],(builder) => {
//     builder
//     .addCase(addToDo, (state, action) => {
//         state.push({ text: action.payload, id: Date.now() });
//     })// Mutate 가능  // mutate하는 경우 return 하지않아도 Immer에서 알아서 작동시켜줌
//     .addCase(deleteToDo, (state, action) => 
//         state.filter(toDo => toDo.id !== action.payload) 
//     )// mutate이 아닌 새로운 state를 생성 하는 경우 return해줘야 하는데 JS에선 한줄짜리 식은 중괄호 빼면 자동 return

//     // 그외 예시
//     // addMatcher로 특정한경우에만 실행하게 가능
//     // .addMatcher(
//     //     (action) => action.type.endsWith('t'),   // t로 끝나는경우만 밑에 state를 mutate시키거나 return해서 새로생성
//     //     (state) => state + 2
//     //   )

//     // addDefaultCase로 일치하는 액션타입이 없는경우 디폴트 지정
//     // .addDefaultCase(()=>[])  // 빈배열을 state로 리턴
// })  

// const store = configureStore({ reducer });

// export const actionCreators = {
//     addToDo,
//     deleteToDo
// }

// export default store;

//##################################### 리덕스 툴킷(Create Slice) #########################################

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

