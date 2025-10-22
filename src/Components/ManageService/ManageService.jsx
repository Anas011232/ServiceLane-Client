import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import MyAddedService from '../MyAddedService/MyAddedService';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { getAuth } from 'firebase/auth';

const ManageService = () => {

    const { user } = use(AuthContext)
    const [posts, setPosts] = useState([]);
    
    

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser && currentUser.email) {
            currentUser.getIdToken(/* forceRefresh */ true)
                .then(token => {
                    console.log(token);
                    fetch(`https://service-server-three.vercel.app/users?email=${currentUser.email}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            const filtered = data.filter(post => post.email === currentUser.email);
                            setPosts(filtered);
                        })
                        .catch(err => {
                            console.error('Fetch error:', err);
                            setPosts([]);
                        });
                })
                .catch(err => {
                    console.error('Token error:', err);
                    setPosts([]);
                });
        } else {
            setPosts([]);
        }
    }, [user]);

    




    // useEffect(() => {
    //     if (user && user.email) {
    //         fetch(`https://service-server-three.vercel.app/users?email=${user.email}`)
    //             .then(res => res.json())
    //             .then(data => {

    //                 const filtered = data.filter(post => post.email === user.email);
    //                 setPosts(filtered);
    //             })
    //             .catch(err => console.error(err));
    //     } else {
    //         setPosts([]);
    //     }
    // }, [user]);









    return (
        <div className='min-h-screen flex flex-col'>

            <Navbar></Navbar>

            <div className='p-5 px-3 flex-grow space-y-5 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 '>
                {
                    posts.length > 0 ? (
                        posts.map(post => <MyAddedService posts={posts} post={post} key={post._id}></MyAddedService>)
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