import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({    // 백엔드
  appId: "1524994",
  key: process.env.CLIENT_ID!,
  secret: process.env.SERVER_SECRET!,
  cluster: "us2",
  useTLS: true,
});

export const clientPusher = new ClientPusher('218a5df1343502f27233', {  // 프론트엔드
  cluster: "us2",
  forceTLS: true,
});
