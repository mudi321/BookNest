import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Registering a user
    const registerUser = async (email,password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // Logging in a user
    const logInUser = async (email,password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    //Sign up with Google account
    const signInWithGoogle = async (email,password) => {
        return await signInWithPopup(auth, googleProvider);
    }

    //log out a user
    const logOutUser = () => {
        return signOut(auth);
    }

    //manage user state
    useEffect(() => {
      const logout = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
        
        if (user) {
            const {email, displayName} = user;
            const userData = {
                email, userName: displayName
            }
        } 
      })
    
      return () => logout();
    }, [])
    

    const value = {
        currentUser,
        loading,
        registerUser,
        logInUser,
        signInWithGoogle,
        logOutUser
    };


    return (
        
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}










