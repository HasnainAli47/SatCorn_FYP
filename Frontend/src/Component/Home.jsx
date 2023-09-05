import React, {useEffect} from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OpenStreetMap = () => {
    useEffect(() => {
        // Define the API URL
        const apiUrl = "http://127.0.0.1:8000/api/user";
    
        // Fetch user data from the API
        axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
          .then((response) => {
            // setUserData(response.data);
            // setLoading(false);
            console.log("Response is",response);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            // setLoading(false);
          });
      }, []);
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ width: '100%', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default OpenStreetMap;
