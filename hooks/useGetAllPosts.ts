import { useQuery } from "@tanstack/react-query";

const useGetAllPosts = () => {
  const {
    data: posts,
    refetch: postRefetch,
    isLoading: postLoading,
  } = useQuery({
    queryKey: [],
    queryFn: () => fetch("/api/get-all-posts").then((res) => res.json()),
  });

  return { posts, postRefetch, postLoading };
};

export default useGetAllPosts;
