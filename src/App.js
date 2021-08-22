import React, { useRef, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import ReactMAPGL, { GeolocateControl } from "react-map-gl";

mapboxgl.accessToken =
  "secret";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-3.190728);
  const [lat, setLat] = useState(55.952014);
  const [zoom, setZoom] = useState(14);
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Girl Guiding Scotland
      </div>
      <div ref={mapContainer} className="map-container"></div>
      <NavBar />
    </div>
  );
}
