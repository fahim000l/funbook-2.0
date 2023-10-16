import { connectMongo } from "@/configs/db.config";
import Post from "@/db/models/Post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "Connection Failed...!" })
    );

    const allPosts = await Post.aggregate([
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "postId",
          as: "tags",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "email",
                as: "user",
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "media",
          localField: "_id",
          foreignField: "postId",
          as: "medias",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "email",
          as: "authorInfo",
        },
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "postId",
          as: "reactions",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "email",
                as: "authorInfo",
              },
            },
          ],
        },
      },
    ]).sort({ updatedAt: -1 });

    return res.status(200).json(allPosts);
  } finally {
  }
}
