import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CatchDash from "../components/CatchDash";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, //  30 s
    },
  },
});

export default function Index() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
              CATCH Dashboard
            </Typography>
            <Typography variant="subtitle1" component="p">
              Job queue, query, and observation summaries.
            </Typography>
          </Box>
          <CatchDash />
        </Container>
      </QueryClientProvider>
    </>
  );
}
