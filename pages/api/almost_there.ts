import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies';
import { redirect } from 'next/dist/server/api-utils';
import { serialize } from 'cookie';

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: any
) {
    const expireTime = 50 * 24 * 60 * 60;
    const { token } = req.query;
    console.log(token)
    res.setHeader('Set-Cookie', serialize('jwt', String(token), {
        path: '/', httpOnly: true,
        maxAge: expireTime * 1000,

    }));
    localStorage.setItem("jwt", String(token))
    //localStorage.setItem("jwt", String(token))
    res.redirect(307, "/almost_there")
}
