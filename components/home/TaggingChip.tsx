import useGetDbUser from "@/hooks/useGetDbUser";
import { Chip } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { postFormik } from "./FeedingOption";

interface props {
  user: { email: string; userName: string };
  Formik: FormikProps<postFormik>;
}

const TaggingChip = ({ user, Formik }: props) => {
  return (
    <div>
      <Chip
        onDelete={() =>
          Formik.setFieldValue("tags", [
            ...Formik.values.tags.filter((tg) => tg !== user),
          ])
        }
        label={user?.userName?.split(" ")[0]}
      />
    </div>
  );
};

export default TaggingChip;
