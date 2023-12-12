import { useFavorites } from "@/entities/favorite/api";
import { FavoriteItem } from "@/entities/favorite/ui/FavoriteItem";
import { Stack } from "@mui/material";
import { NoContent } from "@/shared/ui/NoContent";

export const FavoritesList = () => {
  const { favorites } = useFavorites();
  return (
    <div>
      {favorites.size ? (
        <Stack gap={4}>
          {[...favorites].map(([id]) => (
            <FavoriteItem id={id} />
          ))}
        </Stack>
      ) : (
        <NoContent>No Favorite Repositories</NoContent>
      )}
    </div>
  );
};
