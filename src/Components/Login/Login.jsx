import React, { use, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';

const Login = () => {
  const { signIn, signInGoogle } = use(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError('');

    signIn(email, password)
      .then(() => navigate('/'))
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    setError('');
    signInGoogle()
      .then(() => navigate('/'))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Navbar />

      {/* ==== LOGIN CARD ==== */}
      <main className="flex-grow flex justify-center items-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-6">Welcome Back 👋</h1>
          <p className="text-gray-300 mb-8">Login to continue your journey with <span className="text-pink-400 font-semibold">ServiceLane</span></p>

          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div className="text-left">
              <label className="text-gray-200 font-medium">Email</label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                required
                placeholder="Enter your email"
                className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="text-gray-200 font-medium">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must include uppercase, lowercase, and number"
                className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full mt-3 py-3 rounded-xl font-semibold text-white 
                         bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700
                         hover:from-pink-700 hover:via-purple-800 hover:to-indigo-900 
                         transition-all duration-300 shadow-lg"
            >
              Login
            </motion.button>
          </form>

          {/* Google Login */}
          <div className="mt-5">
            <p className="text-gray-300 mb-2">or</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-gray-800 font-medium hover:bg-gray-100 transition"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>

          {/* Register Link */}
          <p className="mt-6 text-gray-300 text-sm">
            New to this website?{" "}
            <Link to="/register" className="text-pink-400 font-semibold hover:underline">
              Register Here
            </Link>
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
