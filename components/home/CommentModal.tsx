import { Avatar, Divider, IconButton, TextField } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { Send } from "@mui/icons-material";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { Textarea } from "@mui/joy";
import { IUser } from "@/db/models/User";
import { IMedia } from "@/db/models/Media";
import { ITag } from "@/db/models/Tag";
import { IReaction } from "@/db/models/Reaction";
import { postType } from "@/pages";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import CommentBox from "./CommentBox";

interface props {
  commentingPost: postType;
}

const CommentModal = ({ commentingPost }: props) => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [text, setText] = useState<string>("");
  const { postRefetch } = useGetAllPosts();
  const modalToggler = useRef<HTMLInputElement | null>(null);

  const handleSendComment = () => {
    fetch("/api/comment-post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: authUser?.email,
        text,
        postId: commentingPost?._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          postRefetch();
          setText("");
          modalToggler.current?.click();
        }
      });
  };

  return (
    <div className="z-[1000]">
      <input
        ref={modalToggler}
        type="checkbox"
        id="commentModal"
        className="modal-toggle"
      />
      <div className="modal lg:modal-middle modal-bottom z-[1000]">
        <div className="modal-box flex lg:flex-col flex-col-reverse p-2 z-[1000]">
          <div className="flex items-center space-x-3 w-full">
            <Avatar src={authUser?.profilePic} />
            <Textarea
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ENTER") {
                  if (text) {
                    handleSendComment();
                  }
                }
              }}
              value={text}
              sx={{ width: "100%" }}
              maxRows={3}
              name="Solid"
              placeholder="Type in here…"
              variant="outlined"
            />
            {/* <TextField placeholder="Write something" fullWidth size="small" /> */}
            <IconButton onClick={handleSendComment} disabled={!text}>
              <Send />
            </IconButton>
          </div>
          <Divider className="my-2" />
          {commentingPost?.comments?.length === 0 ? (
            <div className="p-2">
              <div className="bg-base-300 text-base-content font-bold text-center lg:p-20 p-5 rounded-lg">
                No Comment yet
              </div>
            </div>
          ) : (
            <CommentBox modalToggler={modalToggler} post={commentingPost} />
          )}
        </div>
        <label className="modal-backdrop" htmlFor="commentModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default CommentModal;
