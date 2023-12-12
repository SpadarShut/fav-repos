import { routes } from "@/shared/routes";
import { Tab, Tabs as MUITabs } from "@mui/material";
import { Link, matchPath, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Search } from "@mui/icons-material";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export function Tabs() {
  const routeMatch = useRouteMatch([routes.favorites, routes.home]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <MUITabs value={currentTab} centered>
      <Tab
        icon={<Search />}
        iconPosition="start"
        label="Search repositories"
        value={routes.home}
        to={routes.home}
        component={Link}
      />
      <Tab
        icon={<FavoriteIcon />}
        iconPosition="start"
        label="Favorites"
        value={routes.favorites}
        to={routes.favorites}
        component={Link}
      />
    </MUITabs>
  );
}
