import { SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";

const Drawer = ({ isDrawerOpen, setIsDrawerOpen, children }) => {
  return (
    <Box sx={{ width: "300px" }} role="presentation">
      <SwipeableDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        width="100%"
      >
        {/* <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text}></ListItemText>
            </ListItem>
          ))}
        </List> */}
        {children}
      </SwipeableDrawer>
    </Box>
  );
};

export default Drawer;
