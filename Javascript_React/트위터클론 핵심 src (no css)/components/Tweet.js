import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "fBase";
import { deleteObject, ref } from "firebase/storage";
import { async } from "@firebase/util";

export default function Tweet({ tweetObj, isOwner }) {
    const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
    const desertRef = ref(storageService, tweetObj.attachmentUrl);

    // 트윗 삭제
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you wanna delete this tweet?");
        if (ok) {
            await deleteDoc(TweetTextRef); // tweets라는 db에 tweetObj.id의 id를 가진 데이터 삭제
            if (tweetObj.attachmentUrl !== "") {
                await deleteObject(desertRef); // storage에 첨부파일도 지움
            }
        }
    }

    // 트윗 수정
    const [editing, setEditing] = useState(false);
    const toggleEditing = () => setEditing((prev) => !prev); // 수정모드로 전환

    const [newTweet, setNewTweet] = useState(tweetObj.text); // 수정될 내용을 띄움

    const onChange = (e) => {  // 수정할 내용 타이핑
        const { target: { value } } = e;
        setNewTweet(value);
    }
    const onSubmit = async (e) => { // Submit 할때 내용교체
        e.preventDefault();
        await updateDoc(TweetTextRef, {
            text: newTweet,
        });
        setEditing(false); // 수정후 일반모드로 전환
    }


    return (
        <div>
            {editing ? ( // 수정모드
                <>
                    <form onSubmit={onSubmit} >
                        <input onChange={onChange}
                            type="text"
                            placeholder="Edit your tweet"
                            value={newTweet}
                            required
                        />
                        <input type="submit" value="Update Tweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : ( // 일반모드
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width='50px' height='50px' />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                    )}
                </>
            )
            }</div>
    )
}