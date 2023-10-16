import useGetDbUser from "@/hooks/useGetDbUser";
import { Avatar } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { postFormik } from "./FeedingOption";

interface props {
  user: string;
  Formik: FormikProps<postFormik>;
}

const PeopleSelect = ({ user, Formik }: props) => {
  const { dbUser } = useGetDbUser(user);

  return (
    <div
      className={`${
        Formik.values.tags.some((tg) => tg.user === dbUser?.email)
          ? "hidden"
          : "block"
      }`}
    >
      <div
        onClick={() => {
          Formik.setFieldValue("tags", [
            ...Formik.values.tags,
            { user: dbUser?.email, userName: dbUser?.userName },
          ]);
        }}
        className="flex items-center space-x-3 rounded-lg hover:bg-base-200 p-2 cursor-pointer"
      >
        <Avatar src={dbUser?.profilePic} />
        <p>{dbUser?.userName}</p>
      </div>
    </div>
  );
};

export default PeopleSelect;
