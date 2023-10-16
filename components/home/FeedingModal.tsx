import React, { useState } from "react";
import { Avatar } from "@mui/material";
import Loby from "./Loby";
import PostTyping from "./PostTyping";
import TaggingView from "./TaggingView";
import { postFormik } from "./FeedingOption";
import { FormikProps, FormikConfig } from "formik";

interface props {
  lobyStatus: String;
  SetLobyStatus: React.Dispatch<React.SetStateAction<string>>;
  Formik: FormikProps<postFormik>;
}

const FeedingModal = ({ lobyStatus, SetLobyStatus, Formik }: props) => {
  const [tagged, setTagged] = useState([]);

  return (
    <div>
      <input type="checkbox" id="feedingModal" className="modal-toggle" />
      <div className="modal modal-bottom lg:modal-middle z-[300]">
        <div className="modal-box p-2 h-[500px]">
          {lobyStatus === "neutral" || lobyStatus === "media" ? (
            <Loby
              Formik={Formik}
              lobyStatus={lobyStatus}
              SetLobyStatus={SetLobyStatus}
            />
          ) : lobyStatus === "tagging" ? (
            <TaggingView
              Formik={Formik}
              SetLobyStatus={SetLobyStatus}
              setTagged={setTagged}
            />
          ) : (
            <PostTyping Formik={Formik} SetLobyStatus={SetLobyStatus} />
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
