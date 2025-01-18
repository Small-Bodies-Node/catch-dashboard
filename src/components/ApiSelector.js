import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ApiSelector({ apiUrl, setApiUrl }) {
  const handleChange = (event) => {
    setApiUrl(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: "16em" }}>
      <FormControl fullWidth>
        <InputLabel id="api-url-select-label">API</InputLabel>
        <Select
          labelId="api-url-select-label"
          id="api-url-select"
          value={apiUrl}
          label="API"
          onChange={handleChange}
        >
          <MenuItem value={"https://catch-api.astro.umd.edu"}>
            Production
          </MenuItem>
          <MenuItem value={"https://catch-dev-api.astro.umd.edu"}>
            Development
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
