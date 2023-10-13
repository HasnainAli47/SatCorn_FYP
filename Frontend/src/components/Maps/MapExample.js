import React, { useEffect, useRef, useState } from "react";
import NewSidebar from "./NewSidebar.js";

function MapExample() {
  const [polygonMap, setPolygonMap] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [apiKey, setApiKey] = useState("AIzaSyDMQ9T53DzGbXOtXgrVdBXydpBZN5bgGDs"); // Set your Google API Key here
  const selectedPolygon = useRef(null);
  const [lat, setlat] = useState(28.486753029366852)
  const [lng, setlng] = useState(70.0956817623839)

  const onPolygonComplete = (polygon) => {
    const coords = polygon
      .getPath()
      .getArray()
      .map((coord) => ({
        lat: coord.lat(),
        lng: coord.lng(),
      }));
    setPolygonCoordinates(coords);
    selectedPolygon.current = polygon;
    setShowForm(true);
  };


  useEffect(() => {
    if (polygonMap && lat && lng) {
      const newCenter = new window.google.maps.LatLng(lat, lng);
      polygonMap.setCenter(newCenter);
    }
  }, [lat, lng, polygonMap]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=drawing`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 17,
        mapTypeId: "satellite",
      });
      setPolygonMap(map);
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  useEffect(() => {
    if (polygonMap) {
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          strokeColor: "#FFFF00",
          fillColor: "#FFFF00",
        },
      });
      drawingManager.setMap(polygonMap);

      drawingManager.addListener("polygoncomplete", onPolygonComplete);
    }
  }, [polygonMap]);

  const handleDrawField = () => {
    setIsDrawing(true);
  };

  const handleFarmSelection = (latitude, longitude) => {
    // This can be updated based on the required interaction with NewSidebar
    // console.log("The farm lat and lng are ", latitude, longitude);
    setlat(latitude);
    setlng(longitude);
  };

  const initializeMapWithFields = (fields) => {
    console.log("Fields are ", fields);
    if (!polygonMap || !fields || fields.length === 0) return;

    fields.forEach(index => {
      const drawnPolygon = new window.google.maps.Polygon({
        paths: index.coordinates,
        strokeColor: "rgb(196, 238, 30)",
        strokeOpacity: 2.5,
        strokeWeight: 3,
        fillOpacity: 0.0,
        clickable: true,
      });
      console.log("Draw polygon is ", drawnPolygon);

      drawnPolygon.setMap(polygonMap);
    });
  };

  const deleteSelectedPolygon = () => {
    if (selectedPolygon.current) {
      selectedPolygon.current.setMap(null);
      selectedPolygon.current = null;
    }
  };

  return (
    <>
      <NewSidebar
        showForm={showForm}
        setShowForm={setShowForm}
        onDrawField={handleDrawField}
        onPolygonComplete={onPolygonComplete}
        onDeletePolygon={deleteSelectedPolygon}
        polygonCoordinates={polygonCoordinates}
        isDrawing={isDrawing}
        onFarmSelection={handleFarmSelection}
        initializeMapWithFields={initializeMapWithFields}
        mapRef={polygonMap}
      />
      <div className="relative w-full rounded h-screen">
        <div id="map" className="rounded h-screen" />
      </div>
    </>
  );
}

export default MapExample;
