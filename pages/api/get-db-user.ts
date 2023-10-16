import { connectMongo } from "@/configs/db.config";
import User from "@/db/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    const { query } = req;

    if (!query.email) {
      return res.status(404).json({ error: "Invalid query" });
    } else {
      const user = await User.findOne({ email: query.email });

      return res.status(200).json(user);
    }
  } finally {
  }
}
