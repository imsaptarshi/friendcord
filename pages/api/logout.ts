import { serialize } from "cookie";
import cors from "cors";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: any
) {

    res.setHeader('Set-Cookie', serialize('jwt', "", {
        httpOnly: false,
        path: "/",
        maxAge: 1,
    }));

    //localStorage.setItem("jwt", String(token))
    res.redirect(307, "/")
}