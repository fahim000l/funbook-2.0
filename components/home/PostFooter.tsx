import React, { useRef, useState, useContext, LegacyRef } from "react";
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
import { postType } from "@/pages";

interface props {
  post: postType;
  setCommentingPost: React.Dispatch<React.SetStateAction<postType | null>>;
}

const PostFooter = ({ post, setCommentingPost }: props) => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const reactPackage = useRef<HTMLLabelElement | null>(null);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const isReacted = post.reactions.find((r) => r.user === authUser?.email);
  const { postRefetch } = useGetAllPosts();

  const commentModalRef = React.useRef<HTMLLabelElement | null>(null);

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
            size="small"
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            onMouseOut={() => setIsReacting(false)}
            className="text-sm"
            fullWidth
            startIcon={<ThumbUp />}
          >
            <span className="hidden lg:inline">Like</span>
          </Button>
        ) : isReacted.react === "love" ? (
          <Button
            size="small"
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            className="text-[red] text-sm"
            onMouseOut={() => setIsReacting(false)}
            fullWidth
            startIcon={<Favorite className="text-[red]" />}
          >
            <span className="hidden lg:inline">Love</span>
          </Button>
        ) : isReacted.react === "happy" ? (
          <Button
            size="small"
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            className="text-[blue] text-sm"
            onMouseOut={() => setIsReacting(false)}
            fullWidth
            startIcon={<SentimentVerySatisfied className="text-[blue]" />}
          >
            <span className="hidden lg:inline">Happy</span>
          </Button>
        ) : (
          <Button
            size="small"
            onMouseOver={() => {
              setIsReacting(true);
              reactPackage.current?.click();
            }}
            className="text-[blue] text-sm"
            onMouseOut={() => setIsReacting(false)}
            fullWidth
            startIcon={<SentimentVeryDissatisfied className="text-[blue]" />}
          >
            <span className="hidden lg:inline">Sad</span>
          </Button>
        )
      ) : (
        <Button
          size="small"
          onMouseOver={() => {
            setIsReacting(true);
            reactPackage.current?.click();
          }}
          className="text-black text-sm"
          onMouseOut={() => setIsReacting(false)}
          fullWidth
          startIcon={<ThumbUp />}
        >
          <span className="hidden lg:inline">Like</span>
        </Button>
      )}

      <Button
        size="small"
        onClick={() => commentModalRef?.current?.click()}
        className="text-black text-sm"
        fullWidth
        startIcon={<Comment />}
      >
        <span className="hidden lg:inline">Comment</span>
        <span>{post.comments.length > 0 && `(${post.comments.length})`}</span>
      </Button>
      <Button
        size="small"
        className="text-black text-sm"
        fullWidth
        startIcon={<Share />}
      >
        <span className="hidden lg:inline">Share</span>
      </Button>
      <label
        onClick={() => setCommentingPost(post)}
        ref={commentModalRef}
        htmlFor="commentModal"
        className="btn hidden"
      >
        open modal
      </label>
    </div>
  );
};

export default PostFooter;
