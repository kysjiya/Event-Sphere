import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBarAttendee = () => {
  const [isExpoOpen, setIsExpoOpen] = useState(false);

  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">EventSphere</h2>
      </div>

      <nav className="flex-1 space-y-6">
        <div>
          <button
            onClick={() => setIsExpoOpen(!isExpoOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Events
          </button>
          {isExpoOpen && (
            <ul className="space-y-1 ml-2">
              <li>
                <Link
                  to="/MyEvents"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  My Events
                </Link>
              </li>
              <li>
                <Link
                  to="/UpcomingExposRegistration"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Upcoming Exhibitions
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SideBarAttendee;
