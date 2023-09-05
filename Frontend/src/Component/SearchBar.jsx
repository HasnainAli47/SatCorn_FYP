import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const SearchBar = ({ onSearch }) => {
  useEffect(() => {
    mapboxgl.accessToken = "YOUR_MAPBOX_API_KEY";
    const map = new mapboxgl.Map({
      container: "search-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 1,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    geocoder.on("result", (e) => {
      // Extract latitude and longitude from the search result
      const coordinates = e.result.geometry.coordinates;
      onSearch({ lat: coordinates[1], lng: coordinates[0] });
    });

    map.addControl(geocoder);
  }, [onSearch]);

  return <div id="search-map" style={{ width: "100%", height: "100%" }}></div>;
};

export default SearchBar;
