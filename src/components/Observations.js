import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import InventoryIcon from "@mui/icons-material/Inventory";

import Pie from "./Pie";

import { useStatusUpdates, useStatusSources } from "../services/catch";

export default function Observations() {
  const allSources = useStatusSources();
  const sourcesByCount = allSources.isSuccess
    ? allSources.data
        .filter((source) => source.count > 0)
        .sort((a, b) => b.count - a.count)
    : [];
  const sourcesByNights = allSources.isSuccess
    ? allSources.data
        .filter((source) => source.nights > 0)
        .sort((a, b) => b.nights - a.nights)
    : [];
  const updates = useStatusUpdates();

  const observations = sourcesByCount.reduce(
    (total, source) => total + source.count,
    0
  );
  const nights = sourcesByNights.reduce(
    (total, source) => total + source.nights,
    0
  );

  return (
    <Box>
      <Typography component="h2" variant="h5" gutterBottom>
        Observations
      </Typography>

      <Typography component="h5" variant="h6" gutterBottom>
        Current holdings
      </Typography>

      <Grid container sx={{ my: 4 }}>
        <Grid size={{ md: 12, lg: 6 }}>
          <Container maxWidth="md">
            <Pie
              title={`${observations.toLocaleString()} observations`}
              values={sourcesByCount.map((source) => source.count)}
              maximum={observations}
              legend={true}
              labels={sourcesByCount.map(
                (source) =>
                  `${source.source_name} (${source.count.toLocaleString()})`
              )}
            />
          </Container>
        </Grid>

        <Grid size={{ md: 12, lg: 6 }}>
          <Container maxWidth="md">
            <Pie
              title={`${nights.toLocaleString()} nights`}
              values={sourcesByNights.map((source) => source.nights)}
              maximum={nights}
              legend={true}
              labels={sourcesByNights.map(
                (source) =>
                  `${source.source_name} (${source.nights.toLocaleString()})`
              )}
            />
          </Container>
        </Grid>
      </Grid>

      <Typography component="h5" variant="h6" gutterBottom>
        Updates in the past...
      </Typography>
      <Grid container spacing={2}>
        <Updates
          title="24 hours"
          data={updates.data?.filter((update) => update.days === 1) || []}
        />
        <Updates
          title="7 days"
          data={updates.data?.filter((update) => update.days === 7) || []}
        />
        <Updates
          title="30 days"
          data={updates.data?.filter((update) => update.days === 30) || []}
        />
      </Grid>
    </Box>
  );
}

function Updates({ title, data }) {
  return (
    <Grid size={{ lg: 4, md: 12 }}>
      <Typography component="h6" variant="h6" gutterBottom>
        {title}
      </Typography>
      <List>
        {data.map((update, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${update.count} products from ${update.source_name}`}
              secondary={`${update.start_date.split(" ")[0]} to ${
                update.stop_date.split(" ")[0]
              }`}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
