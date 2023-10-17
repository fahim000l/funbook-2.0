import { commentType, postType } from "@/pages";
import React, { LegacyRef } from "react";
import CommentChatBubble from "./CommentChatBubble";

interface props {
  post: postType;
  modalToggler: LegacyRef<HTMLInputElement | null>;
}

const CommentBox = ({ post, modalToggler }: props) => {
  const { comments } = post;

  return (
    <div className="max-h-52 overflow-y-scroll">
      {comments?.map((comment: commentType) => (
        <CommentChatBubble
          modalToggler={modalToggler}
          comment={comment}
          key={comment?._id}
        />
      ))}
    </div>
  );
};

export default CommentBox;
