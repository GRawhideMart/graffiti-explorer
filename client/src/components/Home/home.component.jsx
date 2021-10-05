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

import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchGraffiti } from "../../redux/slices/graffiti.slice";

const Home = ({ cards }) => {
  const dispatch = useDispatch();
  const graffiti = useSelector((state) => state.graffiti.items)[0];
  console.log(graffiti);

  const initFetch = useCallback(() => {
    dispatch(fetchGraffiti());
  }, [dispatch]);

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
          {graffiti.slice(0, 15).map((paint) => (
            <Grid item key={graffiti.indexOf(paint)} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia component="img" image={paint.image} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {paint.title}
                  </Typography>
                  <Typography>{paint.author}</Typography>
                  <Typography variant="h6" component="p">
                    {paint.city}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" style={{ textAlign: "center" }}>
                    View
                  </Button>
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
