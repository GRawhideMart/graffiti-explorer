import { useState, useEffect, useRef } from "react";
import { GeoJSON, Popup } from "react-leaflet";

const CustomMarker = ({ key, data, map }) => {
  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef();

  useEffect(() => {
    if (refReady) {
      popupRef.openOn(map);
    }
  }, [refReady, map]);

  return (
    <GeoJSON data={data} key={key}>
      <Popup
        ref={(r) => {
          popupRef = r;
          setRefReady(true);
        }}
      >
        Yupperz
      </Popup>
    </GeoJSON>
  );
};

export default CustomMarker;
