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

const inter = Inter({ subsets: ["latin"] });

interface postType {
  authorInfo: IUser[];
  author: string;
  caption: string;
  postType: string;
  medias: IMedia[] | any[];
  tags: ITag[] | any[];
  _id: string;
  reactions: IReaction[] | any[];
}

export default function Home() {
  const { posts } = useGetAllPosts();

  return (
    <Main>
      <FeedingOption />

      <div className="flex flex-col">
        {posts?.map((post: postType) => (
          <PostsCard post={post} key={post?._id} />
        ))}
      </div>
    </Main>
  );
}
