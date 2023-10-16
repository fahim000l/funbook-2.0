import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { IUser } from "@/db/models/User";
import React, { useContext } from "react";
import profilrImage from "../../public/profileImage.png";

import { Button } from "@mui/material";
import { Cancel, Message, PersonRemove, PersonAdd } from "@mui/icons-material";
import useGetAllUser from "@/hooks/useGetAllUser";

interface props {
  user: IUser;
}

const PeopleCard = ({ user }: props) => {
  const { authUser } = useContext<authInfoType | null>(AUTH_CONTEXT) || {};

  const { peopleRefetch } = useGetAllUser();
  const { profilePic, email, userName, FriendList, requestList, pendingList } =
    user;

  const handleSendRequest = () => {
    fetch("/api/add-request", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ sender: authUser?.email, receiver: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          peopleRefetch();
        }
      });
  };

  const handleCancleRequest = () => {
    fetch("/api/cancel-request", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ sender: authUser?.email, receiver: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          peopleRefetch();
        }
      });
  };

  const handleDenyRequest = () => {
    fetch("/api/deny-request", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ sender: email, receiver: authUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          peopleRefetch();
        }
      });
  };

  const handleAcceptRequest = () => {
    fetch("/api/accept-request", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ sender: email, receiver: authUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          peopleRefetch();
        }
      });
  };

  const handleUnfriend = () => {
    fetch("/api/unfriend", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ victim: email, trigger: authUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          peopleRefetch();
        }
      });
  };

  return (
    <div
      className={`card w-full static bg-base-100 lg:h-auto lg:flex-col flex-row shadow-2xl p-2 ${
        authUser?.email === email ? "hidden" : ""
      }`}
    >
      <figure className="lg:px-10 lg:pt-10 py-1 pl-1">
        <img
          src={
            profilePic ||
            "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
          }
          alt="Shoes"
          className="lg:rounded-xl rounded-full w-20 h-20 lg:w-full lg:h-40"
        />
      </figure>
      <div className="lg:px-5 lg:py-5 px-2 py-2 flex flex-col justify-evenly items-center text-center">
        <h2 className="lg:card-title font-bold mb-2">{userName}</h2>
        <div>
          {requestList?.includes(authUser?.email as string) ? (
            <Button
              onClick={handleCancleRequest}
              startIcon={<Cancel />}
              size="small"
              variant="outlined"
              className="bg-[white] text-[steelblue] normal-case"
            >
              Cancel
            </Button>
          ) : user?.pendingList?.includes(authUser?.email as string) ? (
            <div className="flex space-x-3 items-center">
              <Button
                onClick={handleAcceptRequest}
                variant="contained"
                className="bg-[steelblue] text-white normal-case"
              >
                Accept
              </Button>
              <Button
                onClick={handleDenyRequest}
                variant="outlined"
                className="bg-[white] text-[steelblue] normal-case"
              >
                Deny
              </Button>
            </div>
          ) : FriendList?.includes(authUser?.email as string) ? (
            <div className="flex flex-row space-x-3 items-center">
              <Button
                size="small"
                startIcon={<Message />}
                variant="contained"
                className="bg-[steelblue] text-white normal-case"
              >
                Message
              </Button>
              <Button
                size="small"
                startIcon={<PersonRemove />}
                onClick={handleUnfriend}
                variant="outlined"
                className="bg-[white] text-[steelblue] normal-case"
              >
                Unfriend
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSendRequest}
              startIcon={<PersonAdd />}
              size="small"
              variant="contained"
              className="bg-[steelblue] text-white normal-case"
            >
              Add Friend
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
