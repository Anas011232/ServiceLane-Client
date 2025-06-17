import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../../firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider=new GoogleAuthProvider();

    const signInGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
     
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);

    }

    const forgotPass=(email)=>{
        return sendPasswordResetEmail(auth,email)

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
        
            setUser(currentUser);

            
        })
        return () => {
            unsubscribe();
        }
    }, []);

    const signOutUser = () => {
        return signOut(auth);

    }

    const userInfo = {
        user,
        createUser,
        signIn,
        signOutUser,
        loading,
        signInGoogle,
        forgotPass
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;