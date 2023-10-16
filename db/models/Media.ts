import { Document, Schema, model, models } from "mongoose";

export interface IMedia extends Document {
  mediaType: string;
  postId: Schema.Types.ObjectId;
  src: string;
}

const mediaSchema = new Schema<IMedia>(
  {
    mediaType: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.ObjectId,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Media = models.Media || model<IMedia>("Media", mediaSchema);
export default Media;
