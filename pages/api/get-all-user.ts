import { connectMongo } from "@/configs/db.config";
import User from "@/db/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    const allUser = await User.aggregate([
      {
        $match: {},
      },
    ]);

    return res.status(200).json(allUser);
  } finally {
  }
}
