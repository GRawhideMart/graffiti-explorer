import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGraffiti,
  toggleFavorite,
} from "../../redux/slices/graffiti.slice";

const useHomeLogic = () => {
  const dispatch = useDispatch();
  const graffiti = useSelector((state) => state.graffiti.items[0]);

  // const onlyFavorites = graffiti.features.filter(
  //   (element) => element.properties.isFavorite
  // );

  const fetchFavorites = (graffiti) => {
    const onlyFavorites =
      graffiti &&
      graffiti.features.filter((element) => element.properties.isFavorite);
    return {
      type: "FeatureCollection",
      features: onlyFavorites,
    };
  };

  const initFetch = useCallback(() => {
    dispatch(fetchGraffiti());
  }, [dispatch]);

  const handleFavorite = ({ id, data }) => {
    try {
      dispatch(toggleFavorite({ id, data })).unwrap();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return { graffiti, initFetch, handleFavorite, fetchFavorites };
};

export default useHomeLogic;
