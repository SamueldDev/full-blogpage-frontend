


import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   useEffect(() => {
//     if (token) {
//       // Later: fetch user profile
//     }
//   }, [token]);

//   const login = (token, userData) => {
//     localStorage.setItem("token", token); // store in browser
//     localStorage.setItem("user", JSON.stringify(userData)) // optional
//     setToken(token);  // store in react
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken("");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;



























//  const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // ✅ Load from localStorage on first render
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   const login = (userData, token) => {
//     setUser(userData);
//     setToken(token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// export default AuthProvider;







const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    // ✅ Load user from localStorage if token exists
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
