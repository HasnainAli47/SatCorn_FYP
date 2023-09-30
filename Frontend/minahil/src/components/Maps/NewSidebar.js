// NewSidebar.js
import React, { useState } from "react";

function NewSidebar({
  onDrawField,
  onPolygonComplete,
  onDeletePolygon,
  isDrawing,
}) {
  // <-- Add the isDrawing prop here
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState(null);

  const handleDrawField = () => {
    setIsDrawingMode(true);
    onDrawField();
  };

  const handlePolygonComplete = (coordinates) => {
    setIsDrawingMode(false);
    setPolygonCoordinates(coordinates);
    onPolygonComplete(coordinates);
  };
  const handleSave = () => {
    const fieldName = document.getElementById("fieldName").value;
    const cropType = document.getElementById("cropType").value;
    console.log({
      fieldName,
      cropType,
      coordinates: polygonCoordinates,
    });
  };

  const handleCancel = () => {
    setIsDrawingMode(false);
    setPolygonCoordinates(null);
  };

  return (
    <div
      style={{ width: "300px" }}
      className="absolute top-0 left-0 h-screen bg-white shadow-lg p-8 rounded-md opacity-90   z-20"
    >
      {isDrawingMode ? (
        // Render inputs and buttons for the drawn polygon
        <div>
          <div>Coordinates: {JSON.stringify(polygonCoordinates)}</div>
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
          />
          <label
            htmlFor="cropType"
            className="block mt-2 text-sm text-gray-600"
          >
            Crop Type
          </label>
          <select id="cropType" className="w-full p-2 border rounded-md">
            <option value="corn">Corn</option>
            <option value="cotton">Cotton</option>
            <option value="sugarcane">Sugarcane</option>
            {/* Add other crop options here */}
          </select>
          <button
            className="mt-4 bg-red-500 text-white p-2 rounded-md"
            onClick={onDeletePolygon} // Link to the delete function
          >
            Delete
          </button>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-black p-2 rounded-md mr-2"
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
      ) : (
        // Render initial buttons
        <div className="flex-col ">
          <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Fields</h2>

          <p className="text-md  mb-3 mt-3 text-blueGray-500">
            Draw Field on the Map
          </p>

          <button
            onClick={handleDrawField}
            className="bg-blueGray-700 text-white active:bg-blueGray-600 text-sm font-bold uppercase py-2 px-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all focus:ring focus:ring-blue-300"
          >
            Draw Field
          </button>

          <p className="text-md  mb-3 mt-3 text-blueGray-500">
            Upload File (shp, etc)
          </p>
          {/* 
          <label
            htmlFor="farmName"
            className=" mt-4 block uppercase text-blueGray-400 text-xs font-bold mb-4"
          >
            Upload File (shp, etc)
          </label> */}
          <button
            onClick={handleDrawField}
            className="bg-blueGray-700 text-white active:bg-blueGray-600 text-sm font-bold uppercase py-2 px-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all focus:ring focus:ring-blue-300"
          >
            Upload Field
          </button>

          {/* <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase py-2 px-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all focus:ring focus:ring-blue-300">
            Upload File
          </button> */}
          {/* Add any additional text or elements here */}
        </div>
      )}
    </div>
  );
}

export default NewSidebar;
