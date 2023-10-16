import { useQuery } from "@tanstack/react-query";

const useGetAllUser = () => {
  const {
    data: people = [],
    refetch: peopleRefetch,
    isLoading: peopleLoading,
  } = useQuery({
    queryKey: [],
    queryFn: () => fetch("/api/get-all-user").then((res) => res.json()),
  });

  return { people, peopleLoading, peopleRefetch };
};

export default useGetAllUser;
