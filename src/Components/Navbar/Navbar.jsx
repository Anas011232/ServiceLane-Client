import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaChevronDown, FaServicestack } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  let timeoutId = null;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setHoverOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setHoverOpen(false), 200);
  };

  const handleSignOutUser = () => {
    signOutUser();
    navigate("/login");
  };

  // Common NavLink Style
  const navLinkStyle = ({ isActive }) =>
    `relative text-white font-medium transition duration-300 ${
      isActive
        ? "text-cyan-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-cyan-300"
        : "hover:text-pink-400"
    }`;

  return (
    <div className="navbar bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-md px-4 relative">
      {/* Start */}
      <div className="navbar-start flex items-center gap-2 relative">
        <button
          className="mr-3 lg:hidden text-white text-2xl"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
        <FaServicestack className="text-white" size={28} />
        <span className="text-white font-bold text-xl">ServiceLane</span>
      </div>

      {/* Center - desktop nav */}
      <div className="navbar-center hidden lg:flex space-x-8">
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/services" className={navLinkStyle}>
          Services
        </NavLink>

        {user && (
          <div className="relative">
            <button
              className="flex items-center gap-1 text-white hover:text-pink-400 transition"
              onClick={() => setDashboardOpen(!dashboardOpen)}
            >
              Dashboard <FaChevronDown size={12} />
            </button>
            {dashboardOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                <NavLink
                  to="/dashboard/add-service"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Add Service
                </NavLink>
                <NavLink
                  to="/dashboard/manage-service"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Manage Service
                </NavLink>
                <NavLink
                  to="/dashboard/booked-services"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Booked Services
                </NavLink>
                <NavLink
                  to="/dashboard/service-todo"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Service To-Do
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>

      {/* End - user avatar or login */}
      <div className="navbar-end hidden lg:flex">
        {!user ? (
          <>
            <NavLink
              to="/register"
              className="btn bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white border-1 mr-2 
             transition-all duration-300 hover:from-pink-700 hover:via-purple-800 hover:to-indigo-900 
             hover:shadow-lg hover:scale-105"
            >
              Signup
            </NavLink>

            <Link
              to="/login"
              className="btn bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white border-1 
             transition-all duration-300 hover:from-pink-700 hover:via-purple-800 hover:to-indigo-900 
             hover:shadow-lg hover:scale-105"
            >
              Login
            </Link>
          </>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={user.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#00ADB5]"
            />
            {hoverOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg z-50 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b">
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-[#00ADB5]"
                  />
                  <div>
                    <p className="font-semibold text-[#222831]">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                  onClick={handleSignOutUser}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-gradient-to-br from-indigo-800 via-purple-800 to-fuchsia-700 rounded-md shadow-lg z-50 p-4 space-y-3 block lg:hidden">
          <NavLink to="/" className="block text-white hover:text-pink-400">
            Home
          </NavLink>
          <NavLink to="/services" className="block text-white hover:text-pink-400">
            Services
          </NavLink>

          {user ? (
            <>
              <p className="text-white font-semibold">Dashboard</p>
              <NavLink
                to="/dashboard/add-service"
                className="block px-2 py-1 text-white hover:bg-indigo-700 rounded"
              >
                Add Service
              </NavLink>
              <NavLink
                to="/dashboard/manage-service"
                className="block px-2 py-1 text-white hover:bg-indigo-700 rounded"
              >
                Manage Service
              </NavLink>
              <NavLink
                to="/dashboard/booked-services"
                className="block px-2 py-1 text-white hover:bg-indigo-700 rounded"
              >
                Booked Services
              </NavLink>
              <NavLink
                to="/dashboard/service-todo"
                className="block px-2 py-1 text-white hover:bg-indigo-700 rounded"
              >
                Service To-Do
              </NavLink>
              <div className="flex items-center gap-2 mt-4">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-white">{user.displayName || "User"}</span>
              </div>
              <button
                onClick={handleSignOutUser}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded w-full mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/register" className="block text-white hover:text-pink-400">
                Signup
              </NavLink>
              <NavLink to="/login" className="block text-white hover:text-pink-400">
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
