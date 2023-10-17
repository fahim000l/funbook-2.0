import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IMedia } from "@/db/models/Media";
import { ITag } from "@/db/models/Tag";
import { IUser } from "@/db/models/User";
import ImageGrid from "../tools/ImageGrid";
import { Chip, Divider } from "@mui/material";
import { People, Public } from "@mui/icons-material";
import PostFooter from "./PostFooter";
import { IReaction } from "@/db/models/Reaction";
import CommentModal from "./CommentModal";
import { postType } from "@/pages";
import CommentBox from "./CommentBox";
import ShareCard from "./ShareCard";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";

interface props {
  post: postType;
  setCommentingPost: React.Dispatch<React.SetStateAction<postType | null>>;
  setSharingPost: React.Dispatch<React.SetStateAction<postType | null>>;
  setSharing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostsCard({
  post,
  setCommentingPost,
  setSharing,
  setSharingPost,
}: props) {
  const { authorInfo, caption, medias, postType, sharedPost } = post;
  const { authUser } =
    React.useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  console.log(sharedPost);

  return (
    <Card
      className={`my-5 shadow-lg ${
        authUser?.email !== authorInfo?.[0]?.email
          ? postType === "friends"
            ? !authUser?.FriendList?.includes(authorInfo?.[0]?.email)
              ? "hidden"
              : "inline"
            : "inline"
          : "inline"
      }`}
    >
      <div className="flex space-x-3 justify-start p-2">
        <Avatar
          src={authorInfo?.[0]?.profilePic}
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
        >
          {authorInfo?.[0]?.userName[0]}
        </Avatar>
        <div>
          <div className="flex space-x-1 items-center">
            <p>{authorInfo?.[0]?.userName}</p>
          </div>
          <div className="text-sm">
            16, October , 2023 .{" "}
            <Chip
              size="small"
              label={postType === "friends" ? <People /> : <Public />}
            />
          </div>
        </div>
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      {sharedPost?.length > 0 ? (
        <div className="border border-solid border-gray-500 m-5">
          {sharedPost?.map((post) => (
            <ShareCard post={post} key={post?._id} />
          ))}
        </div>
      ) : (
        <div>
          {/* <ImageGrid> */}
          <Divider />
          {medias?.length === 1 && (
            <img className="w-full h-40 lg:h-96" src={medias[0].src} alt="" />
          )}
          {medias?.length > 1 && <ImageGrid itemData={medias} />}
        </div>
      )}

      <Divider />
      <PostFooter
        setSharing={setSharing}
        setSharingPost={setSharingPost}
        setCommentingPost={setCommentingPost}
        post={post}
      />
      <Divider />
      {post?.comments?.length > 0 && (
        <div className="p-2 border-2 border-t-0 border-gray-500 border-solid">
          <CommentBox
            setCommentingPost={setCommentingPost}
            modalToggler={null}
            post={post}
          />
        </div>
      )}
    </Card>
  );
}
