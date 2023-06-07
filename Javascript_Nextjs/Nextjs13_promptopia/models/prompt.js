import { Schema, model, models } from "mongoose";

// 데이터 형식(Model)
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema); // 기존에 있는 데이터를 사용하거나, 스키마에 맞춰서 생성함

export default Prompt;
