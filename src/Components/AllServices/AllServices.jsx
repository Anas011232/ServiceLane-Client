import { Link } from "react-router";
import { useLoaderData } from "react-router";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AllServices = () => {
  const services = useLoaderData();
  const [searchText, setSearchText] = useState("");

  // Filter services based on name, area, or description
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchText.toLowerCase()) ||
    service.area.toLowerCase().includes(searchText.toLowerCase()) ||
    service.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">All Services</h2>

        {/* 🔍 Search Input */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by name, area or description..."
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* 🛠️ Filtered Services Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-60 object-cover rounded-lg"
                />

                <h3 className="text-xl font-bold text-purple-800 mt-4">{service.name}</h3>

                <p className="text-gray-700 mt-2">
                  {service.description.length > 0 ? (
                    <>
                      {service.description.slice(0, 100)}...
                      <Link
                        to={`/service/${service._id}`}
                        className="text-blue-600 underline ml-1"
                      >
                        View Details
                      </Link>
                    </>
                  ) : (
                    service.description
                  )}
                </p>

                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <p><span className="font-semibold">Area:</span> {service.area}</p>
                  <p><span className="font-semibold">Price:</span> ৳{service.price}</p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${service.email.split('@')[0]}`}
                    alt="Provider"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{service.email}</p>
                    <p className="text-xs text-gray-500">Service Provider</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">No services found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllServices;
