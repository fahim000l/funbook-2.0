import { connectMongo } from "@/configs/db.config";
import Media from "@/db/models/Media";
import Post from "@/db/models/Post";
import Tag from "@/db/models/Tag";
import { Schema } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

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
        const { postData, tagData, mediaData } = body;

        const postResult = await Post.create(postData);

        if (postResult._id) {
          tagData?.forEach(
            (tag: {
              user: string;
              postId: Schema.Types.ObjectId | undefined;
            }) => {
              tag.postId = postResult?._id;
            }
          );

          mediaData?.forEach(
            (media: {
              mediaType: string;
              postId: Schema.Types.ObjectId | undefined;
              src: string;
            }) => {
              media.postId = postResult?._id;
            }
          );
        }

        const tagsResult =
          tagData?.length > 0 ? await Tag.insertMany(tagData) : "No Tags";
        const mediaResult =
          mediaData?.length > 0
            ? await Media.insertMany(mediaData)
            : "No Media";

        return res
          .status(200)
          .json({ success: true, tagsResult, mediaResult, postResult });
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} request is not allowed for this API` });
    }
  } finally {
  }
}
