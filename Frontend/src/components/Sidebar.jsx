import React, { useState } from "react";

const SideBar = () => {
  const [isManageOpen, setIsManageOpen] = useState(true);

  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 overflow-y-auto flex flex-col">
      {/* Header */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">EventSphere</h2>
      </div> */}

      Navigation
      <nav className="flex-1">
        {/* <SidebarList heading="General" items={["Inbox", "Favourite", "Sent", "Draft", "Archive", "Trash"]} />
        <SidebarList heading="Settings" items={["Profile", "Settings"]} /> */}

        {/* Dropdown Section */}
        <div className="mb-6">
          <button
            onClick={() => setIsManageOpen(!isManageOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Exhibitions
          </button>
          {isManageOpen && (
            <ul className="space-y-1 ml-2">
              {["Create Exhibition", "Manage Exhibition"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-6">
          <button
            onClick={() => setIsManageOpen(!isManageOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Users
          </button>
          {isManageOpen && (
            <ul className="space-y-1 ml-2">
              {["All Users", "Exhibitors Info"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-6">
          <button
            onClick={() => setIsManageOpen(!isManageOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Manage Profile
          </button>
          {isManageOpen && (
            <ul className="space-y-1 ml-2">
              {["Edit Profile", "Add Admin"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-6">
          <button
            onClick={() => setIsManageOpen(!isManageOpen)}
            className="w-full text-left text-xs font-semibold uppercase text-gray-500 mb-2 focus:outline-none"
          >
            Bookings
          </button>
          {isManageOpen && (
            <ul className="space-y-1 ml-2">
              {["Manage"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

const SidebarList = ({ heading, items }) => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">{heading}</h3>
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item}>
          <a
            href="#"
            className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default SideBar;
