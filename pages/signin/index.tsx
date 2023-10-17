import Auth from "@/layouts/Auth";
import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Google,
  Visibility,
  VisibilityOff,
  AlternateEmail,
} from "@mui/icons-material";
import Link from "next/link";
import { IconButton } from "@mui/joy";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { Context } from "vm";
import useStoreUser from "@/hooks/useStoreUser";
import { useFormik } from "formik";
import { useRouter } from "next/router";

interface storingUserType {
  userName: string;
  profilePic: string;
  email: string;
}

interface valuesType {
  email: string;
  password: string;
}

const SignIn = () => {
  const [passVisible, setPassVisible] = useState<boolean>(false);
  const { googleSignin, signIn, dbUserLoading } =
    useContext<authInfoType | null>(AUTH_CONTEXT) || {};
  const [storingUser, SetStoringUser] = useState<storingUserType | null>(null);
  const { userStored } = useStoreUser(storingUser);
  const { push } = useRouter();

  useEffect(() => {
    if (userStored) {
      console.log(userStored);
      if (userStored) {
        fetch("/api/sign-jwt", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: storingUser?.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.success) {
              SetStoringUser(null);
              push("/");
            }
          });
      }
    }
  }, [userStored]);

  const handleGoogleSignIn = () => {
    if (googleSignin) {
      googleSignin()
        .then(({ user }) => {
          console.log(user);
          SetStoringUser({
            email: user?.email || "",
            profilePic: user?.photoURL || "",
            userName: user?.displayName || "",
          });
        })
        .catch(({ message }) => {
          console.log(message);
        });
    }
  };

  const Formik = useFormik<valuesType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: valuesType = { email: "", password: "" };

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

      if (errors.email || errors.password) {
        return errors;
      }
    },
    onSubmit: (values) => {
      console.log(values);

      if (signIn) {
        signIn(values.email, values.password)
          .then(({ user }) => {
            console.log(user);
            if (user?.email) {
              fetch("/api/sign-jwt", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: user?.email }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data?.success) {
                    SetStoringUser(null);
                    push("/");
                  }
                });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  });

  return (
    <Auth>
      <div className="p-5">
        <form onSubmit={Formik.handleSubmit}>
          <div className="flex flex-col space-y-5">
            <TextField
              InputProps={{
                endAdornment: <AlternateEmail />,
              }}
              fullWidth
              type="email"
              {...Formik.getFieldProps("email")}
              size="small"
              label={"Email"}
              error={Formik.errors.email ? true : false}
              helperText={Formik.errors.email}
            />
            <div>
              <TextField
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setPassVisible(!passVisible)}>
                      {passVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                fullWidth
                error={Formik.errors.password ? true : false}
                helperText={Formik.errors.password}
                size="small"
                type={passVisible ? "text" : "password"}
                label={"Password"}
                {...Formik.getFieldProps("password")}
                name="password"
              />
              <Button
                className="mt-2 font-bold normal-case"
                size="small"
                variant="text"
              >
                Forgot Password ?
              </Button>
            </div>
          </div>
          <LoadingButton
            type="submit"
            loading={dbUserLoading}
            variant="contained"
            fullWidth
            className="text-white bg-[steelblue]"
          >
            Log In
          </LoadingButton>
        </form>
        <Divider className="my-5">OR</Divider>
        <div>
          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            variant="outlined"
            startIcon={<Google />}
          >
            Sign In with Google
          </Button>
        </div>
        <Link href={"/signup"}>
          <Button
            className="mt-2 font-bold normal-case"
            size="small"
            variant="text"
          >
            Doesn't have an account ?
          </Button>
        </Link>
      </div>
    </Auth>
  );
};

export default SignIn;
