import mongoose from "mongoose";

let isConneted = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // mongoDB 이미 연결 되있는경우
  if (isConneted) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // mongoDB 연결시킴
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConneted = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
