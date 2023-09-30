import React, { useEffect, useRef, useState } from "react";

export default function FarmCreationForm({ onLocationChange }) {
  const [formData, setFormData] = useState({
    farmName: "",
    farmLocation: "",
  });

  const [locationEntered, setLocationEntered] = useState(false);

  const locationInputRef = useRef();

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API is not loaded");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      locationInputRef.current,
      {
        // Make sure there are no restrictions or biasing in the options here
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location.toJSON();
        // Update the form data with the full name/address of the selected place
        setFormData({
          ...formData,
          farmLocation: place.formatted_address, // Use the complete address
        });
        setLocationEntered(true);
        // You can also update the state with the coordinates here if needed
      }
    });
  }, [formData.farmName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address used for geocoding:", formData.farmLocation);

    if (formData.farmLocation) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { address: formData.farmLocation },
        (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            const { lat, lng } = results[0].geometry.location.toJSON();
            console.log("Farm Name:", formData.farmName);
            console.log("Location Coordinates:", { lat, lng });

            onLocationChange(lat, lng);

            setFormData({
              // Reset form fields
              farmName: "",
              farmLocation: "",
            });
            setLocationEntered(false); // Reset locationEntered
          } else {
            console.error("Geocoding failed:", status);
          }
        }
      );
    }
  };

  return (
    <>
      <div
        style={{ width: "300px" }}
        className="absolute top-0 z-30 left-0 p-8 bg-white h-screen shadow-lg rounded-md opacity-100 h-screen"
      >
        <div>
          <h2 className="text-2xl font-bold mb-4 mt-4 text-center">
            Create Farm
          </h2>
          <p className="text-md text-center mb-3 mt-3 text-blueGray-500">
            Once you have set up your farm location you will be able to start
            mapping your farm and recording work.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="farmName"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                Farm Name
              </label>
              <input
                type="text"
                id="farmName"
                name="farmName"
                value={formData.farmName}
                onChange={handleInputChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Farm Name"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="farmLocation"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                Choose Farm Location
              </label>
              <input
                type="text"
                id="farmLocation"
                name="farmLocation"
                value={formData.farmLocation}
                onChange={handleInputChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter your farm's address"
                required
                ref={locationInputRef}
              />
            </div>

            {locationEntered && ( // Conditional rendering of message when location is entered
              <p className="text-sm text-left mb-3 mt-3 text-blueGray-500">
                Click "Create Farm" if you are happy with your location or move
                it by clicking on the map.
              </p>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase py-2 px-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all focus:ring focus:ring-blue-300"
              >
                Create Farm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
