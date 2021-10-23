import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import "leaflet-geosearch/dist/geosearch.css";

import {
  MapContainer,
  TileLayer,
  Popup,
  FeatureGroup,
  Marker,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { mapbox_access_key } from "../../keys";
import PopupContent from "./popup.content";
import LeafletgeoSearch from "./geosearch.component";
import useMapLogic from "./map.logic";

const Map = () => {
  const { coordinates, isLoading, position, initFetch, setPosition } =
    useMapLogic();

  useEffect(() => {
    initFetch();
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
    return () => {
      console.log("Clean up ran");
    };
    //eslint-disable-next-line
  }, [initFetch]);

  return isLoading ? (
    <div>I'm loading</div>
  ) : (
    position[0] != null && position[1] != null && (
      <MapContainer
        style={{ height: "100vh" }}
        center={position}
        zoom={13}
        closePopupOnClick={false}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          accessToken={mapbox_access_key}
          id="mapbox/streets-v11"
        />

        <MarkerClusterGroup>
          {coordinates &&
            coordinates.features.map((feature, index) => (
              <FeatureGroup key={index}>
                <Marker
                  position={[
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0],
                  ]}
                >
                  <Popup
                    onOpen={() => console.log("I opened")}
                    onClose={() => console.log("I closed")}
                  >
                    <PopupContent graffiti={feature} />
                  </Popup>
                </Marker>
              </FeatureGroup>
            ))}
        </MarkerClusterGroup>
        <LeafletgeoSearch />
      </MapContainer>
    )
  );
};

export default Map;
