import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Map from "./components/Map";

export default function App() {
  // Side Drawer state and elements
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuItems = ["Home", "Map", "Logout"];

  return (
    <div>
      {/* Drawer component needs the state to know how to handle swipes */}
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
        <List>
          {menuItems.map((text, index) => (
            <Link
              key={index}
              to={`/${text.toLowerCase()}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <ListItem button onClick={() => setIsDrawerOpen(false)}>
                <ListItemText primary={text}></ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemAvatar>
            <Avatar>SW</Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            Sara Walker
          </ListItemText>
        </List>
      </Drawer>
      {/* Drawer's state must be passed down to the appbar too, since it contains the menu button which must know the state of the drawer */}
      <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <main>
        <Switch>
          <Route exact path={["/", "/home"]} component={() => <Home />} />
          <Route exact path={"/map"} component={() => <Map />} />
          <Route
            exact
            path={"/logout"}
            component={() => <div>This button will log you out</div>}
          />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
