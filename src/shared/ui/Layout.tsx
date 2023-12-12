import { Outlet } from "react-router-dom";
import { AppBar, Container, Stack } from "@mui/material";
import { Tabs } from "@/shared/ui/Tabs";

export const Layout = () => {
  return (
    <Container maxWidth="md">
      <AppBar component="nav">
        <Container maxWidth="md">
          <h1>GitHub Searcher</h1>
        </Container>
      </AppBar>
      <Stack sx={{ paddingTop: 12 }} gap={6}>
        <Tabs />
        <Outlet />
      </Stack>
    </Container>
  );
};
