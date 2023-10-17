import Image from "next/image";
import { Inter } from "next/font/google";
import Main from "@/layouts/Main";
import FeedingOption from "@/components/home/FeedingOption";
import PostsCard from "@/components/home/postsCard";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import { IUser } from "@/db/models/User";
import { IMedia } from "@/db/models/Media";
import { ITag } from "@/db/models/Tag";
import { IReaction } from "@/db/models/Reaction";
import CommentModal from "@/components/home/CommentModal";
import React, { useContext, useState } from "react";
import { IComment } from "@/db/models/Comment";
import { Schema } from "mongoose";
import Confirmation from "@/components/tools/Confirmation";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export interface replyType {
  _id: string;
  text: string;
  user: string;
  postId: Schema.Types.ObjectId;
  authorInfo: IUser[];
  reactions: IReaction[];
}

export interface commentType {
  _id: string;
  text: string;
  user: string;
  postId: Schema.Types.ObjectId;
  authorInfo: IUser[];
  reactions: IReaction[];
  replys: replyType[];
}

export interface shareType {
  authorInfo: IUser[];
  author: string;
  caption: string;
  postType: string;
  medias: IMedia[] | any[];
  tags: ITag[] | any[];
  _id: string;
  reactions: IReaction[] | any[];
  comments: commentType[] | any[];
}

export interface postType {
  authorInfo: IUser[];
  author: string;
  caption: string;
  postType: string;
  medias: IMedia[] | any[];
  tags: ITag[] | any[];
  _id: string;
  sharedPostId: string;
  reactions: IReaction[] | any[];
  comments: commentType[] | any[];
  sharedPost: shareType[] | any[];
}

export default function Home() {
  const { posts, postRefetch } = useGetAllPosts();
  const [commentingPost, setCommentingPost] = React.useState<postType | null>(
    null
  );

  const [sharingPost, setSharingPost] = React.useState<postType | null>(null);
  const [isSharing, setSharing] = React.useState<boolean>(false);
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [caption, setCaption] = useState<string>("");

  const handleSharePOst = () => {
    fetch("/api/share-post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        author: authUser?.email,
        sharedPostId: sharingPost?.sharedPostId || sharingPost?._id,
        caption,
        postType: "public",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          postRefetch();
          setSharing(false);
        }
      });
  };

  return (
    <Main>
      <FeedingOption />

      <div className="flex flex-col">
        {posts?.map((post: postType) => (
          <PostsCard
            setSharing={setSharing}
            setCommentingPost={setCommentingPost}
            setSharingPost={setSharingPost}
            post={post}
            key={post?._id}
          />
        ))}
      </div>
      {commentingPost && <CommentModal commentingPost={commentingPost} />}
      {sharingPost && (
        <Confirmation
          handleCaption={(e) => setCaption(e.target.value)}
          open={isSharing}
          setOpen={setSharing}
          actionFunction={handleSharePOst}
          title="Confirmation to share the post"
          text="Are you sure , you want to share the post ?"
        />
      )}
    </Main>
  );
}
