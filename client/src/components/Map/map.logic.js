import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraffiti } from "../../redux/slices/graffiti.slice";

const useMapLogic = () => {
  const coordinates = useSelector((state) => state.graffiti.items)[0]; // coordinates come from Redux slice, refer to Redux folder
  const isLoading = useSelector((state) => state.loading);
  const [position, setPosition] = useState([45.464211, 9.191383]);

  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchGraffiti());
  }, [dispatch]);

  return { coordinates, isLoading, position, setPosition, initFetch };
};

export default useMapLogic;
