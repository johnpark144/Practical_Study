import DayList from './component/DayList';
import Header from './component/Header';
import Day from './component/Day';
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header /> {/* Routes외부는 공동으로 노출*/}
        <Routes> {/* Routes내부는 url에따라 다른 페이지를 보여줌*/}
          <Route exact path='/' element={<DayList />} /> {/* 슬래시/는 첫페이지를 의미, exact path는 정확하게 슬래시가 일치할때만*/}
          <Route path='/day/:day'  element={<Day />} />{/* 콜론(:) 을붙여서 뒤에 day는 어떤값이 들어오든 변수로 가져감 */}
          <Route path='/create_word' element={<CreateWord />} />
          <Route path='/create_day' element={<CreateDay />} />
          <Route element={<EmptyPage />} />{/* 나머지 라우팅 안된부분은 일로처리(항상 맨밑에다 작성할것)*/}
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
