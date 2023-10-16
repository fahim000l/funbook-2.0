import React, { useEffect, useState } from "react";

interface props {
  profilePic: string | undefined;
  email: string;
  userName: string;
}

const useStoreUser = (userData: props | null) => {
  const [userStored, setUserStored] = useState<boolean>(false);

  useEffect(() => {
    if (userData) {
      fetch(`/api/create-user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setUserStored(true);
          }
        });
    }
  }, [userData]);

  return { userStored };
};

export default useStoreUser;
