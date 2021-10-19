import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import HeartButton from "@mui/icons-material/FavoriteSharp";
import HeartButtonOutlined from "@mui/icons-material/FavoriteBorderSharp";

import { useEffect } from "react";
import useHomeLogic from "./home.logic";

const Home = () => {
  const { graffiti, initFetch, handleFavorite } = useHomeLogic();

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div>
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
            Trending
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
          {graffiti &&
            graffiti.features.slice(0, 15).map((paint) => (
              <Grid item key={paint.properties.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={paint.properties.image}
                    alt={paint.properties.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {paint.properties.title}
                    </Typography>
                    <Typography>{paint.properties.city}</Typography>
                    <Typography variant="h6" component="p">
                      {paint.properties.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => {
                        handleFavorite({
                          id: paint.properties.id,
                          data: {
                            isFavorite: !paint.properties.isFavorite,
                          },
                        });
                      }}
                      size="small"
                      style={{ textAlign: "right" }}
                    >
                      {paint.properties.isFavorite ? (
                        <HeartButton color="primary" />
                      ) : (
                        <HeartButtonOutlined color="primary" />
                      )}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
