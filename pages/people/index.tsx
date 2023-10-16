import PeopleCard from "@/components/people/PeopleCard";
import { IUser } from "@/db/models/User";
import useGetAllUser from "@/hooks/useGetAllUser";
import Main from "@/layouts/Main";
import React from "react";

const People = () => {
  const { people } = useGetAllUser();

  console.log(people);

  return (
    <Main>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full">
        {people?.map((user: IUser) => (
          <PeopleCard key={user?._id} user={user} />
        ))}
      </div>
    </Main>
  );
};

export default People;
