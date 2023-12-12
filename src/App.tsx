import { Routes, Route, BrowserRouter } from "react-router-dom";
import { routes } from "./shared/routes";
import { RepoList } from "./entities/repo/ui/RepoList";
import { QueryClientProvider } from "@tanstack/react-query";
import { reactQueryClient } from "@/shared/api";
import { Layout } from "@/shared/ui/Layout";
import { FavoritesList } from "@/entities/favorite/ui/FavoritesList";
import CssBaseline from "@mui/material/CssBaseline";

export const App = () => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route index element={<RepoList />} />
            <Route path={routes.favorites} element={<FavoritesList />} />
            <Route path="*" element={<div>404 Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
