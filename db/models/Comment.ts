import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  user: string;
  text: string;
  postId: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || model<IComment>("Comment", commentSchema);

export default Comment;
