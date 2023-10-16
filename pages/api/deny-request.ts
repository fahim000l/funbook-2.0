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
        const { sender, receiver } = body;

        const findSender = { email: sender };
        const findReceiver = { email: receiver };

        const senderUpdatingDoc = {
          $pull: {
            pendingList: receiver,
          },
        };
        const receiverUpdatingDoc = {
          $pull: {
            requestList: sender,
          },
        };

        const senderResult = await User.updateOne(
          findSender,
          senderUpdatingDoc,
          { upsert: true }
        );

        const receiverResult = await User.updateOne(
          findReceiver,
          receiverUpdatingDoc,
          { upsert: true }
        );

        return res
          .status(200)
          .json({ success: true, senderResult, receiverResult });
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} is not allowed for this API` });
    }
  } finally {
  }
}
