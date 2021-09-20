import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MenuIcon
            sx={{ mr: 2, display: { xs: "block", md: "block", lg: "none" } }}
          />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ fontFamily: "Roboto" }}
          >
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
