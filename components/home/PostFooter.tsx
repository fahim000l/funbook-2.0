import React, { useRef, useState, useContext } from "react";
import {
  ThumbUp,
  Comment,
  Share,
  Favorite,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { IMedia } from "@/db/models/Media";
import { ITag } from "@/db/models/Tag";
import { IUser } from "@/db/models/User";
import { IReaction } from "@/db/models/Reaction";
import useGetAllPosts from "@/hooks/useGetAllPosts";

interface props {
  post: {
    authorInfo: IUser[];
    author: string;
    caption: string;
    postType: string;
    medias: IMedia[] | any[];
    tags: ITag[] | any[];
    _id: string;
    reactions: IReaction[] | any[];
  };
}

const PostFooter = ({ post }: props) => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const reactPackage = useRef<HTMLLabelElement | null>(null);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const isReacted = post.reactions.find((r) => r.user === authUser?.email);
  const { postRefetch } = useGetAllPosts();

  const handleReactPost = (react: string) => {
    fetch("/api/react-post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: authUser?.email,
        postId: post._id,
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
    <div className="flex p-2">
      <div
        className={`dropdown ${isReacting ? "dropdown-open" : ""} dropdown-top`}
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
            <IconButton onClick={() => handleReactPost("like")}>
              <ThumbUp />
            </IconButton>
          </div>
          <div className="tooltip" data-tip="love">
            <IconButton onClick={() => handleReactPost("love")}>
              <Favorite />
            </IconButton>
          </div>
          <div className="tooltip" data-tip="happy">
            <IconButton onClick={() => handleReactPost("happy")}>
              <SentimentVerySatisfied />
            </IconButton>
          </div>
          <div className="tooltip" data-tip="sad">
            <IconButton onClick={() => handleReactPost("sad")}>
              <SentimentVeryDissatisfied />
            </IconButton>
          </div>
        </div>
      </div>

      {isReacted ? (
        isReacted.react === "like" ? (
          <Button
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            onMouseOut={() => setIsReacting(false)}
            fullWidth
            startIcon={<ThumbUp />}
          >
            Like
          </Button>
        ) : isReacted.react === "love" ? (
          <Button
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            className="text-[red]"
            onMouseOut={() => setIsReacting(false)}
            fullWidth
            startIcon={<Favorite className="text-[red]" />}
          >
            Love
          </Button>
        ) : isReacted.react === "happy" ? (
          <Button
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            className="text-[blue]"
            onMouseOut={() => setIsReacting(false)}
            fullWidth
            startIcon={<SentimentVerySatisfied className="text-[blue]" />}
          >
            Happy
          </Button>
        ) : (
          <Button
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            className="text-[blue]"
            onMouseOut={() => setIsReacting(false)}
            fullWidth
            startIcon={<SentimentVeryDissatisfied className="text-[blue]" />}
          >
            Sad
          </Button>
        )
      ) : (
        <Button
          onMouseOver={() => {
            setIsReacting(true);
            reactPackage.current?.click();
          }}
          className="text-black"
          onMouseOut={() => setIsReacting(false)}
          fullWidth
          startIcon={<ThumbUp />}
        >
          Like
        </Button>
      )}

      <Button className="text-black" fullWidth startIcon={<Comment />}>
        Comment
      </Button>
      <Button className="text-black" fullWidth startIcon={<Share />}>
        Share
      </Button>
    </div>
  );
};

export default PostFooter;
