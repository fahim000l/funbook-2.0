import React, { useContext, useState, useEffect } from "react";
import { Divider, Avatar, TextField } from "@mui/material";
import { Sell, PermMedia } from "@mui/icons-material";
import FeedingModal from "./FeedingModal";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { FormikProps, useFormik } from "formik";
import { IMedia } from "@/db/models/Media";
import { ITags } from "@/db/models/Tags";

export interface postFormik {
  postType: string;
  medias: { mediaType: string; src: string }[] | any[];
  tags: { email: string; userName: string }[] | any[];
  caption: string;
  author: string;
}

const FeedingOption = () => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [lobyStatus, SetLobyStatus] = useState("");

  const Formik: FormikProps<postFormik> = useFormik<postFormik>({
    initialValues: {
      postType: "friends",
      medias: [],
      tags: [],
      caption: "",
      author: authUser?.email as string,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (authUser?.email) {
      Formik.values.author = authUser?.email;
    }
  }, [authUser]);

  return (
    <div className="card w-full bg-base-200 shadow-xl mb-5">
      <div className="card-body p-2 lg:p-5">
        <label
          onClick={() => SetLobyStatus("neutral")}
          htmlFor="feedingModal"
          className="flex items-center space-x-3"
        >
          <Avatar src={authUser?.profilePic} />
          <label
            htmlFor="feedingModal"
            className="p-2 rounded-lg normal-case bg-white w-full text-start text-sm"
          >
            What's on ypur mind ?
          </label>
        </label>
        <Divider />
        <div>
          <label
            onClick={() => SetLobyStatus("tagging")}
            htmlFor="feedingModal"
            className="btn lg:btn-md btn-sm normal-case w-[50%]"
          >
            <Sell />
            <span className="hidden lg:inline">Tag Someone</span>
          </label>
          <label
            onClick={() => SetLobyStatus("media")}
            htmlFor="feedingModal"
            className="btn normal-case w-[50%]"
          >
            <PermMedia />
            <span className="hidden lg:inline">Photos / Videos</span>
          </label>
        </div>
      </div>
      <FeedingModal
        Formik={Formik}
        lobyStatus={lobyStatus}
        SetLobyStatus={SetLobyStatus}
      />
    </div>
  );
};

export default FeedingOption;
