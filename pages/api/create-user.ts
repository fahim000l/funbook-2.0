import { connectMongo } from "@/configs/db.config";
import User from "@/db/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

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
