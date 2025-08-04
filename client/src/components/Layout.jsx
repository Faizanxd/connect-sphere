import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUser,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import CreatePostModal from "./CreatePostModal";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={() => window.location.reload()}
      />

      <div className="flex h-screen overflow-hidden">
        <aside
          className={`bg-white border-r shadow-sm transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="p-4 flex items-center space-x-3">
            <FaBars
              onClick={toggleSidebar}
              className="text-gray-600 cursor-pointer hover:text-gray-900 text-2xl"
            />
            {isSidebarOpen && (
              <span className="text-xl font-bold">ConnectSphere</span>
            )}
          </div>

          <div className="px-4 py-2">
            <div className="flex items-center gap-3 mb-6">
              <FaUserCircle className="w-10 h-10 text-gray-400" />
              {isSidebarOpen && (
                <div className="leading-tight">
                  <h4 className="text-base font-semibold text-gray-800 truncate">
                    {user?.name || "Guest"}
                  </h4>
                  <p className="text-sm text-gray-500">Member</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center ${
                isSidebarOpen ? "justify-start gap-3" : "justify-center"
              } bg-indigo-600 text-white ${
                isSidebarOpen ? "px-4" : "px-2"
              } py-3 rounded-lg mb-6 hover:bg-indigo-700 transition w-full`}
            >
              <FaPlusCircle
                className={`${
                  isSidebarOpen ? "text-xl" : "text-3xl"
                } transition duration-300`}
              />
              {isSidebarOpen && (
                <span className="font-semibold text-lg">Create Post</span>
              )}
            </button>

            <nav className="space-y-2">
              {[
                { to: "/", icon: <FaHome />, label: "Home" },
                { to: "/profile", icon: <FaUser />, label: "My Profile" },
              ].map(({ to, icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center ${
                    isSidebarOpen ? "justify-start gap-3" : "justify-center"
                  } p-3 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200`}
                >
                  <div
                    className={`${
                      isSidebarOpen ? "text-xl" : "text-3xl"
                    } transition`}
                  >
                    {icon}
                  </div>
                  {isSidebarOpen && <span className="text-md">{label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex flex-col flex-1 min-w-0">
          <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            {!isSidebarOpen ? (
              <span className="text-xl font-bold text-black">
                ConnectSphere
              </span>
            ) : (
              <div />
            )}

            <div className="ml-auto flex items-center space-x-6 relative">
              <FaUserCircle
                className="w-8 h-8 text-gray-600 cursor-pointer hover:text-black"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 shadow-md rounded-md w-32 py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
