import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
  user: string;
  postId: Schema.Types.ObjectId;
}

const TagShema = new Schema<ITag>(
  {
    user: {
      required: true,
      type: String,
    },
    postId: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Tag = models.Tag || model<ITag>("Tag", TagShema);
export default Tag;
