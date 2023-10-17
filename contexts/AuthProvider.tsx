import React, { useEffect, useState, createContext } from "react";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  Auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";
import app from "@/configs/firebase.config";
import useGetDbUser from "@/hooks/useGetDbUser";
import { IUser } from "@/db/models/User";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { useRouter } from "next/router";

interface props {
  children: React.ReactNode;
}

export interface authInfoType {
  googleSignin: () => Promise<UserCredential>;
  createAccount: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => void;
  authRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  authUser: IUser;
  dbUserLoading: boolean;
}

const googleProviewr = new GoogleAuthProvider();

const auth: Auth = getAuth(app);

export const AUTH_CONTEXT = createContext<authInfoType | null>(null);

const AuthProvider = ({ children }: props) => {
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const { push } = useRouter();
  const {
    dbUser: authUser,
    dbUserLoading,
    dbUserRefetch: authRefetch,
  } = useGetDbUser(sessionUser?.email);

  const googleSignin = () => {
    return signInWithPopup(auth, googleProviewr);
  };
  const createAccount = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      fetch("/api/session-out")
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setSessionUser(null);
            push("/signin");
          }
        });
    });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setSessionUser(user);
    });

    return () => unsubscribed();
  }, []);

  const authInfo: authInfoType = {
    googleSignin,
    createAccount,
    signIn,
    logOut,
    authRefetch,
    authUser,
    dbUserLoading,
  };

  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
