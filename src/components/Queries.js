import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { useStatusQueries } from "../services/catch";

function pluralize(word, count, suffix = "s") {
  return word + (count !== 1 ? suffix : "");
}

function primary({ days, jobs, finished, errored, in_progress }) {
  const total = finished + errored + in_progress;
  return (
    <>
      {jobs} {pluralize("job", jobs)} in the past{" "}
      {days == 1 ? "day" : `${days} days`}
    </>
  );
}

function secondary({ finished, errored, in_progress }) {
  const total = finished + errored + in_progress;
  return (
    <>
      <Typography component="span" variant="body2" sx={{ display: "inline" }}>
        {total} {pluralize("search", total, "es")} by source
        {errored > 0 && (
          <Typography
            component="span"
            variant="body2"
            sx={{ color: "red", display: "inline", paddingLeft: 1 }}
          >
            ({errored} errored)
          </Typography>
        )}
      </Typography>
    </>
  );
}

export default function Queries() {
  const queries = useStatusQueries();
  return (
    <Box>
      <Typography component="h2" variant="h5" gutterBottom>
        Queries
      </Typography>

      <List>
        {queries.isSuccess &&
          queries.data.map((summary) => (
            <ListItem key={summary.days}>
              <ListItemText
                primary={primary(summary)}
                secondary={secondary(summary)}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
}
