"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

function UpdatePrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id"); // searchParams(?뒤 검색한부분)

  const [submitting, setSubmitting] = useState(false); // submit중인지 아닌지
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      // GET 요청 으로 읽어들인 것 세팅
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails(); // promptId가 존재하는 경우만 그 데이터를 GET으로 가져오기
  }, [promptId]);

  // 수정시키기
  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true); // submit 진행중
    if (!promptId) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false); // submit중 단계에서 해제
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={EditPrompt}
    />
  );
}
export default UpdatePrompt;
