import { Document, Schema, model, models } from "mongoose";

export interface ITags extends Document {
  user: string;
  postId: Schema.Types.ObjectId;
}

const TagShema = new Schema<ITags>(
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

const Tag = models.Tag || model<ITags>("Tag", TagShema);
export default Tag;
