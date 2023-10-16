import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CardMedia,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import { People, Public } from "@mui/icons-material";
import TextArea from "../tools/TextArea";
import { Sell, PermMedia, Cancel } from "@mui/icons-material";
import { postFormik } from "./FeedingOption";
import { FormikProps } from "formik";
import useBase64 from "@/hooks/useBase64";

interface props {
  SetLobyStatus: React.Dispatch<React.SetStateAction<string>>;
  lobyStatus: String;
  Formik: FormikProps<postFormik>;
}

const Loby = ({ SetLobyStatus, lobyStatus, Formik }: props) => {
  const postMediaInput = useRef<HTMLInputElement | null>(null);
  const [convertingImage, setCOnvertingImage] = useState<File | null>(null);
  const { convertedImage } = useBase64(convertingImage);

  useEffect(() => {
    if (convertedImage) {
      Formik.setFieldValue("medias", [
        ...Formik.values.medias,
        { mediaType: convertingImage?.type, src: convertedImage },
      ]);
      setCOnvertingImage(null);
    }
  }, [convertedImage]);

  return (
    <React.Fragment>
      <p className="font-bold text-center">Create Post</p>
      <Divider className="lg:my-2" />
      <div className="flex items-center space-x-3 mb-2">
        <Avatar />
        <div>
          <h3 className="lg:text-lg text-sm font-bold flex">
            Md Fahim Faisal
            {Formik.values.tags.length > 0
              ? Formik.values.tags.length === 1
                ? ` is with ${Formik.values.tags?.[0]?.userName.split(" ")[0]}`
                : Formik.values.tags.length === 2
                ? ` is with ${
                    Formik.values.tags?.[0]?.userName.split(" ")[0]
                  } and
          ${Formik.values.tags?.[1]?.userName}`
                : ` is with ${Formik.values.tags?.[0]?.userName.split(" ")[0]},
          ${Formik.values.tags?.[1]?.userName.split(" ")[0]} and
          ${Formik.values.tags?.length - 2} others`
              : ""}
            {/* <IsWith Formik={Formik} /> */}
          </h3>
          <div onClick={() => SetLobyStatus("post-typing")}>
            <Chip
              icon={
                Formik.initialValues.postType === "friends" ? (
                  <People />
                ) : (
                  <Public />
                )
              }
              size="small"
              className="cursor-pointer"
              label={Formik.initialValues.postType}
            />
          </div>
        </div>
      </div>
      <input
        onChange={(e) => setCOnvertingImage(e?.target?.files?.[0] as File)}
        ref={postMediaInput}
        type="file"
        name=""
        id=""
        className="hidden"
      />
      {lobyStatus === "media" ? (
        <div>
          <TextArea
            handleChange={(e) => (Formik.values.caption = e.target.value)}
            lobyStatus={lobyStatus}
          />
          {Formik.values.medias.length > 0 ? (
            <div className="grid grid-cols-4">
              {/* <ImageGrid> */}
              {Formik.values.medias?.map((media) => {
                if (media.mediaType?.includes("image")) {
                  return <img className="w-20 h-20" src={media?.src} alt="" />;
                } else if (media.mediaType?.includes("video")) {
                  return (
                    <video className="w-20 h-20" controls src={media?.src} />
                  );
                }
              })}
              {/* </ImageGrid> */}
            </div>
          ) : (
            <div className="p-2 border border-solid border-gray-300 rounded-lg">
              <div className="flex flex-col justify-end items-end text-center bg-base-200 rounded-lg">
                <IconButton
                  size="small"
                  onClick={() => SetLobyStatus("neutral")}
                >
                  <Cancel />
                </IconButton>
                <div
                  onClick={() => postMediaInput.current?.click()}
                  className="lg:p-5 w-full cursor-pointer"
                >
                  <PermMedia />
                  <p className="font-bold text-sm">Add Photos/Videos</p>
                  <p className="text-sm">or drag and drop</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <TextArea
          handleChange={(e) => (Formik.values.caption = e.target.value)}
          lobyStatus={lobyStatus}
        />
      )}
      <div className="flex items-center justify-between my-2 p-2 rounded-lg border border-solid border-gray-300">
        <p>Add to your post</p>{" "}
        <div className="flex space-x-3">
          <IconButton
            size="small"
            onClick={() => SetLobyStatus("tagging")}
            className="bg-blue-300 hover:bg-blue-300 text-blue-700"
          >
            <Sell />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              if (Formik.values.medias.length > 0) {
                SetLobyStatus("media");
                postMediaInput.current?.click();
                console.log(postMediaInput);
              } else {
                SetLobyStatus("media");
              }
            }}
            className="bg-green-300 hover:bg-green-300 text-green-700"
          >
            <PermMedia />
          </IconButton>
        </div>
      </div>
      <Button
        onClick={Formik.handleSubmit as () => void}
        fullWidth
        variant="contained"
        size="small"
        className="bg-[steelblue] text-white"
      >
        Post
      </Button>
    </React.Fragment>
  );
};

export default Loby;
