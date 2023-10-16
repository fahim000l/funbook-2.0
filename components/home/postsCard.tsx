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

interface props {
  post: postType;
  setCommentingPost: React.Dispatch<React.SetStateAction<postType | null>>;
}

export default function PostsCard({ post, setCommentingPost }: props) {
  const { authorInfo, caption, medias, postType } = post;

  return (
    <Card className="my-5 shadow-lg">
      <div className="flex space-x-3 justify-start p-2">
        <Avatar
          src={authorInfo?.[0]?.profilePic}
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
        >
          R
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
      {/* <ImageGrid> */}
      <Divider />
      {medias?.length > 0 && <ImageGrid itemData={medias} />}
      <Divider />
      <PostFooter setCommentingPost={setCommentingPost} post={post} />
    </Card>
  );
}
