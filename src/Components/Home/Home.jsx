import React, { useEffect, useState, useContext } from 'react';
import { FaBed, FaBuilding, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';



const Home = () => {
  const [services, setServices] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800 });

    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(error => console.error("Failed to fetch services:", error));
  }, []);

  const handleDetailsClick = (id) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/service/${id}`);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div>
      <div
        className="hero h-[500px] md:h-99 bg-cover bg-center rounded-sm shadow-5xl my-6 w-11/12 mx-auto relative"
        style={{
          backgroundImage: "url('banner.jpg')"
        }}
      >

        <div className="hero-overlay bg-opacity-50 absolute inset-0"></div>

        <motion.div
          className="hero-content text-neutral-content text-center relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="max-w-md mx-auto">
            <motion.h1
              className="mb-5 text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Find Trusted Services Fast with ServiceLane
            </motion.h1>

            <motion.p
              className="mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Whether you need home repairs, cleaning, or professional help — ServiceLane connects you to trusted providers near you with ease and confidence.
            </motion.p>

            <motion.button
              className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-3 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Popular Services Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-purple-50 to-yellow-50">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-10" data-aos="fade-down">
          🔥 Popular Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.slice(0, 6).map(service => (
            <motion.div
              key={service._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white border border-purple-200 rounded-3xl shadow-xl overflow-hidden hover:shadow-purple-300 transition-all duration-300"
              data-aos="fade-up"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-purple-800">{service.name}</h3>
                <p className="text-gray-600">
                  {service.description.length > 100
                    ? service.description.slice(0, 100) + '...'
                    : service.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleDetailsClick(service._id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md"
                  >
                    View Details
                  </button>
                  <span className="text-lg font-semibold text-green-600">৳{service.price}</span>
                </div>
                <div className="flex items-center mt-4 pt-3 border-t border-gray-200">
                  <img
                    src={`https://ui-avatars.com/api/?name=${service.email.split('@')[0]}`}
                    alt="Provider"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-sm text-gray-800 font-medium">
                    {service.email.split('@')[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/allServices"
            className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Show All
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-20 px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-purple-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Discover Your Ideal Living Space with <span className="text-[#ff6b6b]">ServiceLane</span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 text-lg md:text-xl mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Explore handpicked rentals, shared rooms, and co-living spaces tailored to your needs.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Card 1 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100 hover:shadow-2xl transition-shadow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <FaBed className="text-purple-500 text-6xl mb-6 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Rooms for Rent</h3>
            <p className="text-gray-600 mb-6">
              Connect with verified roommates and find cozy, budget-friendly spaces.
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Find a Room
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100 hover:shadow-2xl transition-shadow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <FaBuilding className="text-purple-500 text-6xl mb-6 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Apartments for Rent</h3>
            <p className="text-gray-600 mb-6">
              Browse full apartments—ideal for individuals, couples, or families.
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Search Rentals
            </button>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100 hover:shadow-2xl transition-shadow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <FaUsers className="text-purple-500 text-6xl mb-6 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Co-living Spaces</h3>
            <p className="text-gray-600 mb-6">
              Modern shared living with flexible terms and built-in community.
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Explore Co-living
            </button>
          </motion.div>
        </div>
      </section>



      {/* FAQ Section */}
      <div className="space-y-4 px-4 sm:px-8 md:px-16 lg:px-24 py-8">
        {[
          {
            q: 'How can I book a service on ServiceLane?',
            a: 'Simply browse the available services, click on your desired provider, and use the "Book Now" button to schedule your service.'
          },
          {
            q: 'Is it free to list my service on ServiceLane?',
            a: 'Yes, listing your service is completely free. You can create a provider profile, showcase your expertise, and attract clients.'
          },
          {
            q: 'Can I contact service providers directly?',
            a: 'Yes! Once logged in, you can message service providers directly through our secure platform to discuss details or ask questions.'
          },
          {
            q: 'What safety features does ServiceLane offer?',
            a: 'We verify user emails, allow reviews after bookings, and encourage communication within our platform to ensure a trusted environment.'
          },
          {
            q: 'How do I manage or remove my listed service?',
            a: 'Head to your dashboard, select your service from the list, and choose "Edit" or "Delete" as needed.'
          }
        ].map((item, index) => (
          <div key={index} className="collapse bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
            <div className="collapse-title font-semibold text-base sm:text-lg">{item.q}</div>
            <div className="collapse-content text-sm sm:text-base">{item.a}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
