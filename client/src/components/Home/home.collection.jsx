import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";

import HeartButton from "@mui/icons-material/FavoriteSharp";
import HeartButtonOutlined from "@mui/icons-material/FavoriteBorderSharp";

const HomeCard = ({ paint, handleFavorite }) => (
  <Grid item xs={12} sm={6} md={4}>
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
);

const Collection = ({ graffiti, handleFavorite }) => {
  return (
    <Grid container spacing={4}>
      {graffiti.features.slice(0, 15).map((paint) => (
        <HomeCard
          paint={paint}
          handleFavorite={handleFavorite}
          key={paint.properties.id}
        />
      ))}
    </Grid>
  );
};

Collection.propTypes = {
  graffiti: PropTypes.object.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default Collection;
