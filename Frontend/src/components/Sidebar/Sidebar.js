import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { set } from "react-hook-form";
import { useHistory } from "react-router-dom";
//import Axios from "axios";
//import axios from "axios";
import Season from "views/admin/Season";
import { bottom } from "@popperjs/core";
// import image1 from "../../assets/img/logos/1.png";
// import image2 from "../../assets/img/logos/2.png";

export default function Sidebar({ onToggleSidebar }) {
  const [expanded, setExpanded] = useState(false);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSeasonData, setModalSeasonData] = useState(null);
  const [seasons, setSeasons] = useState(
    [
      {
          "id": 2,
          "user": 18,
          "season_name": "Summer Season",
          "start_date": "2023-05-01",
          "end_date": "2023-08-31"
      },
      {
          "id": 1,
          "user": 18,
          "season_name": "Summer Season 2",
          "start_date": "2023-07-01",
          "end_date": "2023-08-31"
      }
  ]);

  const openModal = (seasonData = null) => {
    console.log("Setting modal data as: ", seasonData);  // Add this line
    setModalSeasonData(seasonData);
    setIsModalOpen(true);
  };
  
  

  // Logout the user
  const Logout = () => {
    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
        if (!response.ok) {
          // User is not logged in or an error occurred
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        // User is logged out, you can access user information here
        history.push("/login")


      })
      .catch((error) => {
        console.error('Error checking user login status:', error);
        // Handle the error or redirect the user to the login page if not logged in.
      });
  };



  useEffect(() => {
    // Check if the user is already logged in
    async function checkUserLogin() {
  
      // try {
      //   const response = await Axios.get('http://127.0.0.1:8000/api/user', {
      //     withCredentials: true, // Include cookies with the request
      //   });
    
      //   if (response.status === 200) {
      //     setname(response.data.name);
      //     setEmail(response.data.email);
      //   }
      // } catch (error) {
      //   // User is not logged in, redirect to the login page if needed
      //   history.push("/login"); // Redirect to the login page or any other authorized route
      // }
    }

    checkUserLogin();


    const fetchSeasons = async () => {
      // try {
      //   const response = await axios.get('http://127.0.0.1:8000/api/get-seasons', {
      //     withCredentials: true, // Include cookies with the request
      //   });
      //   setSeasons(response.data);
      // } catch (error) {
      //   console.error("Error fetching seasons:", error);
      // }
    }

    fetchSeasons();

  }, [history]);


  function SidebarItem({ icon, text, to, expanded, children }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const handleDropdownToggle = (e) => {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <li
        className={`relative  py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          isDropdownOpen ? "bg-gradient-to-tr" : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        <div onClick={handleDropdownToggle} className="flex items-center cursor-pointer">
          {icon && <span className="mr-4">{icon}</span>}
          {expanded && text}
        </div>
  
        {isDropdownOpen && (
          <div className="bg-white absolute border shadow-lg left-full  ml-5" style={{zIndex: 10000}}>
            <ul
              style={{
                backgroundColor: "white",  
                width: '200px', 
              }}
              
            >
              {children}
            </ul>
          </div>
        )}
  
        {/* Render the link when the dropdown is closed */}
        {!isDropdownOpen && to && (
          <Link to={to} className="absolute w-full h-full top-0 left-0"></Link>
        )}
      </li>
    );
  }
  
  const handleToggleSidebar = () => {
    setExpanded((curr) => !curr);
    onToggleSidebar && onToggleSidebar(!expanded); // This will send the new state to Admin
  };

  // Define the logos for open and closed sidebar
  // const openLogo = image1;
  // const closedLogo = image2;


  return (
    <div className="flex">
      {/* Button beside Sidebar */}
      <button
        onClick={handleToggleSidebar}
        style={{
          position: "fixed",
          top: "4px",
          left: expanded ? "15vw" : "5vw",
        }}
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out z-40"
      >
        {expanded ? <ChevronFirst size={24} /> : <ChevronLast size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed h-screen ${
          expanded ? "w-64" : "w-16"
        } bg-white border-r shadow-lg transition-all duration-300 ease-in-out`}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            {/* Conditionally render the logo */}
            {/* <img
              src={expanded ? openLogo : closedLogo}
              className={`h-10 w-10 overflow-hidden transition-all
             ${expanded ? "w-50 h-50" : "w-0"}`}
              alt=""
            /> */}
            {/* <button
              onClick={handleToggleSidebar}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <ChevronFirst size={24} />
              ) : (
                <ChevronLast size={24} />
              )}
            </button> */}
          </div>

          <ul className="flex-1 px-3">
            {/* <SidebarItem
              text={"Season"}
              // to="/admin/Season"
              icon={<i className="fas fa-calendar mr-2 text-lg"></i>}
              expanded={expanded}
            /> */}


    {/* Your SidebarItem component */}
    <SidebarItem text={"Season"} icon={<i className="fas fa-calendar mr-2 text-lg"></i>} expanded={expanded}>
    <ul className="ml-5">
        {seasons.map(season => (
          <li key={season.id} className="my-2 ml-2">
          <div onClick={() => openModal(season)} className="font-bold ">{season.season_name}</div>
          <span className="text-sm text-gray-600">{season.start_date}</span>
          <span className="mx-1 text-sm text-gray-600"> to </span>
          <span className="text-sm text-gray-600">{season.end_date}</span>
        </li>
        
        ))}
        <li className="my-2 ml-2">
        <button onClick={() => openModal()} className="bg-blueGray-600 text-white px-4 py-2 ml-2 mb-2">+ Add new season</button>


        </li>
      </ul>
    </SidebarItem>

    {isModalOpen && (
      <div>
        <Season
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          seasonData={modalSeasonData}
          seasonId={modalSeasonData ? modalSeasonData.id : null}
        />

      </div>
    )}



            <SidebarItem
              text={"Settings"}
              to="/admin/settings"
              icon={<i className="fas fa-tools mr-2 text-lg"></i>}
              expanded={expanded}
            />
            <SidebarItem
              text={"Farms"}
              to="/admin/farms"
              icon={<i className="fas fa-table mr-2 text-lg"></i>}
              expanded={expanded}
            />
            <SidebarItem
              text={"Draw"}
              to="/admin/maps"
              icon={<i className="fas fa-map-marked mr-2 text-lg"></i>}
              expanded={expanded}
            />
            <SidebarItem
              text={"Weather"}
              to="/admin/weather"
              icon={<i className="fas fa-cloud mr-2 text-lg"></i>}
              expanded={expanded}
            />
            <SidebarItem
              text={"Crop Rotation"}
              to="/admin/croprotation"
              icon={<i className="fas fa-clock mr-2 text-lg"></i>}
              expanded={expanded}
              active
            />
            <SidebarItem
              text={"HOME"}
              to="/"
              icon={<i className="fas fa-house-user mr-2 text-lg"></i>}
              expanded={expanded}
            />
            <button 
            onClick={Logout}
            >
              <SidebarItem
                text={"Logout"}
                // to="/logout"
                icon={<i className="fas fa-clock mr-2 text-lg"></i>}
                expanded={expanded}
                
              />

            </button>
            
            {/* <div>
              <button
                className="sidebar-button"
                onClick={Logout}
              >
                <i className="fas fa-clock mr-2 text-lg"></i>
                Logout
              </button>
            </div> */}
          </ul>

          <div className="border-t flex p-3">
            <img
              src={`https://ui-avatars.com/api/?name=${name}`}
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-3">
                <h4 className="font-semibold">{name}</h4>
                <span className="text-xs text-gray-600" style={{ width: '15px' }}>{email}</span>
              </div>
              <MoreVertical size={15} />
            </div>
          </div>
        </nav>
      </aside>
      {/* Mapcard */}
      {/* <Mapcard expanded={expanded} onToggleSidebar={handleToggleSidebar} /> */}
    </div>
  );
}

function SidebarItem({ icon, text, to, expanded, active }) {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-gradient-to-tr " : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <Link
        to={to}
        className={` transition-all ${
          expanded ? "w-52 ml-5" : "w-0"
        } flex items-center`}
      >
        {icon && <span className="mr-4">{icon}</span>}
        {expanded && text}
      </Link>
    </li>
  );
}