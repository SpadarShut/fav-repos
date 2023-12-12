import { useDeferredValue, useState } from "react";
import {
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { NoContent } from "@/shared/ui/NoContent";
import { useRepositories, useRepositoryCacher } from "@/entities/repo/api";
import { useFavorites, toggleFavorite } from "@/entities/favorite/api";
import { RepoCard } from "@/entities/repo/ui/RepoCard";

export const RepoList = () => {
  const [search, setSearch] = useState("AI");
  const deferredSearch = useDeferredValue(search);
  const { data, error, isPending, isFetching } =
    useRepositories(deferredSearch);
  const { favorites } = useFavorites();
  const cacheRepo = useRepositoryCacher();

  return (
    <Stack gap={4}>
      <TextField
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        fullWidth
        label="Search GitHub repositories"
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isFetching && !isPending ? <CircularProgress size={20} /> : null}
            </InputAdornment>
          ),
        }}
      />

      {isPending ? (
        <NoContent>
          <CircularProgress />
        </NoContent>
      ) : error ? (
        <NoContent>Couldn't fetch data</NoContent>
      ) : (
        <Stack gap={4}>
          {data?.length ? (
            data?.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                isFavorite={favorites.has(repo.id)}
                onToggleFavorite={() => {
                  const shouldCache = !favorites.has(repo.id);
                  if (shouldCache) {
                    cacheRepo(repo);
                  }
                  toggleFavorite(repo);
                }}
              />
            ))
          ) : (
            <Typography align="center" variant="h5" py={8}>
              Nothing found for <em>{deferredSearch}</em>
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};
