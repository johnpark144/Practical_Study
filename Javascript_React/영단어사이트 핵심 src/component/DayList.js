import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function DayList() {
    const days = useFetch('http://localhost:3001/days') // 커스텀된 함수

    // const [days, setDays] = useState([]);
    // useEffect(() => { // 어떤 상태값이 바뀌었을때 자동으로 동작하는 함수(디폴트는 전체)
    //     fetch('http://localhost:3001/days')
    //     .then(res => {
    //         return res.json();// html response를 json data로 반환
    //     })
    //     .then(data =>{
    //         setDays(data); // json data를 useState를 통해 days로만듬
    //     });
    // }, [])// 빈배열[]인경우 렌더링후 한번만 실행(실행되야 json정보를 가져오도록),매개변수로 배열[count]를 전달하면 [count]가 변경될때만 함수실행

    if (days.length === 0){ // 초기값이 빈배열이여서 그떄 로딩중이라는 메시지
        return<span>Loading...</span>
    }

    return (
            <ul className='list_day'>
                {days.map(day => (
                    <li key={day.id}>
                        <Link to={`/day/${day.day}`}>Day{day.day} </Link>
                        {/* Link to로 url연결 (a href태그)X 실제론 a태그로 렌더링됨*/}
                        {/* JS포맷${day.day}로 day마다 링크가 바뀌도록 */}
                        {/* day.day Key 즉 value 1,2,3...을출력 // Map함수로 1,2,3...을 Day1, Day2, Day3으로 동시에 출력하게함 */}
                    </li>
                ))}
            </ul>
    );
}
