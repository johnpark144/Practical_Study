import { useState } from "react";
import { connect } from 'react-redux';
import ToDo from "./ToDo";
import { addToDo } from "./store";
// import { actionCreators } from "./store";
import Characters from "./Characters";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient()

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
                {toDos.map(toDo => (
                    <ToDo {...toDo} key={toDo.id} />
                ))}
            </ul>
            <QueryClientProvider client={queryClient}>  {/* 리액트쿼리 사용 가능범위 */}
                <Characters />
            </QueryClientProvider>
        </>
    );
}

// state를 가진 함수 (value를가진 key를 connect를통에 Home에 전달) // function 이름은 바꿔도 무난함
function mapStateToProps(state, ownProps) {
    return {
        toDos: state
    };
}

// dispatch를 가진 함수 (value를가진 key를 connect를통에 Home에 전달)
function mapDispatchToProps(dispatch, ownProps) {
    return {
        addToDo: text => dispatch(addToDo(text))
        // addToDo: text => dispatch(actionCreators.addToDo(text)) 
    }; // 리덕스 : dispatch(action) // 리덕스 툴킷 : dispatch(action(action.payload))
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// connect의 첫번째 함수인자(mapStateToProps)는 store의 state를 인자로 가졌고 리턴값을 Home의 props로 준다 (두번째인자로 ownProps)
// connect의 두번째 함수인자(mapDispatchToProps)는 store의 dispatch를 인자로 가졌고 리턴값을 Home의 props로 준다 (두번째인자로 ownProps)