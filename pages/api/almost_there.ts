import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies';
import { redirect } from 'next/dist/server/api-utils';
import { serialize } from 'cookie';
import NextCors from 'nextjs-cors';
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: any, res: any, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: any
) {
    await runMiddleware(req, res, cors)
    const expireTime = 50 * 24 * 60 * 60;
    const { token } = req.query;
    console.log(token)

    res.setHeader('Set-Cookie', serialize('jwt', String(token), {
        httpOnly: false,
        path: "/",
        maxAge: expireTime * 1000,
    }));

    //localStorage.setItem("jwt", String(token))
    res.redirect(307, "/almost_there")
}
