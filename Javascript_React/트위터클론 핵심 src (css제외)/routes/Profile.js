import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

export default function Profile({ refreshUser, userObj }) {
    // 로그아웃
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    // 뭐지?
    const getMyTweets = async () => {
        const q = query(
            collection(dbService, "tweets"),
            where("creatorId", "==", `${userObj.uid}`),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    };

    useEffect(() => {
        getMyTweets();
    }, []);

    // 프로필 변경
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onChange = (e) => { // value 실시간 변경
        const { target: { value } } = e;
        setNewDisplayName(value); 
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) { // value 변경전과 변경후가 다른경우만 적용
            await updateProfile(authService.currentUser, { displayName: newDisplayName }); //userObj의 displayName을 바꿔라
        }
        refreshUser(); // 
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type='text' placeholder='Display name' value={newDisplayName} />
                <input type='submit' placeholder='Update Profile' />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};