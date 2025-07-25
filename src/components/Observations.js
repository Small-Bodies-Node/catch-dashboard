import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import InventoryIcon from "@mui/icons-material/Inventory";

import Pie from "./Pie";

import { useStatusUpdates, useStatusSources } from "../services/catch";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString.split(" ")[0]);
  return `${date.getUTCFullYear()} ${months[date.getUTCMonth()]
    } ${date.getUTCDate()}`;
};

export default function Observations({ apiUrl }) {
  const allSources = useStatusSources(apiUrl);
  const updates = useStatusUpdates(apiUrl);

  const sourcesByObservations = allSources.isSuccess
    ? [...(allSources.data || [])]
      .filter((source) => source.count > 0)
      .sort((a, b) => b.count - a.count)
    : [];
  const observations = sourcesByObservations.reduce(
    (total, source) => total + source.count,
    0
  );

  const nights = sourcesByObservations.reduce(
    (total, source) => total + source.nights,
    0
  );

  return (
    <Box>
      <Typography component="h2" variant="h5" gutterBottom>
        Observations
      </Typography>

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

      <Typography component="h5" variant="h6" gutterBottom>
        Current holdings
      </Typography>

      <Grid container sx={{ my: 4 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Container maxWidth="md">
            <Pie
              title={`${observations.toLocaleString()} observations`}
              values={sourcesByObservations.map((source) => source.count)}
              maximum={observations}
              legend={true}
              labels={sourcesByObservations.map(
                (source) =>
                  `${source.source_name} (${source.count.toLocaleString()})`
              )}
            />
          </Container>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Container maxWidth="md">
            <Pie
              title={`${nights.toLocaleString()} nights by survey site`}
              values={sourcesByObservations.map((source) => source.nights)}
              maximum={nights}
              legend={true}
              labels={sourcesByObservations.map(
                (source) =>
                  `${source.source_name} (${(
                    source.nights || 0
                  ).toLocaleString()})`
              )}
            />
          </Container>
        </Grid>
      </Grid>

      <ObservationSummaryTable allSources={allSources?.data || []} />
    </Box>
  );
}

function Updates({ title, data }) {
  return (
    <Grid size={{ lg: 4, xs: 12 }}>
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
              primary={`${update.count.toLocaleString()} products from ${update.source_name
                }`}
              secondary={`${formatDate(update.start_date)} to ${formatDate(
                update.stop_date
              )}`}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}

function ObservationSummaryTable({ allSources }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="observation summary table">
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Nights</TableCell>
            <TableCell>Observations</TableCell>
            <TableCell>Start (UTC)</TableCell>
            <TableCell>Stop (UTC)</TableCell>
            <TableCell>Updated (UTC)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...allSources]
            .sort((a, b) => a.source_name.localeCompare(b.source_name))
            .map((row) => (
              <TableRow
                key={row.source}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.source_name}</TableCell>
                <TableCell>{(row.nights || 0).toLocaleString()}</TableCell>
                <TableCell>{(row.count || 0).toLocaleString()}</TableCell>
                <TableCell>{formatDate(row.start_date)}</TableCell>
                <TableCell>{formatDate(row.stop_date)}</TableCell>
                <TableCell>{formatDate(row.updated)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
