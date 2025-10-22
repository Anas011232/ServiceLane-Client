import React, { use, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import Footer from '../Footer/Footer';

const Register = () => {
  const { createUser, signInGoogle } = use(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((result) => {
        navigate('/');
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInGoogle()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 transform transition duration-300 hover:scale-[1.02] hover:shadow-purple-500/30">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Create Your Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-200 font-medium mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full input input-bordered bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-1">Photo URL</label>
              <input
                name="photo"
                type="text"
                placeholder="Enter photo URL"
                className="w-full input input-bordered bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full input input-bordered bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter strong password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must include uppercase, lowercase, and number"
                className="w-full input input-bordered bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Must include uppercase, lowercase & number.
              </p>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 font-semibold rounded-xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white border-0 
                        transition-all duration-300 hover:from-pink-700 hover:via-purple-800 hover:to-indigo-900 
                        hover:shadow-lg hover:scale-105"
            >
              Register Now
            </button>
          </form>

          <div className="mt-4 text-center text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-400 hover:underline">
              Login
            </Link>
          </div>

          <div className="divider text-gray-400">or</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-gray-800 font-semibold rounded-xl 
                       border border-gray-300 transition-all duration-300 hover:bg-gray-100 hover:shadow-md"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </svg>
            Sign up with Google
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
