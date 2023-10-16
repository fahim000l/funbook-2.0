import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  userName: string;
  profilePic: string;
  FriendList: string[];
  pendingList: string[];
  requestList: string[];
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    pendingList: {
      type: [String],
    },
    FriendList: {
      type: [String],
    },
    requestList: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);
export default User;
