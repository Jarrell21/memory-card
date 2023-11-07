import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Pokemon Memory Card Game
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
