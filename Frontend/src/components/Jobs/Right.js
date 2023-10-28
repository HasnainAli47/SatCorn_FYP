import React, { useEffect, useState } from "react";
//import Axios from "axios";

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
                <div className="flex justify-between mb-4">
                    <div className="font-bold p-4 w-1/4">Name</div>
                    <div className="font-bold p-4 w-1/4 flex justify-between">
                    Due Date
                    </div>
                    <div className="font-bold p-4 w-1/4 flex justify-between">
                    Status
                    </div>
                    <div className="font-bold p-4 w-1/4 flex justify-between">Check</div>

                </div>
                {tasks.map(task => (
                    <div key={task.id} className="flex justify-between border m-2 rounded-md p-4">
                    <div className="w-1/3 p-4 bg-blue-200">{task.name}</div>
                    <div className="w-1/3 p-4">{task.due_date}</div>
                    <div className="w-1/3 p-4 bg-green-200">{task.status}</div>
                    <div className="w-1/3 p-4 bg-green-200">
                        <button className="text-black px-2 py-0.5 rounded">
                            Completed
                        </button>
                    </div>
                    </div>
                    
                ))}
                
            </div>


        </>
    );
}

export default Right;