import type { NextApiResponse, NextApiRequest } from "next";
import JWT from "jsonwebtoken";
import { serialize } from "cookie";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body, method } = req;

    if (method === "POST") {
      if (!body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const email = body.email;
        const token: string = JWT.sign(
          { email },
          process.env.NEXT_PUBLIC_JWT_SECRET as string,
          {
            expiresIn: "1d",
          }
        );

        res.setHeader(
          "Set-Cookie",
          serialize("fun_book_token", token, {
            httpOnly: true,
            path: "/",
          })
        );

        return res.status(200).json({ success: true });
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} request is not apllowed for this API` });
    }
  } finally {
  }
}
