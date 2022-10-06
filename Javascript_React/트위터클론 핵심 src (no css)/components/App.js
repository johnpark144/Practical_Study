import React, { useEffect, useState } from "react";
import AppRouter from "components/Approuter" // 절대경로로 바꿔줌 (jsconfig.json에서)
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "@firebase/auth";
import { authService } from "fBase";

export default function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIN] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => { // 유저 로그인 되있는지 안되있는지 확인
        if (user) {
          setIsLoggedIN(true);
          setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
            });
        } else {
          setIsLoggedIN(false);
        }
        setInit(true);
      });
    }, []);

    // 새로유저 적용
    const refreshUser = () =>{
      const user = authService.currentUser;
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });
    }
    return <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing"}{/*로그인한user가 있을때 사용자정보와 함께 라우터를전달 // 로그인중이면 Initializing*/}
      <footer>&copy; twitter {new Date().getFullYear()}</footer>{/* new Date().getFullYear() 로 현재 년도 생성*/}
    </>
  }
