import React, { useState } from "react";
import { Avatar } from "@mui/material";
import Loby from "./Loby";
import PostTyping from "./PostTyping";
import TaggingView from "./TaggingView";

interface props {
  lobyStatus: String;
  SetLobyStatus: React.Dispatch<React.SetStateAction<string>>;
}

const FeedingModal = ({ lobyStatus, SetLobyStatus }: props) => {
  const [postType, setPostType] = useState("public");
  const [tagged, setTagged] = useState([]);

  return (
    <div>
      <input type="checkbox" id="feedingModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          {lobyStatus === "neutral" || lobyStatus === "media" ? (
            <Loby
              postType={postType}
              lobyStatus={lobyStatus}
              SetLobyStatus={SetLobyStatus}
            />
          ) : lobyStatus === "tagging" ? (
            <TaggingView SetLobyStatus={SetLobyStatus} setTagged={setTagged} />
          ) : (
            <PostTyping
              setPostType={setPostType}
              SetLobyStatus={SetLobyStatus}
            />
          )}
        </div>
        <label className="modal-backdrop" htmlFor="feedingModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default FeedingModal;
