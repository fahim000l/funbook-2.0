import { connectMongo } from "@/configs/db.config";
import Post from "@/db/models/Post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo().catch((err) =>
      res.status(200).json({ error: "Connection Failed...!" })
    );

    const { method, body } = req;

    if (method === "POST") {
      if (!body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const result = await Post.create(body);
        return res.status(200).json({ success: true, result });
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} request is not allowed for this API` });
    }
  } finally {
  }
}
