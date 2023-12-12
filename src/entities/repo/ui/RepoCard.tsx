import { Repository } from "@/entities/repo/api";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { Chip, IconButton, Rating, Stack, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  repo: Repository;
  isFavorite: boolean;
  onToggleFavorite: (repo: Repository) => void;
  showRating?: boolean;
  rating?: number;
  onSetRating?: (rating: number) => void;
};

export const RepoCard = (props: Props) => {
  const {
    repo,
    isFavorite,
    onToggleFavorite,
    showRating,
    onSetRating,
    rating,
  } = props;

  const languages = repo.languages?.nodes || [];

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack gap={0.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4" component="div">
                {repo.name}
              </Typography>

              <Tooltip title={isFavorite ? "Unfavorite" : "Make favorite"}>
                <IconButton onClick={() => onToggleFavorite(repo)}>
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography color="text.secondary">{repo.description}</Typography>
          </Stack>

          <Typography
            color="text.secondary"
            component="a"
            href={repo.url}
            target="_blank"
          >
            {repo.url}
          </Typography>

          <Stack direction="row" spacing={2}>
            {languages?.length > 0 && (
              <Box>{languages?.map((lang) => <Chip label={lang?.name} />)}</Box>
            )}
            <Stack direction="row" gap={1}>
              <StarIcon /> {repo.stargazers.totalCount}
            </Stack>
          </Stack>

          {showRating && (
            <Box>
              <Rating
                value={rating}
                onChange={(_, newValue) => {
                  onSetRating && onSetRating(newValue || 0);
                }}
              />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
