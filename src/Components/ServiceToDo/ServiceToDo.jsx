import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../Context/AuthContext";

const ServiceToDo = () => {
    const { user } = useContext(AuthContext);
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://service-server-three.vercel.app/bookings?providerEmail=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    const filtered = data.filter(post => post.providerEmail === user.email);
                    setServices(filtered);
                })
                .catch(err => console.error(err));
        } else {
            setServices([]);
        }
    }, [user]);

    const handleStatusChange = (id, newStatus) => {
        fetch(`https://service-server-three.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ serviceStatus: newStatus }),
        })
            .then(res => res.json())
            .then(() => {
                const updated = services.map(service =>
                    service._id === id ? { ...service, serviceStatus: newStatus } : service
                );
                setServices(updated);
            });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10 flex-grow ">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">Service To Do</h2>
                {services.length === 0 ? (
                    <p className="text-center text-gray-600">No service to do.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <div key={service._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-purple-400 transition-all border border-purple-100">
                                <img
                                    src={service.serviceImage || service.image}
                                    alt={service.serviceName}
                                    className="h-52 w-full object-cover"
                                />
                                <div className="p-5 space-y-2">
                                    <h3 className="text-xl font-bold text-purple-800">{service.serviceName}</h3>
                                    <p className="text-gray-700 text-sm">Booked by: <span className="font-semibold">{service.userEmail}</span></p>
                                    <p className="text-gray-600 text-sm">Date: {service.date}</p>
                                    <p className="text-gray-600 text-sm">Instruction: {service.instruction}</p>
                                    <p className="text-gray-800 text-sm font-semibold">৳{service.price}</p>

                                    <div className="mt-3">
                                        <label className="text-sm font-medium text-gray-700 mr-2">Status:</label>
                                        <select
                                            className="rounded-md border border-purple-300 px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 focus:outline-none"
                                            value={service.serviceStatus}
                                            onChange={(e) => handleStatusChange(service._id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="working">Working</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ServiceToDo;
