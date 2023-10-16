import { useQuery } from "@tanstack/react-query";

const useGetDbUser = (userEmail: string | null | undefined) => {
  const {
    data: dbUser,
    refetch: dbUserRefetch,
    isLoading: dbUserLoading,
  } = useQuery({
    queryKey: ["get-db-user", userEmail as string],
    queryFn: async () => {
      if (userEmail) {
        return await fetch(`/api/get-db-user?email=${userEmail}`).then((res) =>
          res.json()
        );
      } else {
        return null;
      }
    },
    refetchInterval: 500,
  });

  return { dbUser, dbUserRefetch, dbUserLoading };
};

export default useGetDbUser;
