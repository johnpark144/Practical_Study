import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

export default function AppRouter({ refreshUser, isLoggedIn, userObj }) {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? ( // 로그인 되있는 경우 라우트
                    <>
                        <Route exact path='/' element={<Home userObj={userObj} />} />
                        <Route exact path='/profile' element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                    </>
                ) : ( // 로그인 되있지 않은 경우 라우트
                    <>
                    <Route exact path='/' element={<Auth />} />
                    <Route exact path="/profile" element={<Auth />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}