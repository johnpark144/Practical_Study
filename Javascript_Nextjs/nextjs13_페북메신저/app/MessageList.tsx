"use client"; // 리액트 use를 사용하려면 적어둬야함
import React, { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { clientPusher } from "../pusher";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

type Props = {
  initialMsg: Message[];
}

function MessageList({ initialMsg }: Props) {
  // 메시지 데이터를 서버에서 받아오기
  const { data: messages, refetch } = useQuery<Message[]>(
    "/api/getMessages",
    fetcher
  );

  // 실시간으로 데이터 가져오기
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      if (!messages) return;
      if (messages?.find((msg) => msg.id === data.id)) return; // 트리거된 데이터의 id와 현재 데이터의 id가 중복되면
      console.log("-- new Message from Pusher :", data.message, "--");
      refetch();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMsg).map((msg) => (
        <MessageComponent key={msg.id} msg={msg} />
      ))}
    </div>
  );
}

export default MessageList;
