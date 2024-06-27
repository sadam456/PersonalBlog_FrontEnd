import React, { useContext, useState, createContext, useEffect } from "react";
import {
  auth,
  firestore,
  docFn,
  setDocFn,
  signInWithEmailAndPasswordFn,
  createUserWithEmailAndPasswordFn,
  updatePasswordFn,
  reauthenticateWithCredentialFn,
  EmailAuthProviderFn,
} from "../utils/firebaseConfig";
import { signOut, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPasswordFn(
      auth,
      email,
      password
    );
    setCurrentUser(userCredential.user);
    //console.log(userCredential.user);
    return userCredential.user;
  };

  const socialLogin = async (provider) => {
    const result = await signInWithPopup(auth, provider);
    setCurrentUser(result.user);
    return result.user;
  };

  const register = async (email, password, user) => {
    const userCredential = await createUserWithEmailAndPasswordFn(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // Store additional user info in Firestore
    await setDocFn(docFn(firestore, "users", firebaseUser.uid), {
      id: firebaseUser.uid,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: "", // Placeholder for bio, you can update it later
      profilePic: "", // Placeholder for profilePic, you can update it later
      skills: [],
      interests: [],
      topics: [],
      socialMediaLinks: {},
    });
    setCurrentUser(firebaseUser);
    return firebaseUser;
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProviderFn.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredentialFn(user, credential);
      await updatePasswordFn(user, newPassword);
      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      console.error("Error updating password:", error);
      return { success: false, message: error.message };
    }
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const value = {
    currentUser,
    socialLogin,
    login,
    register,
    logout,
    updatePassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
