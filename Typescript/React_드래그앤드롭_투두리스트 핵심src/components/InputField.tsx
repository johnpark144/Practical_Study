import React, { useRef } from "react";

// 타입 및 인터페이스
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>; // useState의 setTodo부분 타입 (마우스올려서 확인가능)
  handleAdd: (e: React.FormEvent) => void; // void는 리턴값이 없는 함수 형태의 타입
}

// ############## export 디폴트 함수 ##############
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null); // uref부분의 타입 (마우스올려서 확인가능)
  
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur(); {/* blur는 검색창에서 커서 X */}
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        placeholder="Enter a task"
        className="input__box"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
