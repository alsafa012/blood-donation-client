import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {app} from "../Firebase/firebase.config";
import useAxiosPublic from "../Components/hooks/useAxiosPublic";

// Create Context
export const AuthContext = createContext(null);

// import autn and google provider from firebase

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email and password
  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // User Profile updates
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // sign out user
  const userSignOut = () => {
    // setLoading(true);
    setLoading(false);
    return signOut(auth);
  };

  //hold user information
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         console.log(currentUser);
         setUser(currentUser);
         setLoading(false);
    });
    return () => {
         unsubscribe();
    };
}, []);

  const authInfo = {
    user,
    loading,
    createUser,
    userSignIn,
    userSignOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
