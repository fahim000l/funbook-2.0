import { postType } from "@/pages";
import React from "react";
import CommentChatBubble from "./CommentChatBubble";

interface props {
  post: postType;
}

const CommentBox = ({ post }: props) => {
  const { comments } = post;

  return (
    <div>
      {comments?.map((comment) => (
        <CommentChatBubble comment={comment} key={comment?._id} />
      ))}
    </div>
  );
};

export default CommentBox;