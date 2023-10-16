import Image from "next/image";
import { Inter } from "next/font/google";
import Main from "@/layouts/Main";
import FeedingOption from "@/components/home/FeedingOption";
import PostsCard from "@/components/home/postsCard";
import useGetAllPosts from "@/hooks/useGetAllPosts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { posts } = useGetAllPosts();

  return (
    <Main>
      <FeedingOption />

      <div className="flex flex-col">
        {posts?.map((post) => (
          <PostsCard post={post} key={post?._id} />
        ))}
      </div>
    </Main>
  );
}
