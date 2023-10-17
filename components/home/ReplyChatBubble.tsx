import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import { replyType } from "@/pages";
import {
  Favorite,
  Message,
  Send,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  ThumbUp,
} from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import { Avatar, Button, Chip, IconButton } from "@mui/material";
import React, { LegacyRef, useContext, useRef, useState } from "react";

interface props {
  reply: replyType;
  modalToggler: LegacyRef<HTMLInputElement | null>;
  commentId: string;
}

const ReplyChatBubble = ({ reply, modalToggler, commentId }: props) => {
  const {
    _id,
    reactions,
    text,
    authorInfo: {
      [0]: { profilePic, userName },
    },
  } = reply;

  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const reactPackage = useRef<HTMLLabelElement | null>(null);
  const { postRefetch } = useGetAllPosts();
  const isReacted = reactions.find((r) => r.user === authUser?.email);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");

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
        postId: commentId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          postRefetch();
          setReplyText("");
          setReplying(false);
          if (modalToggler) {
            modalToggler?.current?.click();
          }
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
        <div className="chat-bubble chat-bubble-primary w-full mr-0 pr-0">
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
    </div>
  );
};

export default ReplyChatBubble;
