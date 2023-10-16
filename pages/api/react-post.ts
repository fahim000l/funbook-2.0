import { connectMongo } from "@/configs/db.config";
import Reaction from "@/db/models/Reaction";
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
        const reactData = req.body;
        const query = {
          $and: [
            { user: req.body.user },
            { postId: new Object(req.body.postId) },
          ],
        };

        const isReacted = await Reaction.findOne(query);

        if (isReacted) {
          if (isReacted.react === reactData.react) {
            const result = await Reaction.deleteOne(query);
            return res.status(200).json({ success: true, result });
          } else {
            const result = await Reaction.updateOne(query, {
              $set: { react: reactData.react },
            });
            return res.status(200).json({ success: true, result });
          }
        } else {
          const result = await Reaction.create(reactData);
          return res.status(200).json({ success: true, result });
        }
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} request is not allowed for this API` });
    }
  } finally {
  }
}
