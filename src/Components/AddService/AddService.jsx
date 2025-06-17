import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const AddService = () => {
    const { user } = use(AuthContext)
    const navigate=useNavigate()

    const handleAddService = (e) => {
        e.preventDefault();
        

        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries());
        const obj={
            ...data,
            email:user.email,
            name:user.displayName,
        }

        axios.post("https://service-server-three.vercel.app/users", obj)
            .then(data => {
                console.log(data.data.insertedId)
                {
                    Swal.fire({
                        title: "Service Added Successfully!",
                        icon: "success",
                        draggable: true
                    });
                    navigate('/dashboard/manage-service')

                }
            })

        console.log(data)
    }


    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center px-4 py-8">
                    <form onSubmit={handleAddService} className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 space-y-6">
                        <h2 className="text-3xl font-bold text-center text-purple-700">Add a New Service</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    name="image"

                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700">Service Name</label>
                                <input
                                    type="text"
                                    name="name"

                                    placeholder="AC Repair, Plumbing, etc."
                                    className="w-full px-4 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700">Price (BDT)</label>
                                <input
                                    type="number"
                                    name="price"

                                    placeholder="e.g. 1500"
                                    className="w-full px-4 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700">Service Area</label>
                                <input
                                    type="text"
                                    name="area"

                                    placeholder="Dhaka, Chittagong..."
                                    className="w-full px-4 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-700">Description</label>
                            <textarea
                                name="description"

                                rows="4"
                                placeholder="Detailed service description"
                                className="w-full px-4 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            ></textarea>
                        </div>

                        {/* Provider Preview */}
                        <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-lg shadow-inner">
                            <img
                                src={user?.photoURL}
                                alt="Provider"
                                className="w-12 h-12 rounded-full border-2 border-purple-400"
                            />
                            <div>
                                <p className="text-purple-700 font-semibold">{user?.displayName}</p>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-yellow-600 transition-all duration-300"
                        >
                            Add Service
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>

    );
};

export default AddService;
