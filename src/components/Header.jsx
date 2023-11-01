import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Memory Card
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
