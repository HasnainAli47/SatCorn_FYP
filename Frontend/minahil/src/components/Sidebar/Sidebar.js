import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
// import image1 from "../../assets/img/logos/1.png";
// import image2 from "../../assets/img/logos/2.png";

export default function Sidebar({ onToggleSidebar }) {
  const [expanded, setExpanded] = useState(false);

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
            <SidebarItem
              text={"Season"}
              to="/admin/Season"
              icon={<i className="fas fa-calendar mr-2 text-lg"></i>}
              expanded={expanded}
            />
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
          </ul>

          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-3">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
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
