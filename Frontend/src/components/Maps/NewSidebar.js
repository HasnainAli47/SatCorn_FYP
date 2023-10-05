// NewSidebar.js
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import ReactModal from "react-modal";
import { google } from "google-maps";


// Add CSS styles for the modal and backdrop
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black backdrop
    zIndex: 1000, // Ensure modal appears on top
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "80%",
    maxHeight: "80%",
    overflow: "auto",
    zIndex: 1001, // Ensure modal content appears above the backdrop
  },
};


function NewSidebar({
  polygonCoordinates,
  showForm, setShowForm,
  onDrawField,
  onPolygonComplete,
  onDeletePolygon,
  onFarmSelection,
  isDrawing,
  mapRef,
  initializeMap
}) {
  // <-- Add the isDrawing prop here
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the dropdown
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [fieldName, setFieldName] = useState('');
  const [cropType, setCropType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Define a reference for the drawing manager
  const drawingManagerRef = useRef(null);
  // Add a state variable to keep track of the drawn polygons
  const [drawnPolygons, setDrawnPolygons] = useState([]);

  const handleDrawField = () => {
    setIsDrawingMode(true);
    onDrawField();
  };

  const [options, setoptions] = useState([
    {id: 12, farm_name: "Sheeza's Farm", latitude: '31.1137', longitude: '74.4672', user: 18},
    {id: 13, farm_name: 'Sample Farm', latitude: '25.3960', longitude: '68.3578', user: 18}
  ]);

  const [fields, setfields] = useState([
    {
      farm : 12,
      field_crop : "Corn",
      field_name: "Field 2",
      id : 4,
      coordinates :{
        0 : {latitude: 123.45678, longitude: 45.6891},
        1 : {latitude: 123.45789, longitude: 45.679123},
        2 : {latitude: 123.458901, longitude: 45.1679234}
      }
    }
  ])


  async function fetchFarms() {
    try {
      const response = await Axios.get('http://127.0.0.1:8000/api/get-farms', {
        withCredentials: true, // Include credentials
      });
      if (response.status === 200) {
        // Set the farms data in state
        // console.log("The backend data is ", response.data);
        setoptions(response.data);

      } else {
        console.error('Failed to fetch farms');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  useEffect(() => {
    fetchFarms(); 
  }, [])
  

  const handleSave = () => {
    const fieldName = document.getElementById("fieldName").value;
    const cropType = document.getElementById("cropType").value;
    
    const fieldData = {
        id: new Date().getTime(), // Assuming id as timestamp for uniqueness
        field_name: fieldName,
        crop_type: cropType,
        coordinates: polygonCoordinates,
        farm: 1 // Placeholder value, replace with actual farm ID if necessary
        
      
      };
    
    // console.log(fieldData);
    
    // TODO: Send this data to your backend

    // Clear form data and hide the form
    setFieldName('');
    setCropType('');
    setShowForm(false);
    onDeletePolygon(); // Remove the last drawn polygon
    // Clear form data and hide the form
};


  const handleCancel = () => {
    onDeletePolygon(); // Remove the last drawn polygon
    // Clear form data and hide the form
    setFieldName('');
    setCropType('');
    setShowForm(false);

  };

  // Define the options for the dropdown
  const [selectedFarm, setSelectedFarm] = useState({
    id: null,
    latitude: null,
    longitude: null,
  }); 
  

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option.farm_name)
    setSelectedFarm({
      id: option.id,
      latitude: option.latitude,
      longitude: option.longitude,
    });

    async function fetchfields() {
      try {
        const response = await Axios.get(`http://127.0.0.1:8000/api/get-fields/${option.id}`, {
          withCredentials: true, // Include credentials
        });
        if (response.status === 200) {
          // Set the farms data in state
          // console.log('Fields for farm with ID ',option.id, response.data);
          setfields(response.data);
          // setoptions(response.data);
          // Draw polygons for the fields
          drawPolygons(response.data);
  
        } else {
          console.error('Failed to fetch farms');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    

    fetchfields()

    setIsDropdownOpen(false);

      // Call the parent component's callback function with latitude and longitude
      if (onFarmSelection) {
        onFarmSelection(option.latitude, option.longitude);
      }
    
  };



  // Add a function to draw polygons on the map
// Add a function to draw polygons on the map
// Add a function to draw polygons on the map
const drawPolygons = (fields) => {
  console.log("Fields in drawPolygons:", fields);

  const polygons = [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    console.log("Field in loop:", field.coordinates);

    if (!field.coordinates || !Array.isArray(field.coordinates)) {
      console.error("Invalid coordinates for field:", field);
      continue; // Skip this field and continue with the next one
    }

    const polygonCoordinates = field.coordinates.map((coord) => ({
      lat: coord.lat, // Use latitude property
      lng: coord.lng, // Use longitude property
    }));

    console.log("Polygon Coordinates:", polygonCoordinates);
    try {
      initializeMap();
    } catch (error) {
      console.log(error)
    }

    // const polygon = new google.maps.Polygon({
    //   paths: polygonCoordinates,
    //   map: mapRef.current,
    //   editable: false,
    // });

    // polygons.push(polygon);
  }

  console.log("Drawn Polygons:", polygons);
};




  


  const handleFieldClick = (fieldCoordinates) => {
    // console.log("Selected Farm ID:", selectedFarm.id);
    // console.log("Selected Farm Latitude:", selectedFarm.latitude);
    // console.log("Selected Farm Longitude:", selectedFarm.longitude);

    // Call the method to draw the polygon with the provided coordinates
    onPolygonComplete(fieldCoordinates);
  };

  
  const handleDelete = () => {
    onDeletePolygon(); // Remove the last drawn polygon
    // Clear form data and hide the form
    setFieldName('');
    setCropType('');
    setShowForm(false);
  };


  // Define the modal content
  const modalContent = (
    <div className="relative">
      <button
      onClick={() => setIsModalOpen(false)}
      className="absolute top-0 right-0 mt-0 mr-0 bg-transparent border-0 text-black hover:text-gray-500 text-2xl leading-none outline-none focus:outline-none"
      >
        <span>&times;</span>
      </button>

      <div>
        <h2 className="text-center font-bold text-lg">List of Fields</h2>
        {fields.length === 0 ? (
          <p>Please enter a farm to be displayed here.</p>
        ) : (
          <ul>
            {/* {console.log("Fields are ",fields)} */}
            {fields.map((field) => (
              
              <div key={field.id} className="mb-3 flex items-center">
                <div style={{ minWidth: "500px" }}>
                  <h3
                    className="text-md font-semibold mb-2 cursor-pointer"
                    onClick={() => {
                      handleFieldClick(field.coordinates);
                    }}
                  >
                    Field Name: {field.field_name}
                    
                  </h3>
                  Crop: {field.field_crop}
                </div>
                <button
                  onClick={() => {
                    // handleDeleteFarm(farm.id);
                    // console.log("The button clicked is ", field.id);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                
              </div>
            ))}
          </ul>
        )}
      </div>

      </div>
    );

  


  
  return (
    <div
      style={{ width: "300px" }}
      className="absolute top-0 left-0 h-screen bg-white shadow-lg p-8 rounded-md opacity-90   z-20"
    >
       {showForm && (
        // Render inputs and buttons for the drawn polygon
        <div>
          {/* Add other input fields and buttons here */}
          <label
            htmlFor="fieldName"
            className="block mt-2 text-sm text-gray-600"
          >
            Field Name
          </label>
          <input
            type="text"
            id="fieldName"
            className="w-full p-2 border rounded-md"
            placeholder="Enter field name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          
          />
          <label
            htmlFor="cropType"
            className="block mt-2 text-sm text-gray-600"
            
          >
            Crop Type
          </label>
          <select id="cropType" className="w-full p-2 border rounded-md"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}>
            <option value="corn">Corn</option>
            <option value="cotton">Cotton</option>
            <option value="sugarcane">Sugarcane</option>
            {/* Add other crop options here */}
          </select>
          

          <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={handleDelete} // Link to the delete function
          >
            Delete
          </button>
            <button
              onClick={handleCancel}
              className="bg-Green-400 text-black p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-black p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>

        )} 
        
        <div className="flex-col">
          <div className="mb-3 mt-3 ">
          <span className="text-blueGray-500 text-md font-semibold text-center">Please Select Your Farm</span>
          <button onClick={() => setIsModalOpen(true)} className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase py-2 px-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all focus:ring focus:ring-blue-300">Show Feilds</button>
          </div>
          {/* Dropdown button */}
          <div className="relative inline-block text-center w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the dropdown when the button is clicked
              className="text-white bg-blueGray-700 hover:bg-blueGray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 w-full text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex"
              type="button"
              id="dropdownButton"
            >
             <span className="flex-grow">{selectedOption || "Select Farm"}</span>
              <svg
                className="w-2 h-2 ml-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton" tabIndex="-1">
                <div className="py-1" role="none">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        handleOptionSelect(option);
                        handleFieldClick(); // Call the function to display and save farm data
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {option.farm_name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="fields-list">
              <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Create Your Fields</h2>
              
          </div>
          <p className="text-md  mb-3 mt-3 text-blueGray-500">
            Draw Field on the Map
          </p>

          <button
            onClick={onDrawField}
            disabled={!selectedOption}
            className={`text-white text-sm font-bold uppercase py-2 px-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all focus:ring focus:ring-blueGray-300  ${selectedOption ? "bg-blueGray-700 active:bg-blueGray-600" : "bg-blueGray-500 cursor-not-allowed"}`}
            >
            Draw Field
          </button>

          <p className="text-md  mb-3 mt-3 text-blueGray-500">
            Upload File (shp, etc)
          </p>
          
          <button
            onClick={handleDrawField}
            disabled={!selectedOption}
            className={`text-white text-sm font-bold uppercase py-2 px-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all focus:ring focus:ring-blueGray-300  ${selectedOption ? "bg-blueGray-700 active:bg-blueGray-600" : "bg-blueGray-500 cursor-not-allowed"}`}
          >
            Upload Field
          </button>
          {/* Render the modal */}
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={modalStyles} // Apply the custom styles
          >
            {modalContent}
          </ReactModal>
        </div>
      
    </div>
  );
}

export default NewSidebar;