import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import auth from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
  }

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const updateUserProfile = (userProfile) => {
    return updateProfile(auth.currentUser, userProfile);
  }

  const logoutUser = async() => {
    setLoading(true);
    await signOut(auth);

    localStorage.clear();
    sessionStorage.clear();

    setUser(null);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, curUser => {
      setUser(curUser);
      setLoading(false);
    })

    return () => unsubscribe();
  },[])

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    updateUserProfile,
    logoutUser
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;