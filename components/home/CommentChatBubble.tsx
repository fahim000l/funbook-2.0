import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { IComment } from "@/db/models/Comment";
import { IReaction } from "@/db/models/Reaction";
import { IUser } from "@/db/models/User";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import {
  Favorite,
  Send,
  Message,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  ThumbUp,
} from "@mui/icons-material";
import { Avatar, Button, Chip, IconButton } from "@mui/material";
import { Schema } from "mongoose";
import React, { useState, useRef, useContext, LegacyRef } from "react";
import TextArea from "../tools/TextArea";
import { Textarea } from "@mui/joy";
import { commentType, postType, replyType } from "@/pages";
import ReplyChatBubble from "./ReplyChatBubble";

interface props {
  comment: commentType;
  modalToggler: LegacyRef<HTMLInputElement | null>;
  setCommentingPost: React.Dispatch<React.SetStateAction<postType | null>>;
}

const CommentChatBubble = ({
  comment,
  modalToggler,
  setCommentingPost,
}: props) => {
  const {
    text,
    reactions,
    authorInfo: {
      [0]: { profilePic, userName },
    },
    replys,
    _id,
  } = comment;
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const reactPackage = useRef<HTMLLabelElement | null>(null);
  const { postRefetch } = useGetAllPosts();
  const isReacted = reactions.find((r) => r.user === authUser?.email);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const [showReplys, setShowReplys] = useState<boolean>(false);

  const handleReactPost = (react: string) => {
    fetch("/api/react-post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: authUser?.email,
        postId: _id,
        react: react,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          postRefetch();
        }
      });
  };

  const handleSendComment = () => {
    fetch("/api/comment-post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: authUser?.email,
        text: replyText,
        postId: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          postRefetch();
          setReplyText("");
          setReplying(false);
          setShowReplys(true);
          setCommentingPost(null);
        }
      });
  };

  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Avatar src={profilePic} />
          </div>
        </div>
        <div className="chat-header">{userName}</div>
        <div className="chat-bubble w-full mr-0 pr-0">
          {" "}
          <span>{text}</span>{" "}
        </div>
        <div className="chat-footer flex justify-between">
          {isReacted ? (
            isReacted?.react === "like" ? (
              <Button
                className="font-bold"
                onClick={() => setIsReacting(!isReacting)}
                size="small"
              >
                Like
              </Button>
            ) : isReacted?.react === "love" ? (
              <Button
                className="text-[red] font-bold"
                onClick={() => setIsReacting(!isReacting)}
                size="small"
              >
                Love
              </Button>
            ) : isReacted?.react === "happy" ? (
              <Button
                className="text-yellow-500 font-bold"
                onClick={() => setIsReacting(!isReacting)}
                size="small"
              >
                Happy
              </Button>
            ) : (
              <Button
                className="text-yellow-800 font-bold"
                onClick={() => setIsReacting(!isReacting)}
                size="small"
              >
                Sad
              </Button>
            )
          ) : (
            <Button
              className="font-bold text-black"
              onClick={() => setIsReacting(!isReacting)}
              size="small"
            >
              React
            </Button>
          )}
          <div
            className={`dropdown ${
              isReacting ? "dropdown-open" : ""
            } dropdown-top`}
          >
            <label ref={reactPackage} tabIndex={0} className="btn m-1 hidden">
              Click
            </label>
            <div
              tabIndex={0}
              onMouseOver={() => setIsReacting(true)}
              onMouseOut={() => setIsReacting(false)}
              className="dropdown-content bg-base-300 flex z-[1] p-2 shadow-lg rounded-box w-50"
            >
              <div className="tooltip" data-tip="like">
                <IconButton
                  className={`${
                    isReacted?.react === "like" ? "text-[blue]" : "text-black"
                  }`}
                  size="small"
                  onClick={() => handleReactPost("like")}
                >
                  <ThumbUp className="w-6 h-6" />
                </IconButton>
              </div>
              <div className="tooltip" data-tip="love">
                <IconButton
                  className={`${
                    isReacted?.react === "love" ? "text-[red]" : "text-black"
                  }`}
                  size="small"
                  onClick={() => handleReactPost("love")}
                >
                  <Favorite className="w-6 h-6" />
                </IconButton>
              </div>
              <div className="tooltip" data-tip="happy">
                <IconButton
                  className={`${
                    isReacted?.react === "happy" ? "text-[blue]" : "text-black"
                  }`}
                  size="small"
                  onClick={() => handleReactPost("happy")}
                >
                  <SentimentVerySatisfied className="w-6 h-6" />
                </IconButton>
              </div>
              <div className="tooltip" data-tip="sad">
                <IconButton
                  className={`${
                    isReacted?.react === "sad" ? "text-[blue]" : "text-black"
                  }`}
                  size="small"
                  onClick={() => handleReactPost("sad")}
                >
                  <SentimentVeryDissatisfied className="w-6 h-6" />
                </IconButton>
              </div>
            </div>
          </div>
          <Button onClick={() => setReplying(!replying)} size="small">
            Reply
          </Button>
          {reactions?.length > 0 && (
            <Chip
              className="cursor-pointer mx-2"
              label={reactions?.length}
              icon={<SentimentVerySatisfied />}
            />
          )}
          {replys?.length > 0 && (
            <div onClick={() => setShowReplys(!showReplys)}>
              <Chip
                className="cursor-pointer mx-2"
                label={reactions?.length}
                icon={<Message />}
              />
            </div>
          )}
        </div>
      </div>
      {replying && (
        <div className="lg:w-[70%] mx-auto flex flex-col items-end">
          <div className="flex items-center space-x-3 w-full">
            <Avatar src={authUser?.profilePic} />
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              sx={{ width: "100%" }}
              maxRows={3}
              name="Solid"
              placeholder="Type in here…"
              variant="outlined"
            />
            {/* <TextField placeholder="Write something" fullWidth size="small" /> */}
            <IconButton onClick={handleSendComment} disabled={!replyText}>
              <Send />
            </IconButton>
          </div>
          <Button onClick={() => setReplying(false)}>Cancel</Button>
        </div>
      )}

      {showReplys && (
        <div className="lg:w-[70%] w-[90%] mx-auto">
          {replys?.map((reply: replyType) => (
            <ReplyChatBubble
              commentId={_id}
              modalToggler={modalToggler}
              reply={reply}
              key={reply?._id}
              setCommentingPost={setCommentingPost}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentChatBubble;
