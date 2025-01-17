import * as React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import JobQueue from "./JobQueue";
import Observations from "./Observations";
import Queries from "./Queries";

export default function CatchDash() {
  return (
    <Box>
      <JobQueue />
      <Divider sx={{ my: 4 }} />
      <Queries />
      <Divider sx={{ my: 4 }} />
      <Observations />
    </Box>
  );
}
