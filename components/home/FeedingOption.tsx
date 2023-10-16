import React, { useContext, useState } from "react";
import { Divider, Avatar, TextField } from "@mui/material";
import { Sell, PermMedia } from "@mui/icons-material";
import FeedingModal from "./FeedingModal";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";

const FeedingOption = () => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [lobyStatus, SetLobyStatus] = useState("");

  return (
    <div className="card w-full bg-base-200 shadow-xl mb-5">
      <div className="card-body">
        <label
          onClick={() => SetLobyStatus("neutral")}
          htmlFor="feedingModal"
          className="flex items-center space-x-3"
        >
          <Avatar src={authUser?.profilePic} />
          <label
            htmlFor="feedingModal"
            className="p-2 rounded-lg normal-case bg-white w-full text-start"
          >
            What's on ypur mind, {authUser?.userName}
          </label>
        </label>
        <Divider />
        <div>
          <label
            onClick={() => SetLobyStatus("tagging")}
            htmlFor="feedingModal"
            className="btn normal-case w-[50%]"
          >
            <Sell />
            Tag Someone
          </label>
          <label
            onClick={() => SetLobyStatus("media")}
            htmlFor="feedingModal"
            className="btn normal-case w-[50%]"
          >
            <PermMedia />
            Photos / Videos
          </label>
        </div>
      </div>
      <FeedingModal lobyStatus={lobyStatus} SetLobyStatus={SetLobyStatus} />
    </div>
  );
};

export default FeedingOption;
