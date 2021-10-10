import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Copyright from "./copyright.component";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Graffiti Explorer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Your city is a museum
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
