// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { Message } from '../../typings';

type Data = {
    messages: Message[];
}

type ErrorData = {
    body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    if(req.method !== 'GET'){
        res.status(405).json({ body: 'Method Not Allowed' })
        return;
    }
    
    const messagesRes = await redis.hvals('messages') // (DB이름)데이터를 불러옴
    const messages: Message[] =
        messagesRes.map((message) => JSON.parse(message)).sort((a, b) => a.created_at - b.created_at); // 오름차순

  res.status(200).json({ messages })
}
