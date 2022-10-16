import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateWord() {
    const days = useFetch('http://localhost:3001/days');
    const navigate = useNavigate(); // a태그사용없이 페이지를 전환시켜줌
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e) {
        e.preventDefault();

        if (!isLoading) { // isLoding이 false인 경우만 사용
            setIsLoading(true); // setIsLoading을 if문 처음에 true, 끝에 false를 줌으로써 데이터생성중(로딩중)에는 다른 생성불가 
            fetch(`http://localhost:3001/words/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 보내는 리소스의 타입을 지정함 (html, image, json 등)
                },
                body: JSON.stringify({ // body엔 정보 입력
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
                        setIsLoading(false);
                    }
                });
        }

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
            <button style={{
                opacity: isLoading ? 0.3 : 1,  // opacity로 흐리게 만들수있음 (로딩중이면 0.3)
            }}>{isLoading ? "Saving..." : "저장"}</button>{/* 로딩중이면 Saving...표시 */}
        </form>
    )
}