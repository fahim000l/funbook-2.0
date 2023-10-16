import React from "react";
import { Avatar, Chip, Divider, IconButton } from "@mui/material";
import { People } from "@mui/icons-material";
import TextArea from "../tools/TextArea";
import { Sell, PermMedia, Cancel } from "@mui/icons-material";

interface props {
  SetLobyStatus: React.Dispatch<React.SetStateAction<string>>;
  lobyStatus: String;
  postType: String;
}

const Loby = ({ SetLobyStatus, lobyStatus, postType }: props) => {
  return (
    <React.Fragment>
      <p className="font-bold text-center">Create Post</p>
      <Divider className="my-2" />
      <div className="flex items-center space-x-3 mb-2">
        <Avatar />
        <div>
          <h3 className="text-lg font-bold">Md Fahim Faisal</h3>
          <div onClick={() => SetLobyStatus("post-typing")}>
            <Chip
              icon={<People />}
              size="small"
              className="cursor-pointer"
              label={postType}
            />
          </div>
        </div>
      </div>
      {lobyStatus === "media" ? (
        <div>
          <TextArea lobyStatus={lobyStatus} />
          <div className="p-2 border border-solid border-gray-300 rounded-lg">
            <div className="flex flex-col justify-end items-end text-center bg-base-200 rounded-lg">
              <IconButton onClick={() => SetLobyStatus("neutral")}>
                <Cancel />
              </IconButton>
              <div className="p-5 w-full">
                <PermMedia />
                <p className="font-bold">Add Photos/Videos</p>
                <p>or drag and drop</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TextArea lobyStatus={lobyStatus} />
      )}
      <div className="flex items-center justify-between my-2 p-2 rounded-lg border border-solid border-gray-300">
        <p>Add to your post</p>{" "}
        <div className="flex space-x-3">
          <IconButton
            onClick={() => SetLobyStatus("tagging")}
            className="bg-blue-300 hover:bg-blue-300 text-blue-700"
          >
            <Sell />
          </IconButton>
          <IconButton
            onClick={() => SetLobyStatus("media")}
            className="bg-green-300 hover:bg-green-300 text-green-700"
          >
            <PermMedia />
          </IconButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loby;
