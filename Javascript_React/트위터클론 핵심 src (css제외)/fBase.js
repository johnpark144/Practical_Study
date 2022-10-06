import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = { // 보안을 위해 .env에 정보따로관리
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID ,
    appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);
export const authService = getAuth(); // 로그인기능
export const dbService = getFirestore(); // 데이터베이스
export const storageService = getStorage(); // 파일