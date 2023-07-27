// ###### 리마인더 ##############################################################################################################
// 밑에 정리된 코드들 사용중 오류 발생시 수정 해야함
// 더 나은 예시있는경우 수정
// 다른 기타 기능들 사용하여 알아낼 떄마다 업데이트



// ######### 인덱스 (Ctrl + F) ########################################################### (-> 인덱스에 있는데 찾기 안되면 찾아서 인덱스 변경) ##################
// fBase.js
// 로그인 기능
// Create -- addDoc
// Read -- query, where, orderBy, onSnapshot
// Update, Delete -- updateDoc, deleteDoc

// ######### FireBase 관한 정보 링크 #########################################################################################################




// ######## 기본 세팅 ###################################################################################################################
// npm i firebase

// ######## .env (밑에 환경변수들은 가짜 예시임)
REACT_APP_API_KEY="AIzaSyAd5ulEiTXPtzwSwSf9-DIU33ukRc7e234"   // create-react는 REACT_APP으로, Vite는 VITE로 변수 이름이 시작되야함 // Nextjs는 nextjs 파일 참고
REACT_APP_AUTH_DOMAIN="myabc-97f23.firebaseapp.com"
REACT_APP_PROJECT_ID="myabc-97f23"
REACT_APP_STORAGE_BUCKET="myabc-97f23.appspot.com"
REACT_APP_MESSAGIN_ID="304756004733"
REACT_APP_APP_ID="1:304756004719:web:4e9d8fb167f341d765ba12"

// ######## fBase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = { // Keeping these at '.env' for security
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
initializeApp(firebaseConfig);
export const authService = getAuth(); // 로그인 기능
export const dbService = getFirestore(); // DB
export const storageService = getStorage(); // 파일 스토리지


// ######## 로그인 기능 ###################################################################################################################
// ######## app.js
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./fBase";

// 이 부분은 사실 Context API나 리덕스같은 상태관리 라이브러리를 사용하여 보관할 것을 권장
function App() {
  const [userObj, setUserObj] = useState(null); // 로그인된 사용자 정보
  const [isLoggedIn, setIsLoggedIN] = useState(false); // 로그인 여부
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {  // 파라미터에는 user정보가 담
      if (user) {
        setIsLoggedIN(true); // 로그인
        setUserObj({ // 로그인한 사용자 정보 입력
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setIsLoggedIN(false); // 여전히 로그인 안됨
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {isLoggedIn ? ( 
            // 로그인이 된경우 Home 페이지로 (userObj도 props로 같이 보내줌)
            <>
              <Route exact path="/" element={<Home userObj={userObj} />} /> 
            </>
          ) : (
            // 로그인이 안된경우 Auth 페이지로
            <>
              <Route path="/" element={<Auth />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// ######## Auth.js (리액트 훅 폼을 사용할 것을 권장)
import { useState } from "react";
import { authService } from "../fBase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup,
        GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");

  // 로그인모드인지 회원가입 모드인지
  const [newAccount, setNewAccount] = useState(false);
  const toggleAccount = () => setNewAccount((prev) => !prev);

  // 이메일이나 패스워드가 타입될떄
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Submit 될때 가입 혹은 로그인
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (newAccount) {
        // 가입모드
        data = await createUserWithEmailAndPassword( authService, email, password );
      } else {
        // 로그인모드
        data = await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // OAuth 로그인
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      } else if (name === "facebook") {
        provider = new FacebookAuthProvider();
      }
      const data = await signInWithPopup(authService, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div onSubmit={onSubmit}>
        {/* 이메일, 비밀번호, 로그인 혹은 가입 버튼, 로그인 가입 토글버튼 */}
        <form>
          <input
            onChange={onChange}
            required
            value={email}
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={onChange}
            required
            value={password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <input type="submit" value={newAccount ? "Create Account" : "Sign in"} />
          <span>{error.slice(10, -1)}</span>
        </form>
        <div onClick={toggleAccount}>
          {newAccount ? "Sign in" : "Create Account"}
        </div>

        {/* Google, gitHub, FaceBook */}
        <div>
          <div>
            <button onClick={onSocialClick} name="google"> Continue with Google </button>
            <button onClick={onSocialClick} name="github"> Continue with Github </button>
            <button onClick={onSocialClick} name="facebook"> Continue with Facebook </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ######## Create ###################################################################################################################
// To add docs : Database -> Rule -> allow read, write: if true; (input at firestore)
import { addDoc, collection } from "firebase/firestore"; 
import { dbService } from "../fBase";

// ... 생략 ...
 const onSubmit = async (e) => {
    e.preventDefault();
      if (!isLoading) {
        setIsLoading(true); 
        // 데이터 객체
        const wordObj = {
          creatorId: userObj.uid, // Save logged-in-user's uid
          id: wordsMaxId + 1,
          day: Number(dayRef.current.value),
          eng: engRef.current.value,
          kor: korRef.current.value,
          isDone: false,
        };
        // 데이터 더하기
        await addDoc(collection(dbService, "words"), wordObj); // words라는 이름의 컬렉션에 wordObj객체를 담음 
        setIsLoading(false); // Not loading
      }
  };
// ... 생략 ...

// ######## Read (query, SQL과 비슷) ####################################################################################################
import { useEffect, useState } from "react";
import { dbService } from "../fBase";
import { collection, GeoPoint, query, doc, where, getDocs, updateDoc, deleteDoc, onSnapshot, orderBy } from "firebase/firestore";

export default function Data()
  const [dataArr, setDataArr] = useState("");
  useEffect(() => {
    const callDataDetail = async () => {
    const q = query(
      collection(dbService, "words"),
      orderBy("id",  "asc"), // 없어도 
      where("marked", "==", new GeoPoint(markedData[0], markedData[1]))
    );
    onSnapshot(q, (snapshot) => {
      setDataArr(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
      
//     const docsSnap = await getDocs(q);
  };
    
  callDataDetail();
  }, []);

  return dataArr;
}


// ######## Update, Delete ###################################################################################################################
import { useEffect, useState } from "react";
import { dbService } from "../fBase";
import { collection, GeoPoint, query, doc, where, getDocs, updateDoc, deleteDoc, onSnapshot, orderBy } from "firebase/firestore";

const geoRef = doc(dbService, "markedDatas", docsSnap.docs[0].id);
    if (editedMarkedArr?.length) {
      await updateDoc(geoRef, { // 해당 Doc다음과 같이 수정
        marked: [...editedMarkedArr],
      });
    } else {
      await deleteDoc(geoRef);  // 해당 Doc삭제
    }


// ##################################################################################################################################

