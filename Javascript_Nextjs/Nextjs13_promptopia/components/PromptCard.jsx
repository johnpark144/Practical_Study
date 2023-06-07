"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState(""); // 복사 중 표시용
  // 복사 기능
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt); // 클립보드에 해당 내용 저장 (ctrl + c, v)
    setTimeout(() => setCopied(""), 3000); // 3초후 복사모양 원래대로
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {/* 프로필 사진 */}
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            {/* 유저 이름 */}
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            {/* 이메일 */}
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* 복사 아이콘 */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg" // 복사 버튼 클릭 한 경우 (3초간)
                : "/assets/icons/copy.svg" // 원래 복사 모양
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      {/* Prompt 부분 (글 부분) */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      {/* Tag 부분 (태그 부분) */}
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {/* 수정, 삭제 */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
