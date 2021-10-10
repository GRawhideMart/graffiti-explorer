import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { mapbox_access_key } from "../../keys";

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new MapBoxProvider({
      params: {
        access_token: mapbox_access_key,
      },
    });

    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      showPopup: false,
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

export default LeafletgeoSearch;
