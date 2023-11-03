import React, { useEffect, useState } from "react";
import ReactModal from "react-modal"; // Import react-modal
import DatePicker from "react-datepicker";

//import Axios from "axios";
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
      maxHeight: "100%",
      height: "60%",
  
      overflow: "auto",
      zIndex: 1001, // Ensure modal content appears above the backdrop
    },
  };
function Right({ selectedFieldId }) {  // Accept the selectedFieldId as a prop
    const [tasks, setTasks] = useState([
        {
            "name": "Irrigation Task",
            "due_date": "2023-11-10",
            "status": "Pending",
            "field": 9
        },
        {
            "name": "Irrigation Task",
            "due_date": "2023-11-10",
            "status": "Pending",
            "field": 9
        },
        {
            "name": "Irrigation Task",
            "due_date": "2023-11-10",
            "status": "Pending",
            "field": 9
        }
    ]);

    const [formData, setFormData] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

    const handleSubmit = async (e) => {
    }
    const handleCancel = () => {
    }
    const handleInputChange = (e) => {
    }
    const handleDelete = async () => {
    }
    const handleEdit = (index, id) => {
    }
    const handlePlantDateChange = (date) => {
    }

    useEffect(() => {
        if (!selectedFieldId) return; // Don't fetch if no field is selected
        async function fetchJobs() {
            // try {
            //     const jobsResponse = await Axios.get(`http://127.0.0.1:8000/api/Jobs`, {
            //         withCredentials: true
            //     });
            //     const relatedJobs = jobsResponse.data.filter(job => job.field === selectedFieldId);
            //     console.log("Related jobs are ", relatedJobs);
            //     setTasks(relatedJobs);
            // } catch (error) {
            //     console.error("Error fetching jobs:", error);
            // }
        }

        fetchJobs();
    }, [selectedFieldId]);  // This effect runs every time selectedFieldId changes



    const modalContent = (
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-0 mt-0 mr-0 bg-transparent border-0 text-black hover:text-gray-500 text-2xl leading-none outline-none focus:outline-none"
            >
                <span>&times;</span>
          </button>
    
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <h2 className="text-2xl font-bold mb-4 mt-2 text-center">ADD NEW JOB</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="cropName"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                            Job Title
                        </label>
                        <input
                            type="text"
                            id="cropName"
                            name="cropName"
                        //    value={formData.cropName}
                            onChange={handleInputChange}
                            className="border-0 px-3 py-3 mb-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Enter Crop Name"
                            required
                          />
                    </div>
                    
    
                    <div className="md:flex md:space-x-4">
                        <div className="pr-2">
                             <label
                              htmlFor="planting"
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                              Due Date
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
                                name="plantingDate"
                                // selected={formData.plantingDate}
                                onChange={handlePlantDateChange}
                                className="bg-gray-50 border-1 mb-4 border-blueGray-100 placeholder-blueGray-300 text-blueGray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholderText="Select planting start"
                              />
                            </div>
                        </div>
                        
    
                    </div>
    
                    <div className="flex justify-between mt-6">
                        {/* Cancel Button */}
                        
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-slate-500 text-white active:bg-red-300 font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-6/12 h-10 transition-all ease-in-out duration-200"
                          >
                            Cancel
                        </button>
                        
                        {modalMode === 'edit' ? (
                            <button
                                type="submit"
                                className="bg-sky-600 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-6/12 h-10 transition-all ease-in-out duration-200"
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-sky-600 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-6/12 h-10 transition-all ease-in-out duration-200"
                            >
                                Submit
                            </button>
                        )}
    
                    </div>
                </form>
                    
            </div>
        </div>
    )
    

    return (
        <>
            {/* <div className="relative flex w-full">
                {tasks.map(task => (
                    <div key={task.id} className="border p-4 m-2 rounded-md">
                        <h3 className="font-bold text-xl">{task.name}</h3>
                        <p>Due Date: {task.due_date}</p>
                        <p>Status: {task.status}</p>
                    </div>
                ))}
            </div> */}
            <div className="w-full h-full p-4">
                <div className="flex justify-between bg-lightBlue-800 m-2">
                    <div className="font-bold p-4 ml-4 w-1/4 text-white items-center justify-center ml-2">Name</div>
                    <div className="font-bold p-4 w-1/4 text-white items-center justify-center ml-2">
                    Due Date
                    </div>
                    <div className="font-bold p-4 w-1/4 text-white items-center justify-center mr-1">
                    Status
                    </div>
                    <div className="font-bold p-4  w-1/4 text-white items-center justify-center mr-10">Check</div>

                </div>
                
                {tasks.map(task => (
                    <div key={task.id} className="flex justify-between border border-lightBlue-700 m-2 rounded-md p-4">
                    <div className="w-1/3 p-4 bg-blue-200">{task.name}</div>
                    <div className="w-1/3 p-4 mr-8">{task.due_date}</div>
                    <div className="w-1/3 p-4 mr-9 ">{task.status}</div>
                    <div className="w-1/3 p-4">
                        <button className="text-black px-2 py-1 border border-green-500 bg-emerald-50 rounded">
                            Mark Complete
                        </button>
                    </div>
                    </div>
                    
                ))}

                <div className="flex justify-between border border-lightBlue-700 m-2 rounded-md p-4">
                    <button className="text-black px-2 py-1  bg-lightBlue-200 rounded ml-1" onClick={() => setIsModalOpen(true)}>
                    + Add New Job 
                    </button>
                </div>
                
            </div>

        <ReactModal
         isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles} // Apply the custom styles
          >            
      {modalContent}
    </ReactModal>
        </>
    );
}

export default Right;