import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    // DB연결
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator"); // find에 {}를 주면 전체 데이터를 가져옴 // populate("creator")는 "creator"와 관계된 데이터를 함께 가져오게 함
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
