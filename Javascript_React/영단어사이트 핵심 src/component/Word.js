import { useState } from "react";

export default function Word({ word:w }) { // word를 w라는 변수명으로 사용
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    function toggleShow() {
        setIsShow(!isShow) // !는 현재것의 반대값을 반환
    }
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
            }).then(res=>{
                if(res.ok){
                    setWord({id: 0}) // 단어삭제 실시간적용
                }
            })
        }
    }
    if (word.id === 0){ // 단어가 실시간으로 삭제될때 표 전체가 바로 삭제되려면 null이 되야함
        return null;
    }

    return (
        <tr className={isDone ? 'off' : ''}>
            <td><input type='checkbox' checked={isDone} onChange={toggleDone} /></td>{/*isDone이 참이면 체크*/}
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>{/* 앞에게 존재할때(참일때) 뒤에거도 보여짐*/}
            <td>
                <button onClick={toggleShow}>뜻 {(isShow) ? ` 가리기` : ` 보기`}</button>{/* 삼항연산자 */}
                <button onClick={del} className='btn_del'>삭제</button>
            </td>
        </tr>
    );
}