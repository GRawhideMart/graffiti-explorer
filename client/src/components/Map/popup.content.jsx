import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

import HeartButton from "@mui/icons-material/Favorite";
import HeartButtonOutlined from "@mui/icons-material/FavoriteOutlined";

import { toggleFavorite } from "../../redux/slices/graffiti.slice";
import { useDispatch } from "react-redux";

const PopupContent = ({ graffiti }) => {
  const dispatch = useDispatch();
  const toggleFavoriteClick = ({ id, data }) => {
    try {
      dispatch(toggleFavorite({ id, data }))
        .unwrap()
        .then((res) => console.log("Action dispatched"));
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container sx={{ py: 8 }} maxWidth="md">
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            image={graffiti.properties.image}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {graffiti.properties.title}
            </Typography>
            <Typography>{graffiti.properties.author}</Typography>
            <Typography variant="h6" component="p">
              {graffiti.properties.city}
            </Typography>
            <Typography variant="h6" component="p">
              Coordinates: {graffiti.geometry.coordinates[0]}, <br />
              {graffiti.geometry.coordinates[1]}
            </Typography>
          </CardContent>
        </Card>
        <IconButton
          onClick={() => {
            toggleFavoriteClick({
              id: graffiti.properties.id,
              data: {
                isFavorite: !graffiti.properties.isFavorite,
              },
            });
          }}
          size="small"
          style={{ textAlign: "right" }}
        >
          {graffiti.properties.isFavorite ? (
            <HeartButton color="primary" />
          ) : (
            <HeartButtonOutlined color="secondary" />
          )}
        </IconButton>
      </Container>
    </Box>
  );
};

export default PopupContent;
