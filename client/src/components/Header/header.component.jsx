import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./appbar.component";

const Header = ({ isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <div>
      <CssBaseline />
      <AppBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </div>
  );
};

export default Header;
