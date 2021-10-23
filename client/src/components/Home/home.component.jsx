import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useEffect, useState } from "react";
import useHomeLogic from "./home.logic";
import Collection from "./home.collection";

const Home = () => {
  const { graffiti, initFetch, handleFavorite, fetchFavorites } =
    useHomeLogic();

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  useEffect(() => {
    initFetch();
    return () => {
      console.log("Cleaned up");
    };
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
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyFavorites}
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                />
              }
              label="Only favorites"
            />
          </FormGroup>
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

        {onlyFavorites
          ? graffiti && (
              <Collection
                graffiti={fetchFavorites(graffiti)}
                handleFavorite={handleFavorite}
              />
            )
          : graffiti && (
              <Collection graffiti={graffiti} handleFavorite={handleFavorite} />
            )}
      </Container>
    </div>
  );
};

export default Home;
