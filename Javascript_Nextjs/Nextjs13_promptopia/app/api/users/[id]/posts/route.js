import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    // DB연결
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    ); // find에 {creator: params.id}를 주면 데이터베이스에 해당 값과 일치한 데이터만 가져옴
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
