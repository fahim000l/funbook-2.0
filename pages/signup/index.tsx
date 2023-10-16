import Auth from "@/layouts/Auth";
import React, { useState, useRef, useContext, useEffect } from "react";
import { TextField, Button, Divider, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Google,
  Visibility,
  VisibilityOff,
  AlternateEmail,
  AccountCircle,
  AccountBox,
} from "@mui/icons-material";
import Link from "next/link";
import { IconButton } from "@mui/joy";
import useBase64 from "@/hooks/useBase64";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import useStoreUser from "@/hooks/useStoreUser";
import { useRouter } from "next/router";

interface valueType {
  profilePic: string;
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}

interface storingValueType {
  profilePic: string;
  userName: string;
  email: string;
}

const SignUp = () => {
  const { createAccount, dbUserLoading } =
    useContext<authInfoType | null>(AUTH_CONTEXT) || {};

  const [passVisible, setPassVisible] = useState(false);
  const [cPassVisible, setCPassVisible] = useState(false);
  const [uploadingImgFile, setUploadingImageFile] = useState<File | null>(null);
  const { convertedImage } = useBase64(uploadingImgFile);
  const [storingUser, setStoringUser] = useState<storingValueType | null>(null);
  const { userStored } = useStoreUser(storingUser);
  const { push } = useRouter();

  useEffect(() => {
    if (userStored) {
      console.log(true);
      push("/");
    }
  }, [userStored]);

  const fileUploader = useRef<HTMLInputElement | null>(null);
  const Formik = useFormik<valueType>({
    initialValues: {
      profilePic: "",
      cPassword: "",
      email: "",
      password: "",
      userName: "",
    },
    validate: (values) => {
      let errors: valueType = {
        cPassword: "",
        email: "",
        password: "",
        profilePic: "",
        userName: "",
      };
      if (!values.userName) {
        errors.userName = "User Name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must contain at least 8 characters";
      }

      if (!values.cPassword) {
        errors.cPassword = "Password is required";
      } else if (values.password !== values.cPassword) {
        errors.cPassword = "Password did not matched";
        errors.password = "Password did not matched";
      } else if (values.cPassword.length < 8) {
        errors.cPassword = "Password must contain at least 8 characters";
      }

      if (
        errors?.cPassword ||
        errors?.password ||
        errors?.email ||
        errors?.profilePic ||
        errors?.userName
      ) {
        return errors;
      }
    },
    onSubmit: (values) => {
      if (convertedImage) {
        values.profilePic = convertedImage;
      }
      console.log(values);
      if (createAccount !== undefined) {
        createAccount(values.email, values.password)
          .then(({ user }) => {
            console.log(user);
            setStoringUser({
              email: values.email,
              profilePic: values.profilePic,
              userName: values.userName,
            });
          })
          .then((err) => {
            console.error(err);
          });
      }
    },
  });

  return (
    <Auth>
      <div className="p-5">
        <form onSubmit={Formik.handleSubmit}>
          <div className="flex flex-col space-y-5 items-center">
            <div className="lg:w-[50%] text-center">
              <Avatar
                src={convertedImage}
                sx={{
                  width: 100,
                  height: 100,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                variant="rounded"
              >
                <AccountBox sx={{ width: 100, height: 100 }} />
              </Avatar>
              <input
                onChange={(e) =>
                  e?.target?.files?.[0] &&
                  setUploadingImageFile(e?.target?.files?.[0])
                }
                ref={fileUploader}
                className="hidden"
                type="file"
              />
              <Button
                onClick={() => {
                  if (fileUploader.current) {
                    fileUploader.current.click();
                  }
                }}
                className="text-[blue] font-bold text-center text-sm normal-case"
              >
                Upload Profile Picture
              </Button>
            </div>
            <TextField
              InputProps={{
                endAdornment: <AccountCircle />,
              }}
              fullWidth
              type="text"
              size="small"
              label={"User Name"}
              error={Formik.errors.userName ? true : false}
              helperText={Formik.errors.userName}
              {...Formik.getFieldProps("userName")}
            />
            <TextField
              InputProps={{
                endAdornment: <AlternateEmail />,
              }}
              fullWidth
              type="email"
              size="small"
              label={"Email"}
              error={Formik.errors.email ? true : false}
              helperText={Formik.errors.email}
              {...Formik.getFieldProps("email")}
            />
            <TextField
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setPassVisible(!passVisible)}>
                    {passVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              fullWidth
              size="small"
              type={passVisible ? "text" : "password"}
              label={"Password"}
              error={Formik.errors.password ? true : false}
              helperText={Formik.errors.password}
              {...Formik.getFieldProps("password")}
            />
            <TextField
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setCPassVisible(!cPassVisible)}>
                    {cPassVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              fullWidth
              size="small"
              type={cPassVisible ? "text" : "password"}
              label={"Confirm Password"}
              error={Formik.errors.cPassword ? true : false}
              helperText={Formik.errors.cPassword}
              {...Formik.getFieldProps("cPassword")}
            />
          </div>
          <LoadingButton
            loading={dbUserLoading}
            type="submit"
            variant="contained"
            fullWidth
            className="text-white bg-[steelblue] mt-2"
          >
            Create Accpunt
          </LoadingButton>
        </form>
        <Link href={"/signin"}>
          <Button
            className="mt-2 font-bold normal-case"
            size="small"
            variant="text"
          >
            Already have an account ?
          </Button>
        </Link>
      </div>
    </Auth>
  );
};

export default SignUp;
