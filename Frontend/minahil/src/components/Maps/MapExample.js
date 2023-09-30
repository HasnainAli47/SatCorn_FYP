/* global google */
import React, { useEffect, useRef, useState, useCallback } from "react"; // Import useState
import NewSidebar from "./NewSidebar.js";

function MapExample() {
  const mapRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  let drawingManager = null; // Declare drawingManager variable outside useEffect

  useEffect(() => {
    // Make sure the Google Maps JavaScript API is loaded with your API key
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places,drawing&callback=initializeMap`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Clean up by removing the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  let selectedPolygon = null; // Declare the selectedPolygon variable outside the function
  const [polygonCoordinates, setPolygonCoordinates] = useState(null);

  const initializeMap = () => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "31.5204";
    let lng = "74.3587";

    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 8,
      center: myLatlng,
      scrollwheel: true,
      zoomControl: true,

      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#b5d0c4" }], // Light green for landscape
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ visibility: "on" }], // Hide roads
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#73b1e6" }], // Blue for water
        },
      ],
    };

    map = new google.maps.Map(mapRef.current, mapOptions); // Use mapRef.current

    // Add a drawing manager to the map
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(
      drawingManager,
      "polygoncomplete",
      function (polygon) {
        // Get the coordinates of the drawn polygon
        const polygonCoordinates = polygon
          .getPath()
          .getArray()
          .map((coord) => ({
            lat: coord.lat(),
            lng: coord.lng(),
          }));
        console.log("Polygon Coordinates:", polygonCoordinates);

        // Store the selected polygon in the selectedPolygon variable
        selectedPolygon = polygon;
        setIsDrawing(false); // Stop drawing mode
        handlePolygonComplete(polygonCoordinates); // Notify the sidebar of the completion
      }
    );

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Notus React!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Notus React</h2>' +
      "<p>A free Admin for Tailwind CSS, React, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  };

  const deleteSelectedPolygon = () => {
    // Check if there is a selected polygon to delete
    if (selectedPolygon) {
      selectedPolygon.setMap(null); // Remove the polygon from the map
      selectedPolygon = null; // Set the selectedPolygon variable to null
    }
  };

  const handleDrawField = useCallback(() => {
    setIsDrawing(true);
    if (drawingManager) {
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  }, []);

  const handlePolygonComplete = useCallback((coordinates) => {
    // Handle polygon completion
    console.log("Polygon Coordinates:", coordinates);
    // ...
  }, []);
  return (
    <>
      <NewSidebar
        onDrawField={handleDrawField}
        onPolygonComplete={handlePolygonComplete}
        onDeletePolygon={deleteSelectedPolygon}
        isDrawing={isDrawing}
      />

      <div className="relative w-full rounded h-screen ">
        <div className="rounded h-screen" ref={mapRef} />
      </div>
    </>
  );
}

export default MapExample;
