import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json(); // POST요청으로 받은 데이터

  try {
    // DB연결
    await connectToDB();
    // prompt 모델에 스키마에 맞춰서, POST요청으로 받은 req의 데이터를 각각 객체로 만들어 DB에 저장
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save(); // 저장
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
