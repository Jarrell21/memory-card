import * as React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HeaderModal from "./HeaderModal";

function Header() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Memory Card
          </Typography>
          <Tooltip title="How to play">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleOpen}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <HeaderModal open={open} setOpen={setOpen} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
