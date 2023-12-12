import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { apiClient } from "@/shared/api";
import { GET_REPOSITORIES, GET_REPOSITORY } from "@/entities/repo/gql";
import { useCallback } from "react";
import { queryKeys } from "@/entities/repo/queryKeys";

const getRepo = async (name: string, owner: string) => {
  const data = await apiClient.request(GET_REPOSITORY, { name, owner });

  return data.repository;
};

export type Repository = NonNullable<Awaited<ReturnType<typeof getRepo>>>;

export const useRepository = (repoName?: string, ownerId?: string) => {
  return useQuery({
    queryKey: queryKeys.repository(repoName || "", ownerId || ""),
    queryFn: async ({ queryKey: [, name, owner] }) => {
      if (!name || !owner) {
        throw new Error(
          `Error fetching repository: name or owner is not provided`,
        );
      }
      const data = await apiClient.request(GET_REPOSITORY, { name, owner });

      return data.repository;
    },
    enabled: !!repoName && !!ownerId,
  });
};

export const useRepositories = (query: string) => {
  return useQuery({
    queryKey: queryKeys.repositories(query),
    queryFn: async ({ queryKey: [, query] }) => {
      const data = await apiClient.request(GET_REPOSITORIES, {
        query: query,
      });

      return data.search.nodes as Repository[];
    },
    placeholderData: keepPreviousData,
    enabled: !!query,
  });
};

export const useRepositoryCacher = () => {
  const queryClient = useQueryClient();

  return useCallback((repo: Repository) => {
    queryClient.setQueryData(
      queryKeys.repository(repo.name, repo.owner.login),
      repo,
    );
  }, []);
};
