import axios from 'axios';
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyAddedService = ({ post }) => {
    const { _id, image, name, price, area, description, email } = post;

    const [visible, setVisible] = useState(true);


    const handleUserDelete = (id) => {
        Swal.fire({
            title: "Confirm Deletion",
            text: "Do you really want to delete this listing? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00adb5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/users/${id}`)
                    .then(data => {
                        if (data.data) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your roommate listing has been removed successfully.",
                                icon: "success"
                            });
                            setVisible(false);

                        }

                    });
            }
        });


    }
    if (!visible) return null;

    return (
        <div>

            <div>
                <div className="max-w-sm lg:max-w-6xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-purple-200 hover:shadow-purple-400 transition duration-300 ease-in-out">
                    <div className='grid grid-cols-1 lg:grid-cols-2'>

                        <img
                            src={image}
                            alt={name}
                            className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                        />

                        <div className="p-5">
                            <h2 className="text-2xl font-bold text-purple-800 mb-2">{name}</h2>
                            <p className="text-gray-600 mb-3 line-clamp-3">{description}</p>

                            <div className="flex items-center text-sm text-gray-700 mb-2">
                                <FaMapMarkerAlt className="text-teal-600 mr-2" />
                                <span>{area}</span>
                            </div>

                            <div className="flex items-center text-sm text-gray-700 mb-4">
                                <FaMoneyBillWave className="text-green-500 mr-2" />
                                <span>Price: ৳{price}</span>
                            </div>

                            <div className="bg-purple-100 p-3 rounded-lg text-sm mb-4">
                                <p><span className="font-semibold text-purple-700">Provider Email:</span> {email}</p>
                            </div>

                            <div className="flex gap-3">
                                <div>
                                    <Link to={`/updateUser/${_id}`}>
                                        <button

                                            className="flex-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700 pr-4 px-2 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300"
                                        >
                                            ✏️ Update
                                        </button>

                                    </Link>
                                </div>

                                <div>
                                    <button
                                        onClick={() => handleUserDelete(_id)}

                                        className="flex-1 bg-gradient-to-r from-red-500 via-pink-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-2 px-2 rounded-xl shadow-md transition duration-300"
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default MyAddedService;