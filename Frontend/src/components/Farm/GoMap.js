/* global google */
import React, { useEffect, useRef, useState } from "react";
import Farmform from "components/Farm/Farmform.js";

function GopMap() {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

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

  const initializeMap = () => {
    let google = window.google;
    let initiallat = parseFloat("31.5204");
    let initiallng = parseFloat("74.3587");

    const myLatlng = new google.maps.LatLng(initiallat, initiallng);
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

    // Assign the Google Map instance to mapRef.current
    mapRef.current = new google.maps.Map(mapRef.current, mapOptions);

    const marker = new google.maps.Marker({
      position: { lat: initiallat, lng: initiallng },
      map: mapRef.current,
      animation: google.maps.Animation.DROP,
      title: "Notus React!",
    });

    setMarker(marker);
  };

  const updateMarkerPosition = (lat, lng) => {
    if (marker) {
      const newPosition = new google.maps.LatLng(lat, lng);
      marker.setPosition(newPosition);
      mapRef.current.panTo(newPosition);
    }
  };

  return (
    <>
      <div className="relative flex w-full">
        <div className=" relative w-6/13 p-0">
          <Farmform onLocationChange={updateMarkerPosition} />
        </div>
        <div
          className="map-container rounded h-screen flex-grow relative z-0"
          ref={mapRef}
        />
      </div>
    </>
  );
}

export default GopMap;
