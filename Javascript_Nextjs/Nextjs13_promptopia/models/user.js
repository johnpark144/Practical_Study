import { Schema, model, models } from "mongoose";

// 데이터 형식(Model)
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 4-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// 로그인 되있으면 로그인된 유저 계속해서 사용, 아니면 User 컬렉션에 아이디와 로그인 시켜서 사용
const User = models.User || model("User", UserSchema);

export default User;
