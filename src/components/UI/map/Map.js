import { useYMaps } from "@pbe/react-yandex-maps";
import React, { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef();

  const ymaps = useYMaps(["Map", "Placemark"]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 10,
    });
  }, [ymaps]);

  return (
    <>
      <div className="mb-2 text-center font-weight-bold adress-head">
        г. Москва, ул. Автозаводская, 14
      </div>
      <div className="map-wrapper">
        <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
      </div>
    </>
  );
};

export default Map;
