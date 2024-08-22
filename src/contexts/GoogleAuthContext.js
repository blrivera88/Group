import React, { createContext, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleAuthContext = createContext();

const GoogleAuthProviderComponent = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleAuthContext.Provider value={{ user, setUser }}>
        {children}
      </GoogleAuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProviderComponent;
