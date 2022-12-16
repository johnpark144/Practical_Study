// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { Message } from '../../typings';
import { serverPusher } from '../../pusher';

type Data = {
    message: Message;
}

type ErrorData = {
    body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    if(req.method !== 'POST'){
        res.status(405).json({ body: 'Method Not Allowed' })
        return;
    }
    const { message } = req.body;

    const newMessge = {
        ...message,
        created_at: Date.now()  // 유저의 시간을 서버의 시간으로 교체
    }

    await redis.hset('messages', message.id, JSON.stringify(newMessge));    // DB이름, Field, Content

    serverPusher.trigger('messages', 'new-message', newMessge)  // Channel, Event, Content (데이터 보낼때 Pusher에도 realtime위해서 전해줌)

  res.status(200).json({ message: newMessge })
}
