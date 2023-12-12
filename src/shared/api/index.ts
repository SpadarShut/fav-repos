import { GraphQLClient } from "graphql-request";
import { QueryClient } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_GITHUB_API_URL;
const token = import.meta.env.VITE_GITHUB_API_TOKEN;

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

export const apiClient = new GraphQLClient(apiUrl, {
  headers: {
    Authorization: `bearer ${token}`,
  },
});
