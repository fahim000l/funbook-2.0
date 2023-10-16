import { postType } from "@/pages";
import React from "react";
import CommentChatBubble from "./CommentChatBubble";

interface props {
  post: postType;
}

const CommentBox = ({ post }: props) => {
  const { comments } = post;

  return (
    <div className="max-h-52 overflow-y-scroll">
      {comments?.map((comment) => (
        <CommentChatBubble comment={comment} key={comment?._id} />
      ))}
    </div>
  );
};

export default CommentBox;
