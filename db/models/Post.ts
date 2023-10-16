import { Document, Schema, model, models } from "mongoose";

interface IPost extends Document {
  postType: string;
  author: string;
  caption: string;
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
  },
  { timestamps: true }
);

const Post = models.Post || model<IPost>("Post", postSchema);
export default Post;
