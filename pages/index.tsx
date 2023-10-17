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
import React from "react";
import { IComment } from "@/db/models/Comment";
import { Schema } from "mongoose";

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

export interface postType {
  authorInfo: IUser[];
  author: string;
  caption: string;
  postType: string;
  medias: IMedia[] | any[];
  tags: ITag[] | any[];
  _id: string;
  reactions: IReaction[] | any[];
  comments: commentType;
}

export default function Home() {
  const { posts } = useGetAllPosts();
  const [commentingPost, setCommentingPost] = React.useState<postType | null>(
    null
  );

  return (
    <Main>
      <FeedingOption />

      <div className="flex flex-col">
        {posts?.map((post: postType) => (
          <PostsCard
            setCommentingPost={setCommentingPost}
            post={post}
            key={post?._id}
          />
        ))}
      </div>
      {commentingPost && <CommentModal commentingPost={commentingPost} />}
    </Main>
  );
}
