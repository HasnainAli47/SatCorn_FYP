import React, { useEffect, useRef } from "react";

function MapExample() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Make sure the Google Maps JavaScript API is loaded with your API key
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD0MMmFBogaItuG5ueOEdbVN8KJuGBIdJ8&libraries=places,drawing&callback=initializeMap`;
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

  const initializeMap = () => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 12,
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

    map = new google.maps.Map(map, mapOptions);

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

  return (
    <>
      <button onClick={deleteSelectedPolygon}>Delete Selected Polygon</button>

      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full" ref={mapRef} />
      </div>
    </>
  );
}

export default MapExample;
