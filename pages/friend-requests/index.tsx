import PeopleCard from "@/components/people/PeopleCard";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { IUser } from "@/db/models/User";
import useGetAllUser from "@/hooks/useGetAllUser";
import Main from "@/layouts/Main";
import React from "react";

const FriendRequest = () => {
  const { people } = useGetAllUser();
  const [Requests, setRequests] = React.useState<IUser[] | any[]>([]);
  const { authUser } =
    React.useContext<authInfoType | null>(AUTH_CONTEXT) || {};

  React.useEffect(() => {
    if (people) {
      setRequests([
        ...people?.filter((user: IUser) =>
          authUser?.requestList?.includes(user?.email)
        ),
      ]);
    }
  }, [people]);

  console.log(people);

  return (
    <Main>
      {Requests?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full">
          {Requests?.map((user: IUser) => (
            <PeopleCard key={user?._id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-3xl lg:text-5xl flex items-center justify-center h-screen my-auto overflow-y-hidden">
          You have no Friend Request
        </div>
      )}
    </Main>
  );
};

export default FriendRequest;
