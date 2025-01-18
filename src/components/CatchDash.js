import * as React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import ApiSelector from "./ApiSelector";
import JobQueue from "./JobQueue";
import Observations from "./Observations";
import Queries from "./Queries";

export default function CatchDash() {
  const [apiUrl, setApiUrl] = React.useState(
    "https://catch-dev-api.astro.umd.edu"
  );
  return (
    <Box>
      <ApiSelector apiUrl={apiUrl} setApiUrl={setApiUrl} />
      <Divider sx={{ my: 4 }} />
      <JobQueue apiUrl={apiUrl} />
      <Divider sx={{ my: 4 }} />
      <Queries apiUrl={apiUrl} />
      <Divider sx={{ my: 4 }} />
      <Observations apiUrl={apiUrl} />
    </Box>
  );
}
