import { Fragment, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinates } from "../../redux/slices/coordinates.slice";
import "leaflet/dist/leaflet.css";

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

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: 700 }}
    >
      <TileLayer
        attribution="&copy; Graffiti Explorer contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {coordinates === undefined
        ? null
        : coordinates.map((element) => (
            <Marker position={[element[1], element[0]]}>
              <Popup></Popup>
            </Marker>
          ))} */}
      {isLoading && <div />}
      {coordinates === undefined ? (
        <div />
      ) : (
        coordinates.forEach((coordinate) => (
          <Fragment key={coordinates.indexOf(coordinate)}>
            <Marker position={coordinate.geolocation.coordinates}>
              <Popup></Popup>
            </Marker>
          </Fragment>
        ))
      )}
      {/* {coordinates.map((element) => (
        <Marker position={element}>
          <Popup></Popup>
        </Marker>
      ))} */}
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
