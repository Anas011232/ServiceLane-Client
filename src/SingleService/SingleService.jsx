import { useLoaderData, useNavigate } from "react-router";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Components/Context/AuthContext";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const SingleService = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
      const navigate=useNavigate()

    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        const date = form.date.value;
        const instruction = form.instruction.value;
      

        const bookingInfo = {
            serviceId: service._id,
            serviceName: service.name,
            serviceImage: service.image,
            providerEmail: service.email,
            providerName: service.name,
            userEmail: user.email,
            userName: user.displayName,
            date,
            instruction,
            price: service.price,
            serviceStatus: "pending",
        };

        fetch("https://service-server-three.vercel.app/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingInfo),
        })
            .then((res) => res.json())
            .then(() => {
                Swal.fire("Booked!", "Your service has been booked.", "success");
                setShowModal(false);
                navigate('/dashboard/booked-services')
            });
    };

    return (
        <div>
            <div>
                <Navbar></Navbar>

            </div>
            <div>
                <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 min-h-screen py-10 px-4">
                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-60 sm:h-72 object-cover"
                        />

                        <div className="p-6 sm:p-8 space-y-4">
                            <h2 className="text-2xl font-bold text-purple-800">{service.name}</h2>
                            <p className="text-gray-700 text-base">{service.description}</p>

                            <div className="flex items-center gap-3 border-t pt-4">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${service.email.split("@")[0]}`}
                                    alt="Provider"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="text-sm font-semibold">{service.email}</p>
                                    <p className="text-xs text-gray-500">Area: {service.area}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-pink-600">৳{service.price}</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition-all"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                            <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh] space-y-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-2 right-4 text-xl text-gray-400 hover:text-red-500"
                                >
                                    ×
                                </button>
                                <h3 className="text-xl font-bold text-purple-700 text-center mb-2">Confirm Booking</h3>
                                <form onSubmit={handleBooking} className="space-y-3">
                                    <input type="text" value={service._id} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <input type="text" value={service.name} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <input type="text" value={service.image} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <input type="text" value={service.email} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <input type="text" value={service.name} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <input type="text" value={user?.email} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <input type="text" value={user?.displayName} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <input type="date" name="date" required className="block w-full border rounded-md p-2 text-sm" />
                                    <textarea
                                        name="instruction"
                                        rows="3"
                                        placeholder="Special instruction (e.g., address, area, etc)"
                                        className="block w-full border rounded-md p-2 text-sm"
                                    ></textarea>
                                    <input type="text" value={`৳${service.price}`} readOnly className="block w-full border rounded-md p-2 text-sm bg-gray-100" />
                                    <button
                                        type="submit"
                                        className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700"
                                    >
                                        Purchase
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default SingleService;
