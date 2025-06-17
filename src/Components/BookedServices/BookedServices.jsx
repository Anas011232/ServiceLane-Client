import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../Context/AuthContext";

const BookedServices = () => {
  const { user } = useContext(AuthContext);
  const [bookedServices, setBookedServices] = useState([]);
//   const [loading, setLoading] = useState(false);

      
    useEffect(() => {
    if (user && user.email) {
        fetch(`http://localhost:3000/bookings?userEmail=${user.email}`)
            .then(res => res.json())
            .then(data => {
                
                const filtered = data.filter(post => post.userEmail === user.email);
                setBookedServices(filtered);
            })
            .catch(err => console.error(err));
    } else {
        setBookedServices([]);
    }
}, [user]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
            My Booked Services
          </h2>

          {bookedServices.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              You haven't booked any services yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-purple-300 transition"
                >
                  <img
                    src={service.serviceImage}
                    alt={service.serviceName}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />
                  <h3 className="text-xl font-bold text-purple-700">
                    {service.serviceName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold text-gray-800">Provider:</span>{" "}
                    {service.providerEmail}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Date:</span> {service.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Price:</span> ৳{service.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Status:</span> {service.serviceStatus}
                  </p>
                  {service.instruction && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-semibold text-gray-800">Instruction:</span> {service.instruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookedServices;
