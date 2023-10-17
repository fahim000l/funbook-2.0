import { Document, Schema, model, models } from "mongoose";

export interface IPost extends Document {
  postType: string;
  author: string;
  caption: string;
  sharedPostId: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>(
  {
    caption: {
      type: String,
    },
    author: {
      required: true,
      type: String,
    },
    postType: {
      required: true,
      type: String,
    },
    sharedPostId: {
      type: Schema.ObjectId,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model<IPost>("Post", postSchema);
export default Post;
