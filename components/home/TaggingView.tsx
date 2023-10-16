import React from "react";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Avatar,
  Chip,
} from "@mui/material";
import { ArrowLeft, Search, Cancel } from "@mui/icons-material";

interface props {
  setTagged: React.Dispatch<React.SetStateAction<never[]>>;
  SetLobyStatus: React.Dispatch<React.SetStateAction<string>>;
}

const TaggingView = ({ setTagged, SetLobyStatus }: props) => {
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
          <Button>Done</Button>
        </div>
        <div className="mt-2">
          <p className="text-gray-600 font-bold">Tagged</p>
          <div className="border border-gray-500 border-solid p-2 rounded-lg">
            <Chip onDelete={() => console.log("delete")} label={"Fahim"} />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-gray-600 font-bold">Suggestions</p>
          <div className="flex items-center space-x-3 rounded-lg hover:bg-base-200 p-2 cursor-pointer">
            <Avatar />
            <p>Md Fahim Faisal</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaggingView;
