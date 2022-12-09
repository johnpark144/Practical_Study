import React, { useRef, useState, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

// 타입 및 인터페이스
type Props = {
  idx: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

// ############## export 디폴트 함수 ##############
const SingleTodo = ({ idx, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // IsDone
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // 삭제
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 수정
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null); // input의 DOM의 타입

  // 수정 시작시 커서
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    // Draggable 드래그 할 박스
    <Draggable draggableId={todo.id.toString()} index={idx}> 
      {(provided, snapshot) => (  
        <form 
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            // 수정모드인 경우
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            // 일반모드 Isdone된경우
            <s className="todos__single--text">{todo.todo}</s> // s태그는 텍스트 가운데 선긋기
          ) : (
            // 일반모드 Isdone안된경우
            <span className="todos__single--text">{todo.todo}</span>
          )}
          {/* 아이콘 */}
          <div>
            {/* 수정 아이콘 */}
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            {/* 삭제 아이콘 */}
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            {/* 체크 아이콘 */}
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
