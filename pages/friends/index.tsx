import PeopleCard from "@/components/people/PeopleCard";
import { AUTH_CONTEXT, authInfoType } from "@/contexts/AuthProvider";
import { IUser } from "@/db/models/User";
import useGetAllUser from "@/hooks/useGetAllUser";
import Main from "@/layouts/Main";
import React from "react";

const Friends = () => {
  const { people } = useGetAllUser();
  const [Friends, setFriends] = React.useState<IUser[] | any[]>([]);
  const { authUser } =
    React.useContext<authInfoType | null>(AUTH_CONTEXT) || {};

  React.useEffect(() => {
    if (people) {
      setFriends([
        ...people?.filter((user: IUser) =>
          authUser?.FriendList?.includes(user?.email)
        ),
      ]);
    }
  }, [people]);

  console.log(people);

  return (
    <Main>
      {Friends?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full">
          {Friends?.map((user: IUser) => (
            <PeopleCard key={user?._id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-3xl lg:text-5xl flex items-center justify-center h-screen my-auto overflow-y-hidden">
          You have no Friends Yet
        </div>
      )}
    </Main>
  );
};

export default Friends;
