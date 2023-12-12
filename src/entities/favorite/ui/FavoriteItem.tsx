import { useRepository, useRepositoryCacher } from "@/entities/repo/api";
import { RepoCard } from "@/entities/repo/ui/RepoCard";
import { toggleFavorite, useFavorites } from "@/entities/favorite/api";
import { useRating } from "@/entities/rating/api";

type Props = {
  id: string;
};

export const FavoriteItem = (props: Props) => {
  const { favorites } = useFavorites();
  const meta = favorites.get(props.id);
  const cacheRepo = useRepositoryCacher();
  const {
    data: repo,
    isPending,
    isError,
  } = useRepository(meta?.name, meta?.owner);

  const { ratings, setRating } = useRating();

  return isPending ? (
    <div>Loading</div>
  ) : isError ? (
    <div>Error</div>
  ) : repo ? (
    <RepoCard
      repo={repo}
      isFavorite={favorites.has(repo.id)}
      showRating
      rating={ratings[repo.id]}
      onSetRating={(rating) => {
        setRating(repo.id, rating);
      }}
      onToggleFavorite={() => {
        const shouldCache = !favorites.has(repo.id);
        if (shouldCache) {
          cacheRepo(repo);
        }
        toggleFavorite(repo);
      }}
    />
  ) : null;
};
