import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';

import { BiLogoFlutter } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';



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

    const renderNavLinks = () => (
        <>
            <NavLink to="/" className="text-white hover:text-cyan-300 transition">Home</NavLink> <br />
            <NavLink to="/services" className="text-white hover:text-cyan-300 transition">Services</NavLink>

            {user && (
                <div className="relative">
                    <button
                        className="flex items-center gap-1 text-white hover:text-cyan-300 transition"
                        onClick={() => setDashboardOpen(!dashboardOpen)}
                    >
                        Dashboard <FaChevronDown size={12} />
                    </button>
                    {dashboardOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                            <NavLink to="/dashboard/add-service" className="block px-4 py-2 hover:bg-gray-200">Add Service</NavLink>
                            <NavLink to="/dashboard/manage-service" className="block px-4 py-2 hover:bg-gray-200">Manage Service</NavLink>
                            <NavLink to="/dashboard/booked-services" className="block px-4 py-2 hover:bg-gray-200">Booked Services</NavLink>
                            <NavLink to="/dashboard/service-todo" className="block px-4 py-2 hover:bg-gray-200">Service To-Do</NavLink>
                        </div>
                    )}
                </div>
            )}
        </>
    );

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
                <BiLogoFlutter className="text-white" size={28} />
                <span className="text-white font-bold text-xl">Roomies</span>

                {mobileNavOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-gradient-to-br from-indigo-800 via-purple-800 to-fuchsia-700 rounded-md shadow-lg z-50 p-3 space-y-2">
                        {renderNavLinks()}
                        {!user && (
                            <>
                                <NavLink to="/register" className="block text-white hover:underline">Signup</NavLink>
                                <NavLink to="/login" className="block text-white hover:underline">Login</NavLink>
                            </>
                        )}
                        {user && (
                            <div className="flex items-center gap-2 mt-3">
                                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border" />
                                <span className="text-white">{user.displayName || "User"}</span>
                            </div>
                        )}
                        {user && (
                            <button
                                onClick={handleSignOutUser}
                                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded w-full mt-2"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex space-x-6">
                {renderNavLinks()}
            </div>

            {/* End */}
            <div className="navbar-end relative">
                {!user ? (
                    <>
                        <NavLink to="/register" className="btn bg-[#00ADB5] text-white border-0 mr-2">
                            Signup
                        </NavLink>
                        <Link to="/login" className="btn bg-[#00ADB5] text-white border-0">
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
                                        <p className="font-semibold text-[#222831]">{user.displayName || 'User'}</p>
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
        </div>
    );
};

export default Navbar;
