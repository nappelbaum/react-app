import { useYMaps } from "@pbe/react-yandex-maps";
import React, { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef();
  const address = useRef();
  const ymaps = useYMaps(["Map", "Placemark"]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    ymaps.geocode(address.current.textContent).then((res) => {
      const coords = res.geoObjects.get(0).geometry.getCoordinates();

      let myMap = new ymaps.Map(mapRef.current, {
        center: coords,
        zoom: 15,
      });

      const myPlacemark = new ymaps.Placemark(
        coords,
        { iconContent: "Мы ЗДЕСЬ" },
        {
          preset: "islands#redStretchyIcon",
        }
      );
      myMap.geoObjects.add(myPlacemark);
    });
  }, [ymaps]);

  return (
    <>
      <div
        className="mb-3 text-center font-weight-bold adress-head"
        ref={address}
      >
        г. Москва, Рязанский проспект, д. 7, стр. 1
      </div>
      <div className="map-wrapper">
        <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
      </div>
    </>
  );
};

export default Map;
