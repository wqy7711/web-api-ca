import React, { createContext, useContext, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "../firebase/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 注册
  const registerWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error("Registration Error:", error.message);
      throw error;
    }
  };

  // 登录
  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };

  // 登出
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-Out Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerWithEmail, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
