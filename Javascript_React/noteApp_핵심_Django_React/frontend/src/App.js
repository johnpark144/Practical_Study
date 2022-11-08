import { HashRouter, Route, Routes, redirect } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Header from "./components/Header";
import LoginPage from './pages/LoginPage';
import NoteListPage from "./pages/NoteListPage";
import NotePage from './pages/NotePage';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <HashRouter>
      <div className='container dark'>
        <div className='app'>
           <AuthProvider>  {/* AuthProvider로 감싸 주는 부분만 useContext 사용가능 */}
            <Header setIsLoggedIn={setIsLoggedIn}/> {/* setIsLoggedIn으로 로그아웃 시키려고 */}
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route exact path='/' element={<NoteListPage />} />
                  <Route path='/note/:id' element={<NotePage />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} /> {/* setIsLoggedIn으로 로그인 시키려고 */}
                  <Route path='/login/' element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                </> 
              )}
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </HashRouter >
  );
}

export default App;
