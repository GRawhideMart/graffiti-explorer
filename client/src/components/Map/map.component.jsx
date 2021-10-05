import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import {
  MapContainer,
  TileLayer,
  Popup,
  FeatureGroup,
  Circle,
} from "react-leaflet";

//import MarkerClusterGroup from "react-leaflet-markercluster";
import { fetchGraffiti } from "../../redux/slices/graffiti.slice";

const Map = () => {
  const coordinates = useSelector((state) => state.graffiti.items)[0]; // coordinates come from Redux slice, refer to Redux folder
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchGraffiti());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, [initFetch]);

  const [position, setPosition] = useState([]);

  if (coordinates !== undefined) {
    console.log(coordinates.features);
  }

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
        {/* <MarkerClusterGroup> */}
        {/* {coordinates &&
            coordinates.map((coordinate) => (
              <GeoJSON
                data={coordinate.geolocation}
                key={coordinates.indexOf(coordinate)}
              >
                <Popup>
                  <p>some text</p>
                </Popup>
              </GeoJSON>
            ))} */}
        {coordinates &&
          coordinates.features.map((feature, index) => (
            <FeatureGroup key={index}>
              <Popup>
                <img
                  src={feature.properties.image}
                  alt={feature.properties.title}
                  style={{ height: 100, width: 100 }}
                />
              </Popup>
              <Circle
                center={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ]}
                fillColor="#ff7800"
                radius={6}
                color={"#000"}
                weight={1}
                opacity={1}
                fillOpacity={0.8}
              />
            </FeatureGroup>
          ))}
        {/* </MarkerClusterGroup> */}
      </MapContainer>
    )
  );
};

export default Map;
