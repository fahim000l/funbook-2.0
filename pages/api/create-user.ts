import { connectMongo } from "@/configs/db.config";
import User from "@/db/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import JWT from "jsonwebtoken";
import { serialize } from "cookie";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    const { method, body } = req;

    if (method === "POST") {
      if (!body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const foundUser = await User.findOne({ email: body.email });

        if (!foundUser) {
          const result = await User.create(body);

          const token = JWT.sign(
            { email: body?.email },
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

          return res.status(200).json({ success: true, result });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "User Already Exist" });
        }
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} is not allowed for this API` });
    }
  } finally {
  }
}
