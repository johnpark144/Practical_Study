import React, { useRef, useState } from "react";
import { v4 } from "uuid"
import { dbService, storageService } from "fBase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

export default function TweetFactory({ userObj }) {
    const [tweet, setTweet] = useState("");

    // 트위팅할 내용 실시간 타이핑
    const onChange = (e) => {
        const { target: { value } } = e;
        setTweet(value);
    };

    // 이미지 파일
    const [attachment, setAttachment] = useState("");
    const onFileChange = (e) => { // 파일 업로드 함수
        const { target: { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }

    // 이미지 삭제
    const fileInput = useRef(); // 파일첨부하는 input Dom과 연결 (지울때 value같이 지우려고)
    const onClearAttachment = () => {
        setAttachment("")
        fileInput.current.value = null; // 파일첨부 글씨 지우기
    }

    // 트위팅한 내용 데이터베이스에 Submit
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = ""; // 첨부파일 없는경우는 글만 트윗
        if (attachment != "") { // 첨부파일 있는경우에만
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`); // user의uid (firebase에 있는 랜덤아이디) / v4(uuid)
            await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
        }

        const tweetObj = {
            text: tweet, // 타이핑한 내용
            createdAt: Date.now(),
            creatorId: userObj.uid, // 트윗한 유저
            attachmentUrl // 첨부파일 url
        }

        await addDoc(collection(dbService, "tweets"), tweetObj); // dbService(Firestore)의 tweets컬렉션에 Doccument를 추가
        setTweet(""); // 완료후 트윗 리셋
        setAttachment("") // 완료후 첨부파일 리셋

        // firebase Storage 에서 Rules 탭에 다음과 같이 적용
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read, write: if request.auth != null;
        //       }
        //     }
        //   }
    };

    return (
        <form onSubmit={onSubmit}>
            <input value={tweet} onChange={onChange} type='text' placeholder="What's on your mind?" maxLength={120} />
            <input type='file' accept="image/*" onChange={onFileChange} ref={fileInput} />{/* 이미지 파일만 받음, fileInput의 useRef와 연결 */}
            <input type='submit' value="tweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
}
