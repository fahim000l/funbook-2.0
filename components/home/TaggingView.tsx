import React, { useContext } from "react";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Avatar,
  Chip,
} from "@mui/material";
import { ArrowLeft, Search, Cancel } from "@mui/icons-material";
import PeopleSelect from "./PeopleSelect";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { FormikProps } from "formik";
import { postFormik } from "./FeedingOption";
import TaggingChip from "./TaggingChip";

interface props {
  setTagged: React.Dispatch<React.SetStateAction<never[]>>;
  SetLobyStatus: React.Dispatch<React.SetStateAction<string>>;
  Formik: FormikProps<postFormik>;
}

const TaggingView = ({ setTagged, SetLobyStatus, Formik }: props) => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};

  return (
    <React.Fragment>
      <div className="flex items-center">
        <IconButton
          onClick={() => SetLobyStatus("neutral")}
          className="bg-base-300"
        >
          <ArrowLeft />
        </IconButton>
        <p className="font-bold text-center w-full">Tag Someone</p>
      </div>
      <Divider className="my-2" />
      <div>
        <div className="flex items-center">
          <TextField
            InputProps={{ startAdornment: <Search /> }}
            fullWidth
            placeholder="Search for friends"
            size="small"
          />
          <Button onClick={() => SetLobyStatus("neutral")}>Done</Button>
        </div>
        {Formik.values.tags.length > 0 && (
          <div className="mt-2">
            <p className="text-gray-600 font-bold">Tagged</p>
            <div className="grid grid-cols-3 gap-2 border border-gray-500 border-solid p-2 rounded-lg">
              {Formik.values.tags.map((user) => (
                <TaggingChip Formik={Formik} key={user} user={user} />
              ))}
            </div>
          </div>
        )}
        <div className="mt-2">
          <p className="text-gray-600 font-bold">Suggestions</p>
          {authUser?.FriendList?.map((user) => (
            <PeopleSelect Formik={Formik} key={user} user={user} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaggingView;
