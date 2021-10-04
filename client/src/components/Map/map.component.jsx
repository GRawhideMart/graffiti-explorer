import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinates } from "../../redux/slices/coordinates.slice";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
  const coordinates = useSelector((state) => state.coordinates.coordinates)[0];
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchCoordinates());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    var map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiZ2l1bGlvbWFyaW9tYXJ0ZW5hIiwiYSI6ImNrdWNtOWp0bTEyNWMyb21vaG4wOTQ3azAifQ.ppikM0e7Ny-1iZtrIxXa1g",
      }
    ).addTo(map);

    if (coordinates) {
      coordinates.forEach((coordinate) => {
        L.geoJSON(coordinate.geolocation).bindPopup("Hi!").addTo(map);
      });
    }

    return () => {
      map.remove();
    };
  }, [coordinates]);

  return <div id="map"></div>;
};

export default Map;
