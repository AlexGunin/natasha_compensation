import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export const BENEFITS_QUERY_KEY = "benefits";

export const useBenefitsQuery = () =>
  useQuery({
    queryKey: [BENEFITS_QUERY_KEY],
    queryFn: api.benefits.get,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 3000,
  });
