import React, { useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import "./App.css";

// ############## export 디폴트 함수 ##############
const App: React.FC = () => { // React.FC 는 리액트 함수형 컴포넌트의 타입
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => { // React.FormEvent는 event의타입
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  // 드래그앤 드롭
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
  }

  return (
    // Drag and Drop 사용 전체범위
    <DragDropContext onDragEnd={onDragEnd}> {/* DragDropContext 사용 전체범위, (onDragEnd는 드롭했을때 발생) */}
      <div className="App">
        <span className="heading">Taskify</span>
        {/* Task 입력창 */}
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        {/* Active Tasks와 Completed Tasks */}
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
      </div>
    </DragDropContext>
  );
};

export default App;
