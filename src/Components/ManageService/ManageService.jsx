import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import MyAddedService from '../MyAddedService/MyAddedService';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const ManageService = () => {

    const { user } = use(AuthContext)
    

    const [posts, setPosts] = useState([])
    useEffect(() => {
    if (user && user.email) {
        fetch(`http://localhost:3000/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                
                const filtered = data.filter(post => post.email === user.email);
                setPosts(filtered);
            })
            .catch(err => console.error(err));
    } else {
        setPosts([]);
    }
}, [user]);

    
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='p-5 px-3 space-y-5 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 '>
                {
                        posts.length > 0 ? (
                            posts.map(post => <MyAddedService post={post} key={post._id}></MyAddedService>)
                        ) : (
                            <p className="text-center text-gray-600">No listings found.</p>
                        )
                    }
            </div>
            <div>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default ManageService;