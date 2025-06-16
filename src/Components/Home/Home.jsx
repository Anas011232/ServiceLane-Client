import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FaBed, FaBuilding, FaUsers } from 'react-icons/fa';

const roommates = [
    { name: 'Marcus', age: 27, tagline: 'Roommate wanted - Houston', img: 'https://i.ibb.co/S4KdDBK5/istockphoto-1703628482-612x612.jpg' },
    { name: 'Nikko', age: 32, tagline: 'Room for rent - Atlanta', img: 'https://i.ibb.co/NdGns6hD/istockphoto-1987396547-2048x2048.jpg' },
    { name: 'Mia', age: 23, tagline: 'Roommate wanted - Los Angeles', img: 'https://i.ibb.co/S4KdDBK5/istockphoto-1703628482-612x612.jpg' },
    { name: 'Sara', age: 29, tagline: 'Looking for sublet - Chicago', img: 'https://i.ibb.co/NdGns6hD/istockphoto-1987396547-2048x2048.jpg' },
];

const Home = () => {
    const [index, setIndex] = useState(0);
    const next = () => setIndex((index + 1) % roommates.length);
    const prev = () => setIndex((index - 1 + roommates.length) % roommates.length);
    return (
        <div>
            <div
                className="hero  h-[500px] md:h-99 bg-cover bg-center rounded-sm shadow-5xl my-6 w-11/12 mx-auto"
                style={{
                    backgroundImage:
                        "url(banner.webp)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">The Best & Fastest Roommate Finder</h1>
                        <p className="mb-5">
                            Looking for a roommate, renting out a room, or teaming up to find a new place?
                            Diggz helps you find compatible roommates easily with a safe, hassle-free experience. Start your free search today!
                        </p>
                        <button className="btn btn-primary">FIND ROOMMATES & ROOMS</button>
                    </div>
                </div>
            </div>
            <div>
                <section className="py-12 bg-gray-50">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold">Find Your New Roommate</h2>
                        <p className="mt-2 text-gray-600">Some amazing people are looking for a roommate like you.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto flex items-center justify-center">
                        {/* Prev */}
                        <button onClick={prev} className="absolute left-0 p-2 bg-white rounded-full shadow-lg hover:scale-105 transition">
                            <AiOutlineLeft size={24} />
                        </button>

                        {/* Profile Card */}
                        <div className="w-64 text-center">
                            <img src={roommates[index].img} alt={roommates[index].name}
                                className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg" />
                            <h3 className="text-xl font-semibold">{roommates[index].name} | {roommates[index].age}</h3>
                            <p className="text-gray-600">{roommates[index].tagline}</p>
                        </div>

                        {/* Next */}
                        <button onClick={next} className="absolute right-0 p-2 bg-white rounded-full shadow-lg hover:scale-105 transition">
                            <AiOutlineRight size={24} />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="mt-6 flex justify-center space-x-2">
                        {roommates.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-3 h-3 rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </section>
            </div>
            <div>
                <section className="bg-[#f7f5f2] py-16 px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                        Also find rooms for rent, co-livings and apartment rentals
                    </h2>
                    <p className="text-center text-gray-500 mb-10 text-lg">
                        Explore housing options that suit your lifestyle and budget.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-200">
                            <FaBed className="text-[#2c5364] text-5xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Rooms for Rent</h3>
                            <p className="text-gray-600 mb-6">
                                Find spare rooms with roommates. Know what’s included before you move in!
                            </p>
                            <button className="bg-[#2c5364] text-white px-6 py-2 rounded-full font-medium">
                                Find a Room
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-200">
                            <FaBuilding className="text-[#2c5364] text-5xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Apartments for Rent</h3>
                            <p className="text-gray-600 mb-6">
                                Studios, family homes or shared apartments — flexible for every budget.
                            </p>
                            <button className="bg-[#2c5364] text-white px-6 py-2 rounded-full font-medium">
                                Search Rentals
                            </button>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-200">
                            <FaUsers className="text-[#2c5364] text-5xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Coliving Rooms</h3>
                            <p className="text-gray-600 mb-6">
                                Fully furnished spaces, flexible terms and amazing roommates included.
                            </p>
                            <button className="bg-[#2c5364] text-white px-6 py-2 rounded-full font-medium">
                                Search Colivings
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <div className="space-y-4 px-4 sm:px-8 md:px-16 lg:px-24 py-8">
                    <div className="collapse bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" defaultChecked />
                        <div className="collapse-title font-semibold text-base sm:text-lg">
                            How can I find a roommate?
                        </div>
                        <div className="collapse-content text-sm sm:text-base">
                            Go to the "Browse Listings" page, filter by your preferences, and connect with potential roommates by clicking on their profile.
                        </div>
                    </div>

                    <div className="collapse bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold text-base sm:text-lg">
                            Is it free to create a roommate listing?
                        </div>
                        <div className="collapse-content text-sm sm:text-base">
                            Yes, creating a listing is completely free. You can add your details, preferences, and photos to find the right match.
                        </div>
                    </div>

                    <div className="collapse bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold text-base sm:text-lg">
                            Can I message users directly?
                        </div>
                        <div className="collapse-content text-sm sm:text-base">
                            Yes! Once you're signed in, you can send messages to other users to discuss room details and compatibility.
                        </div>
                    </div>

                    <div className="collapse bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold text-base sm:text-lg">
                            What safety measures are in place?
                        </div>
                        <div className="collapse-content text-sm sm:text-base">
                            We encourage users to verify emails, use real photos, and communicate through our secure platform before sharing personal contact info.
                        </div>
                    </div>

                    <div className="collapse bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold text-base sm:text-lg">
                            How do I delete my listing?
                        </div>
                        <div className="collapse-content text-sm sm:text-base">
                            Go to your dashboard, click on your listing, and select "Delete Listing" from the options menu.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;