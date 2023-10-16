import React from "react";
import { Divider } from "@mui/material";
import { Public, People } from "@mui/icons-material";
import { postFormik } from "./FeedingOption";
import { FormikProps } from "formik";

interface props {
  SetLobyStatus: React.Dispatch<React.SetStateAction<string>>;
  Formik: FormikProps<postFormik>;
}

const PostTyping = ({ SetLobyStatus, Formik }: props) => {
  return (
    <React.Fragment>
      {" "}
      <p className="font-bold text-center">Post Audience</p>
      <Divider className="my-2" />
      <div>
        <p className="font-bold">Who can see your post?</p>
        <p className="my-2">
          Your post will show up in Feed, on your profile and in search results.
        </p>
        <p className="my-2">
          Your default audience is set to Friends, but you can change the
          audience of this specific post.
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => {
              Formik.initialValues.postType = "public";
              SetLobyStatus("neutral");
            }}
            className="btn"
          >
            <Public />
            Public
          </button>
          <button
            onClick={() => {
              Formik.initialValues.postType = "friends";
              SetLobyStatus("neutral");
            }}
            className="btn"
          >
            <People />
            Friends
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostTyping;
