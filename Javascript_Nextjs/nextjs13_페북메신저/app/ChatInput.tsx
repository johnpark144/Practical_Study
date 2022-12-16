"use client"; // 리액트 use를 사용하려면 적어둬야함
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import { useQuery, useMutation } from "react-query";
import fetcher from "../utils/fetchMessages";
import { unstable_getServerSession } from "next-auth/next";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");

  // 메시지 데이터를 서버에서 받아오기
  const { refetch } = useQuery("/api/getMessages", fetcher);

  // 메시지 데이터를 서버에 보내기
  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;
    const messageToSend = input;
    setInput("");
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const res = await fetch("/api/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });
  };

  const { mutate } = useMutation(addMessage, {
    onSuccess: (data) => {
      refetch();
    },
  });

  return (
    <form
      onSubmit={(e) => mutate(e)}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100 "
    >
      <input
        type="text"
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2
        focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
      disabled:opacity-50 disabled:cursor-not-allowed"
      >
        send
      </button>
    </form>
  );
}

export default ChatInput;
