import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { IComment } from "@/db/models/Comment";
import { IUser } from "@/db/models/User";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import {
  Favorite,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  ThumbUp,
} from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import { Schema } from "mongoose";
import React, { useState, useRef, useContext } from "react";

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
    _id,
  } = comment;
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const reactPackage = useRef<HTMLLabelElement | null>(null);
  const { postRefetch } = useGetAllPosts();

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

  return (
    <div>
      <div
        onMouseOver={() => {
          setIsReacting(true);
          reactPackage.current?.click();
        }}
        onMouseOut={() => setIsReacting(false)}
        className="chat chat-start"
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Avatar src={profilePic} />
          </div>
        </div>
        <div className="chat-header">{userName}</div>
        <div className="chat-bubble w-full mr-0 pr-0">{text}</div>
        <div className="chat-footer flex justify-between">
          <div>
            <div className="tooltip" data-tip="like">
              <IconButton size="small" onClick={() => handleReactPost("like")}>
                <ThumbUp className="w-6 h-6" />
              </IconButton>
            </div>
            <div className="tooltip" data-tip="love">
              <IconButton size="small" onClick={() => handleReactPost("love")}>
                <Favorite className="w-6 h-6" />
              </IconButton>
            </div>
            <div className="tooltip" data-tip="happy">
              <IconButton size="small" onClick={() => handleReactPost("happy")}>
                <SentimentVerySatisfied className="w-6 h-6" />
              </IconButton>
            </div>
            <div className="tooltip" data-tip="sad">
              <IconButton size="small" onClick={() => handleReactPost("sad")}>
                <SentimentVeryDissatisfied className="w-6 h-6" />
              </IconButton>
            </div>
          </div>
          <Button size="small">Reply</Button>
        </div>
      </div>
    </div>
  );
};

export default CommentChatBubble;
