import { IComment } from "@/db/models/Comment";
import { IUser } from "@/db/models/User";
import { Avatar } from "@mui/material";
import { Schema } from "mongoose";
import React from "react";

interface props {
  comment: {
    _id: Schema.Types.ObjectId;
    text: string;
    user: string;
    postId: Schema.Types.ObjectId;
    authorInfo: IUser[];
  };
}

const CommentChatBubble = ({ comment }: props) => {
  const {
    text,
    authorInfo: {
      [0]: { profilePic, userName },
    },
  } = comment;

  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Avatar src={profilePic} />
        </div>
      </div>
      <div className="chat-header">{userName}</div>
      <div className="chat-bubble">{text}</div>
    </div>
  );
};

export default CommentChatBubble;
