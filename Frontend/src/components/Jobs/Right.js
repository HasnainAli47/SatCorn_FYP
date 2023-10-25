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
            <div className="relative flex w-full">
                {tasks.map(task => (
                    <div key={task.id} className="border p-4 m-2 rounded-md">
                        <h3 className="font-bold text-xl">{task.name}</h3>
                        <p>Due Date: {task.due_date}</p>
                        <p>Status: {task.status}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Right;