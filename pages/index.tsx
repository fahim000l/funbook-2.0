import Image from "next/image";
import { Inter } from "next/font/google";
import Main from "@/layouts/Main";
import FeedingOption from "@/components/home/FeedingOption";
import PostsCard from "@/components/home/postsCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Main>
      <FeedingOption />
      <PostsCard />
    </Main>
  );
}
