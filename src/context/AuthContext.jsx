// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import React, { useContext, useEffect, useState } from "react";
// import { createContext } from "react";
// import { auth } from "../firebase";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// const AuthProvider = ({ children, props }) => {
//   const [currentUser, setCurrentUser] = useState("");

//   function signup(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   function login(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   function logout() {
//     return signOut(auth);
//   }

//   useEffect(() => {
//     const unscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//     return unscribe;
//   }, []);

//   const value = {
//     currentUser,
//     setCurrentUser,
//     signup,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider {...props} value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
