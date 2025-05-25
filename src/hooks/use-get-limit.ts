import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

const DEFAULT_LIMIT = 80000;

export const useGetLimit = () => {
    const { data: limit } = useQuery({
        queryKey: ["limit"],
        queryFn: api.limit.get,
        staleTime: Infinity,
      });

    return limit ?? DEFAULT_LIMIT;
}