import React, { use, useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';




const Login = () => {

    const { signIn, signInGoogle, } = use(AuthContext)
    const [error, setError] = useState('')
    // const [success,setSuccess]=useState(false)

    const navigate = useNavigate();
    const emailRef = useRef();

    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setError('')

        signIn(email, password)
            .then(result => {
                // console.log(result.user)
                // sendEmailVerification(auth.currentUser)
                // .then(()=>{
                //     if(!result.user.emailVerified)
                //     {
                //         alert('Please Verify your email');
                //     }
                //     else{
                //         setSuccess(true)
                //     }
                // })
                navigate('/')
                console.log(result)

            })
            .catch(error => {
                setError(error.message)
            })


    }

    const handleGoogleLogin = () => {
        setError('')
        signInGoogle()
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                setError(err.message);
            });
    }


    return (
        <div className="min-h-screen flex flex-col">
            <nav>
                <Navbar />
            </nav>


            <main className="flex-grow mb-10">
                <div className="flex justify-center items-center mt-14 bg-base-100 px-4">
                    <div className="card bg-base-100 w-full mx-auto mt-20 max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className='text-2xl mx-auto font-bold'>Please Login</h1>
                            <form onSubmit={handleSignIn} className="fieldset">

                                <label className="label">Email</label>
                                <input name="email" type="email" className="input" placeholder="Email" ref={emailRef} required />

                                <label className="label">Password</label>
                                <label className="input validator">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </g>
                                    </svg>

                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Password"
                                        minLength="8"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must include uppercase, lowercase, and number"
                                    />
                                </label>
                               

                                <p className="validator-hint hidden text-sm text-gray-500">
                                    Must be more than 8 characters, including:<br />
                                    - At least one number<br />
                                    - One lowercase<br />
                                    - One uppercase
                                </p>

                                {error && <h1 className='text-red-500'>{error}</h1>}

                                <Link to="/register">
                                    <h1 className='mt-2'>New to this website? Please <span className='text-blue-500 underline'>Register</span></h1>
                                </Link>

                                <button className="btn btn-accent mt-4">Login</button>
                            </form>
                            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>

    );
};

export default Login;