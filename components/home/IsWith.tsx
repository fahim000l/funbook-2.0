import { FormikProps } from "formik";
import React from "react";
import { postFormik } from "./FeedingOption";
import useGetDbUser from "@/hooks/useGetDbUser";

interface props {
  Formik: FormikProps<postFormik>;
}

const IsWith = ({ Formik }: props) => {
  return (
    <div hidden={Formik.values.tags?.length === 0}>
      {Formik.values.tags.length === 1
        ? `is with ${Formik.values.tags?.[0]?.userName}`
        : Formik.values.tags.length === 2
        ? `is with ${Formik.values.tags?.[0]?.userName} and
          ${Formik.values.tags?.[1]?.userName}`
        : `is with ${Formik.values.tags?.[0]?.userName},
          ${Formik.values.tags?.[1]?.userName} and
          ${Formik.values.tags?.length - 2} others`}
    </div>
  );
};

export default IsWith;
