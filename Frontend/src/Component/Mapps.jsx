import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import "./map.css";
import axios from "axios";
import "leaflet-draw/dist/leaflet.draw.css"; // Import Leaflet Draw CSS separately
import L from "leaflet"; // Import Leaflet
import "leaflet-draw"; // Import Leaflet Draw plugin;
import { Polygon } from 'react-leaflet';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";






const Mapps = () => {

  
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  
  
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const [coordinates, setCoordinates] = useState([]);
  const featureGroupRef = useRef();
  const [currentLayer, setCurrentLayer] = useState("openStreetMap");
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [userFields, setUserFields] = useState([]);





  const fetchUserFieldsAndDisplayCoordinates = () => {
    // Make a GET request to fetch the user's fields (no need to pass userId)
    fetch('http://127.0.0.1:8000/api/get-fields', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((fieldsData) => {
        // Handle the response containing the user's fields
        // Set the received fields data in the userFields state variable
        setUserFields(fieldsData);
  
        // You can now process and display the fields on the map or perform any other necessary actions.
      })
      .catch((error) => {
        console.error('Error fetching user fields:', error);
      });
  };




  // Check if the user is loggedin
  const checkUserLoggedIn = () => {
    fetch('http://127.0.0.1:8000/api/user', {
      method: 'GET',
      credentials: 'include', // Include credentials (cookies) in the request
    })
      .then((response) => {
        if (!response.ok) {
          // User is not logged in or an error occurred
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        // User is logged in, you can access user information here
        console.log('User Data:', userData);
  
        // Once you have user information, you can make another request to fetch the user's fields and display their coordinates.
        // Example:
        fetchUserFieldsAndDisplayCoordinates();
        // console.log(userData.id);
        
      })
      .catch((error) => {
        console.error('Error checking user login status:', error);
        // Handle the error or redirect the user to the login page if not logged in.
      });
  };
  









  const onCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const polygon = layer.toGeoJSON();
      const coords = polygon.geometry.coordinates[0];

      

    

    
      // Check if the polygon is flat (2D)
      if (L.LineUtil.isFlat(coords)) {

        const fieldData = {
          name: "fieldName", // Get the field name from state
          coordinates: {
            type: "Polygon",
            coordinates: [coords],
          },
        };
        // const coordinates = ;
        // console.log("Flat polygon:", coords, " with coordinates of ", fieldData);
        // console.log('Coordinates: ', coordinates);

      const sendFieldDataToBackend = (fieldData) => {
        
        // Define the headers, including 'Content-Type' and credentials
        const headers = new Headers({
          'Content-Type': 'application/json',
        });
      
        // Include credentials (cookies) in the request
        const requestOptions = {
          method: 'POST',
          headers,
          body: JSON.stringify(fieldData),
          credentials: 'include', // This option includes credentials (cookies) in the request
        };
      
        fetch('http://127.0.0.1:8000/api/create-field', requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            // Handle the response from the backend, if needed
            console.log('Field data sent successfully:', data);
          })
          .catch((error) => {
            console.error('Error sending field data to the backend:', error);
          });
      };
      
      

      // Send data here
      sendFieldDataToBackend(fieldData);

        // Handle flat polygon (2D path)
      } else {
        // Handle non-flat polygon (curved path)
        console.log("Non-flat polygon:", coords);
      }
      // setCoordinates(coords);
      setSelectedLayer(layer);
    }
  };

  const changeMapLayer = (newLayer) => {
    setCurrentLayer(newLayer);
  };

  const deleteSelectedLayer = () => {
    if (selectedLayer) {
      featureGroupRef.current.leafletElement.removeLayer(selectedLayer);
      setSelectedLayer(null);
    }
  };

  return (
    <>
      <MapContainer
        style={{ height: "600px", width: "100%" }}
        center={center}
        zoom={ZOOM_LEVEL}
      >
        <TileLayer
          url={osm.maptiler[currentLayer].url}
          attribution={osm.maptiler[currentLayer].attribution}
        />
        {/* <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={onCreated}
            draw={{
              rectangle: false,
              marker: false,
              circlemarker: false,
              polyline: false,
              circle: false,
              polygon: {
                allowIntersection: true,
                showArea: true,
                drawError: {
                  color: "#e1e100",
                  message: "<strong>Oh snap!<strong> you can't draw that!",
                },
              },
            }}
            edit={{
              featureGroup: featureGroupRef.current,
              remove: true,
            }}
          />
        </FeatureGroup> */}
        <FeatureGroup ref={featureGroupRef}>
          {/* Render polygons here */}
          {userFields.map((field) => (
            <Polygon
              key={field.id}
              positions={field.coordinates.coordinates[0].map(([lng, lat]) => [lat, lng])}
            />
          ))}
          <EditControl
            position="topright"
            onCreated={onCreated}
            draw={{
              rectangle: false,
              marker: false,
              circlemarker: false,
              polyline: false,
              circle: false,
              polygon: {
                allowIntersection: true,
                showArea: true,
                drawError: {
                  color: "#e1e100",
                  message: "<strong>Oh snap!<strong> you can't draw that!",
                },
              },
            }}
            edit={{
              featureGroup: featureGroupRef.current,
              remove: true,
            }}
          />
        </FeatureGroup>

      </MapContainer>
      {/* <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => {
          const editControl = document.querySelector(
            ".leaflet-draw-draw-polygon"
          );
          if (editControl) {
            editControl.click();
          }
        }}
        className="leaflet-draw-draw-polygon"
      >
        Draw Polygon
      </Button> */}
      <div>
        <h2>Map Layers</h2>
        <button onClick={() => changeMapLayer("openStreetMap")}>
          OpenStreetMap
        </button>
        <button onClick={() => changeMapLayer("satellite")}>Satellite</button>
        {/* Add more map layer buttons as needed */}
      </div>
      {selectedLayer && (
        <div>
          <button onClick={deleteSelectedLayer}>Delete Polygon</button>
        </div>
      )}

      {/* {coordinates.length > 0 && (
        <div>
          <h2>Coordinates</h2>
          <ul>
            {coordinates.map((coord, index) => (
              <li key={index}>
                Latitude: {coord[1]}, Longitude: {coord[0]}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
};

export default Mapps;
