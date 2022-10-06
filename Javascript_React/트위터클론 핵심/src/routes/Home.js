import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

export default function Home({ userObj }) {
    const [tweets, setTweets] = useState([]);

    // 실시간으로 트윗 출력
    useEffect(() => {
        const q = query( // DB안에 tweets컬렉션에있는 모든 Doccument를 쿼리로 불러옴 
            collection(dbService, "tweets"),
            orderBy("createdAt", "desc")
        );
        // 트위팅한 내용 출력
        onSnapshot(q, (snapshot) => {
            const tweetArr = snapshot.docs.map((doc) => ({// {"attachmentUrl" : "https://...", "createdAt": 1664910884537, "tweet": "트윗내용", "id": "oTIjYZIeTf5rV7ms7LsY"}
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArr);
        });
    }, []);

    return (
        <div>
            <TweetFactory userObj={userObj} />
            <div>
                {tweets.map(tweet => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};