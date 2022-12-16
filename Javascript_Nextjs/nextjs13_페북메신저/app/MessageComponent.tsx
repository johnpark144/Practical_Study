// parant 컴포넌트가 "use client"여서 안적어도됨
import Image from "next/image";
import { Message } from "../typings";
import { useSession } from "next-auth/react"
import TimeAgo from "react-timeago";

type Prop = {
  msg: Message;
};

function MessageComponent({ msg }: Prop) {
  const {data : session} = useSession();  // 클라이언트 사이드 세션가져오기
  const isUser = session?.user?.email === msg.email;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src={msg.profilePic}
          alt="Profile Picture"
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : " text-red-400 text-left"
          }`}
        >
          {msg.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "bg-blue-400 ml-auto order-2" : " bg-red-400 "
            }`}
          >
            <p>{msg.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && "text-right"
            }`}
          >
            <TimeAgo date={new Date(msg.created_at)} /> {/* 참고로 msg.created_at = Date.now() // 기존 시간 나타날때는 new Date(msg.created_at).toLocaleString() */} 
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
