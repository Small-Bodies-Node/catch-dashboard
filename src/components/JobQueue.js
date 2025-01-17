import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import Pie from "./Pie";

import { useStatusQueue } from "../services/catch";

export default function JobQueue() {
  const queue = useStatusQueue();

  const title = `${queue.isSuccess && queue.data.jobs.length}/${
    queue.isSuccess && queue.data.depth
  } jobs in the queue`;

  return (
    <Box>
      <Typography component="h2" variant="h5" gutterBottom>
        Job queue
      </Typography>

      {queue.isSuccess && (
        <>
          {queue.data.full && (
            <Alert severity="warning">Job queue is full!</Alert>
          )}
          <Grid container sx={{ my: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Container maxWidth="xs">
                <Pie
                  title={title}
                  values={
                    queue.data.jobs.length === 0 ? [] : [queue.data.jobs.length]
                  }
                  maximum={5}
                />
              </Container>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                {queue.isSuccess &&
                  queue.data.jobs.map((job) => (
                    <ListItem key={job.prefix}>
                      <ListItemText
                        primary={`${job.prefix}: ${job.status}`}
                        secondary={`Enqueued at ${job.enqueued_at}`}
                      />
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
