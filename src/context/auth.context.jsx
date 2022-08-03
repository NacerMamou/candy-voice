import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
  xrfToken: null,
  setXrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [xrfToken, setXrfToken] = useState(null);

  useEffect(() => {
    let savedAuthContext = JSON.parse(localStorage.getItem("savedAuthContext"));

    if (savedAuthContext) {
      setIsAuthenticated(savedAuthContext.isAuthenticated);
      setXrfToken(savedAuthContext.xrfToken);
    } else {
      setIsAuthenticated(false);
      setXrfToken("none");
      localStorage.setItem(
        "savedAuthContext",
        JSON.stringify({
          isAuthenticated: false,
          xrfToken: "none",
        })
      );
    }
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    xrfToken,
    setXrfToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
