import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link, NavLink } from 'react-router';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { 
  FaCheckCircle, 
  FaStar, 
  FaMapMarkerAlt, 
  FaUserPlus, 
  FaClipboardCheck, 
  FaTools, 
  FaClock, 
  FaMoneyBillWave 
} from 'react-icons/fa';


const Home = () => {
  const [services, setServices] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800 });

    fetch("https://service-server-three.vercel.app/users")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(error => console.error("Failed to fetch services:", error));
  }, []);

  const handleDetailsClick = (id) => {
    if (!user) navigate('/login');
    else navigate(`/service/${id}`);
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
    <div className="overflow-hidden">

      {/* ========== HERO SECTION ========== */}
      <div
        className="hero h-[500px] md:h-[650px] bg-cover bg-center rounded-sm shadow-5xl my-6 w-11/12 mx-auto relative"
        style={{ backgroundImage: "url('banner.jpg')" }}
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
              className="mb-5 text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
            >
              Find Trusted Services Fast with ServiceLane
            </motion.h1>

            <motion.p className="mb-5 text-lg text-white">
              Home repairs, beauty, or professional help — ServiceLane connects you with trusted providers near you.
            </motion.p>

            <motion.button
              className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-3 px-6 rounded-2xl text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <NavLink to="/services">Explore Our Services </NavLink>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ========== POPULAR SERVICES ========== */}
      <section className="px-4 py-20 bg-gradient-to-br from-purple-50 to-yellow-50">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-10" data-aos="fade-down">
          🔥 Popular Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.slice(0, 6).map((service, i) => (
            <motion.div
              key={service._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i + 1}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-3xl border border-purple-100 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 group"
            >
              {/* Gradient Border Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

              <div className="relative z-10 bg-white rounded-3xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-60 object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-500"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {service.description.length > 90
                      ? service.description.slice(0, 90) + '...'
                      : service.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => handleDetailsClick(service._id)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
                    >
                      View Details
                    </button>
                    <span className="text-lg font-semibold text-green-600">৳{service.price}</span>
                  </div>

                  <div className="flex items-center border-t pt-3 border-gray-200">
                    <img
                      src={`https://ui-avatars.com/api/?name=${service.email.split('@')[0]}`}
                      alt="Provider"
                      className="w-10 h-10 rounded-full mr-3 ring-2 ring-purple-300"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      {service.email.split('@')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Show All
          </Link>
        </div>
      </section>

     {/* ========== HOW IT WORKS ========== */}
<section className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 py-24">
  <h2 className="text-5xl font-extrabold text-center mb-16 text-purple-700 drop-shadow-lg">
    ⚙️ How It Works
  </h2>
  <div className="grid md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
    {[
      { title: "Sign Up", desc: "Create your account & log in quickly.", icon: <FaUserPlus size={48} className="text-purple-500 mx-auto mb-4" /> },
      { title: "Book a Service", desc: "Select your desired service & confirm instantly.", icon: <FaClipboardCheck size={48} className="text-pink-500 mx-auto mb-4" /> },
      { title: "Get It Done", desc: "Professional reaches out & completes your task.", icon: <FaTools size={48} className="text-yellow-500 mx-auto mb-4" /> },
    ].map((item, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-3xl shadow-2xl p-10 text-center border border-purple-100 hover:border-purple-300 transition-all duration-500 hover:scale-105"
        whileHover={{ y: -5, scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {item.icon}
        <h3 className="text-2xl font-bold mb-3 text-purple-800">{item.title}</h3>
        <p className="text-gray-600">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* ========== TESTIMONIALS ========== */}
<section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
  <h2 className="text-5xl font-extrabold text-center mb-12 text-purple-700 drop-shadow-lg">
    💬 What Our Clients Say
  </h2>
  <Swiper
    modules={[Pagination, Autoplay]}
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000 }}
    spaceBetween={40}
    slidesPerView={1}
    className="max-w-4xl mx-auto"
  >
    {[
      { name: "Ayesha", review: "Booking was smooth and top-notch!" },
      { name: "Rahim", review: "Found an electrician within minutes — professional!" },
      { name: "Sadia", review: "Amazing platform! Easy, quick, reliable." },
    ].map((t, i) => (
      <SwiperSlide key={i}>
        <motion.div
          className="bg-white p-10 rounded-3xl shadow-2xl border border-purple-100 text-center hover:shadow-purple-200 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        >
          <FaStar className="text-yellow-400 text-5xl mx-auto mb-4 animate-bounce" />
          <p className="text-gray-600 italic mb-4">"{t.review}"</p>
          <h4 className="text-purple-700 font-bold">— {t.name}</h4>
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

{/* ========== WHY CHOOSE US ========== */}
<section className="py-24 bg-gradient-to-r from-pink-50 to-purple-100 text-center">
  <h2 className="text-5xl font-extrabold mb-12 text-purple-700 drop-shadow-lg">💡 Why Choose ServiceLane?</h2>
  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
    {[
      { title: "Verified Professionals", desc: "Strict verification for all providers.", icon: <FaCheckCircle size={40} className="text-purple-500 mb-4 mx-auto" /> },
      { title: "Instant Booking", desc: "Confirm services in seconds.", icon: <FaClock size={40} className="text-pink-500 mb-4 mx-auto" /> },
      { title: "Affordable Pricing", desc: "Transparent pricing, no hidden fees.", icon: <FaMoneyBillWave size={40} className="text-yellow-500 mb-4 mx-auto" /> },
    ].map((item, i) => (
      <motion.div
        key={i}
        className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-purple-300 border border-purple-50 transition-all duration-500 hover:scale-105"
      >
        {item.icon}
        <h3 className="text-2xl font-bold text-purple-800 mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* ========== SERVICE AREA ========== */}
<section className="py-24 bg-gradient-to-tr from-purple-50 to-pink-100 text-center">
  <h2 className="text-5xl font-extrabold text-purple-700 mb-12 drop-shadow-lg">🌍 Expanding Across Bangladesh</h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-6">
    {["Dhaka", "Chittagong", "Comilla", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur"].map((city, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.1, y: -5 }}
        className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center border border-purple-50 hover:shadow-purple-200 transition-all duration-500"
      >
        <FaMapMarkerAlt className="text-pink-500 text-4xl mb-3 animate-pulse" />
        <h4 className="text-lg font-semibold text-purple-700">{city}</h4>
      </motion.div>
    ))}
  </div>
</section>


      
    </div>
  );
};

export default Home;
