import { connectMongo } from "@/configs/db.config";
import User from "@/db/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    const { method, body } = req;
    if (method === "PUT") {
      if (!body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const { trigger, victim } = body;

        const findTrigger = { email: trigger };
        const findVictim = { email: victim };

        const triggerUpdatingDoc = {
          $pull: {
            FriendList: victim,
          },
        };
        const victimUpdatingDoc = {
          $pull: {
            FriendList: trigger,
          },
        };

        const TriggerResult = await User.updateOne(
          findTrigger,
          triggerUpdatingDoc,
          { upsert: true }
        );

        const victimResult = await User.updateOne(
          findVictim,
          victimUpdatingDoc,
          { upsert: true }
        );

        return res.status(200).json({
          success: true,
          TriggerResult,
          victimResult,
        });
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} is not allowed for this API` });
    }
  } finally {
  }
}
