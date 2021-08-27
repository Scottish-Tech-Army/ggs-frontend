import React, { useRef, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Markers from "./components/Markers.js";
import FilterMarkers from "./components/FilterMarkers";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoic25vd3lwaWdlb24iLCJhIjoiY2tzNHVidzhtMjlwMDJxbzljMzh1a3I3ayJ9.6oWmz_zuj2YfMGtXnm1bNg";

export default function App() {
  // marker setup
  const incomingMarkers = [
    {
      id: "greyFriarsBobbyStatue",
      lat: "55.946874",
      lng: "-3.191229"
    },
    {
      id: "edinburghCastleEntrance",
      lat: "55.948400",
      lng: "-3.196334"
    },
    {
      id: "arthursSeatFootpath",
      lat: "55.942384",
      lng: "-3.197360"
    }
  ];

  const myTaggedMarkers = [
    {
      id: "greyFriarsBobbyStatue",
      lat: "55.946874",
      lng: "-3.191229"
    }
  ];

  const [ allMarkers ] = useState(incomingMarkers);
  const [ flaggedMarkers ] = useState(myTaggedMarkers);

  // map setup
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-3.190728);
  const [lat, setLat] = useState(55.952014);
  const [zoom, setZoom] = useState(14);

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

  // set event handler to show/hide the FilterMarkers modal

  return (
    <div>
      <div className="sidebar">
        Girl Guiding Scotland
      </div>
      <div ref={mapContainer} className="map-container"></div>
      <FilterMarkers />
      <NavBar />
    </div>
  );
}
