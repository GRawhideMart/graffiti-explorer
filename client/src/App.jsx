import { useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  // Side Drawer state and elements
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuItems = ["Home", "Map", "Dashboard", "Logout"];

  return (
    <div>
      {/* Drawer component needs the state to know how to handle swipes */}
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text}></ListItemText>
            </ListItem>
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
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            ></Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
