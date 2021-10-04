import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinates } from "../../redux/slices/coordinates.slice";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";

const Map = () => {
  const coordinates = useSelector((state) => state.coordinates.coordinates)[0];
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchCoordinates());
  }, [dispatch]);

  useEffect(() => {
    initFetch();

    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, [initFetch]);

  const [position, setPosition] = useState([]);

  return isLoading ? (
    <div>I'm loading</div>
  ) : (
    position[0] != null && position[1] != null && (
      <MapContainer style={{ height: "100vh" }} center={position} zoom={13}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          accessToken="pk.eyJ1IjoiZ2l1bGlvbWFyaW9tYXJ0ZW5hIiwiYSI6ImNrdWNtOWp0bTEyNWMyb21vaG4wOTQ3azAifQ.ppikM0e7Ny-1iZtrIxXa1g"
          id="mapbox/streets-v11"
        />
        <MarkerClusterGroup>
          {coordinates &&
            coordinates.map((coordinate) => (
              <GeoJSON
                data={coordinate.geolocation}
                key={coordinates.indexOf(coordinate)}
              />
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    )
  );
};

export default Map;
