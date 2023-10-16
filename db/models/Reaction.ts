import { Document, Schema, model, models } from "mongoose";

export interface IReaction extends Document {
  user: string;
  react: string;
  postId: Schema.Types.ObjectId;
}

const ReactShema = new Schema<IReaction>(
  {
    user: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.ObjectId,
      required: true,
    },
    react: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reaction = models.Reaction || model<IReaction>("Reaction", ReactShema);
export default Reaction;
