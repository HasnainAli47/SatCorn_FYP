import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Season() {
  const initialFormData = {
    seasonName: "",
    startDate: null,
    endDate: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle date changes
  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Data:", formData);
  };

  const handleCancel = () => {
    // Reset the form data to its initial state
    setFormData(initialFormData);
    // Disable the Cancel button
    setCancelDisabled(true);
  };

  // Add a new state variable to manage the "Cancel" button's disabled state
  const [cancelDisabled, setCancelDisabled] = useState(false);

  return (
    <>
      <main className="min-h-screen flex items-center">
        <div className="container mt-10 mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-left h-full">
            <div className="w-full lg:w-8/12 md:w-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <h2 className="text-2xl font-bold mb-4 mt-4 text-center">
                    Create Season
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="seasonName"
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        Season Name
                      </label>
                      <input
                        type="text"
                        id="seasonName"
                        name="seasonName"
                        value={formData.seasonName}
                        onChange={handleInputChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter Season Name"
                        required
                      />
                    </div>

                    <div className="md:flex md:space-x-4">
                      {/* Start Date */}
                      <div className="w-1/2 pr-2">
                        <label
                          htmlFor="start"
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Start Date
                        </label>
                        <div className="relative flex items-center md:w-1/2">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                              />
                            </svg>
                          </div>
                          <DatePicker
                            name="startDate"
                            selected={formData.startDate}
                            onChange={handleStartDateChange}
                            className="bg-gray-50 border-1 border-blueGray-100 placeholder-blueGray-300 text-blueGray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholderText="Select date start"
                          />
                        </div>
                      </div>

                      {/* End Date */}
                      <div className="w-1/2 pr-2">
                        <label
                          htmlFor="end"
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          End Date
                        </label>
                        <div className="relative flex items-center md:w-1/2">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                              />
                            </svg>
                          </div>
                          <DatePicker
                            name="endDate"
                            selected={formData.endDate}
                            onChange={handleEndDateChange}
                            className="bg-gray-50 border-1 border-blueGray-100 placeholder-blueGray-300 text-blueGray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholderText="Select date end"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Buttons Container */}
                    <div className="flex justify-between mt-6">
                      {/* Cancel Button */}
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-red-500 text-white active:bg-red-300 font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-6/12 h-10 transition-all ease-in-out duration-200"
                      >
                        Cancel
                      </button>
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-6/12 h-10 transition-all ease-in-out duration-200"
                      >
                        Create Season
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
