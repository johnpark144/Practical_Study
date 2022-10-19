import { Link, useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch';

export default function Day() {
    const { day } = useParams();  // useParams는 Url에 포함된 값을 객체형태로로 가져옴({day:1})
    const words = useFetch(`http://localhost:3001/words?day=${day}`) // 커스텀 함수
    const days = useFetch('http://localhost:3001/days');

    return <>
        <div className='back_next'>
            <span>
                {Number(day) - 1 > 0 ? <Link to={`/day/${Number(day) - 1}`}>Previous</Link> : <span className='marginL'/>}
            </span>
            <span>Day {day}</span>
            <span>
                {Number(day) < days.length ? <Link to={`/day/${Number(day) + 1}`}>Next</Link> : <span className='marginR'/>}
            </span>
        </div>

        {words.length === 0 && <span>Loding...</span>}{/*처음에 로딩중 */}
        <table>
            <tbody>
                {words.map(word => (
                    <Word word={word} key={word.id} />
                ))}
            </tbody>
        </table>
    </>
}
