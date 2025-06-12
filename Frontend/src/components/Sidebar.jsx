import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isExhibitionsOpen, setIsExhibitionsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">EventSphere</h2>
      </div>

      <nav className="flex-1">
        {/* Exhibitions */}
        <div className="mb-6">
          <button
            onClick={() => setIsExhibitionsOpen(!isExhibitionsOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Exhibitions
          </button>
          {isExhibitionsOpen && (
            <ul className="space-y-1 ml-2">
              <li>
                <Link
                  to="/create"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Create Exhibition
                </Link>
              </li>
              <li>
                <Link
                  to="/Show-events"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Manage Exhibition
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Users */}
        <div className="mb-6">
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Users
          </button>
          {isUsersOpen && (
            <ul className="space-y-1 ml-2">
              <li>
                <Link
                  to="/all-users"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  All Users
                </Link>
              </li>
              <li>
                <Link
                  to="/exhibitors-info"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Exhibitors Info
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Manage Profile */}
        <div className="mb-6">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Manage Profile
          </button>
          {isProfileOpen && (
            <ul className="space-y-1 ml-2">
              <li>
                <Link
                  to="/edit-profile"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/add-admin"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Add Admin
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Bookings */}
        <div className="mb-6">
          <button
            onClick={() => setIsBookingsOpen(!isBookingsOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Bookings
          </button>
          {isBookingsOpen && (
            <ul className="space-y-1 ml-2">
              <li>
                <Link
                  to="/manage-bookings"
                  className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Manage
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
