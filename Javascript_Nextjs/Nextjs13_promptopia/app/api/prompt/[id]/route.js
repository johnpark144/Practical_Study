import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET
export const GET = async (request, { params }) => {
  try {
    // DB연결
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator"); // findById에 id값을 주면 그 id 데이터만 가져옴 // populate("creator")는 "creator"와 관계된 데이터를 함께 가져오게 함
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    // DB연결
    await connectToDB();
    // 데이터 가져오기, 데이터 없는경우 not-found
    const existingPrompt = await Prompt.findById(id); // findById에 id값을 주면 그 id 데이터만 가져옴
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    // 데이터 수정 후 저장
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Id값을 가져와서 삭제시킴
    await Prompt.findByIdAndRemove(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
