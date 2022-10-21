import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch"

export default function CreateDay(){
    const days = useFetch('http://localhost:3001/days');
    const navigate = useNavigate();
    
    function addDay(){
        fetch(`http://localhost:3001/days/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 보내는 리소스의 타입을 지정함 (html, image, json 등)
            },
            body: JSON.stringify({ // body엔 정보 입력
                day : days.length + 1,
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
