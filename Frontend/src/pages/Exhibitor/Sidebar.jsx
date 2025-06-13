import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBarExhibitor = () => {
  const [isExpoOpen, setIsExpoOpen] = useState(false);
  const [isBoothOpen, setIsBoothOpen] = useState(false);
  const [isCommOpen, setIsCommOpen] = useState(false);

  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">EventSphere</h2>
      </div>

      <nav className="flex-1 space-y-6">

        {/* Expo Registration & Profile */}
        <div>
          <button
            onClick={() => setIsExpoOpen(!isExpoOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Expo & Profile
          </button>
          {isExpoOpen && (
            <ul className="space-y-1 ml-2">
              <li>
                <Link
                  to="/UpcomingExpos"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Upcoming Exhibitions
                </Link>
              </li>
              <li>
                <Link
                  to="/update-profile"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Update Profile
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Booth Management */}
        <div>
          <button
            onClick={() => setIsBoothOpen(!isBoothOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Booth Management
          </button>
          {isBoothOpen && (
            <ul className="space-y-1 ml-2">
              {/* <li>
                <Link
                  to="/view-floorplan"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  View Floor Plan
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to="/reserve-booth"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Reserve Booth
                </Link>
              </li> */}
              <li>
                <Link
                  to="/manage-booth"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Manage Booth
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Communication */}
        {/* <div>
          <button
            onClick={() => setIsCommOpen(!isCommOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Communication
          </button>
          {isCommOpen && (
            <ul className="space-y-1 ml-2">
              <li>
                <Link
                  to="/contact-organizer"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Contact Organizer
                </Link>
              </li>
              <li>
                <Link
                  to="/connect-exhibitors"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Connect with Exhibitors
                </Link>
              </li>
            </ul>
          )}
        </div> */}
      </nav>
    </aside>
  );
};

export default SideBarExhibitor;
