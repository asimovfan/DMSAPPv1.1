import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ServerApiAddress } from "../util/ServerApi";

export const AuthContext = createContext({
  token: "",
  pushtoken: "", //
  isAuthenticated: false,
  pushtokenset: (pushtoken) => {}, //
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [pushNotificationToken, setpushNotificationToken] = useState(); //

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }
  //
  function pushtokenset(pushtoken) {
    setpushNotificationToken(pushtoken);
  }
  //
  function logout() {
    //ngrock
    const backendurl = ServerApiAddress();
    const response = axios.post(
      backendurl + "/api/v1/logout",
      {},

      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    pushtoken: pushNotificationToken, //
    isAuthenticated: !!authToken,
    pushtokenset: pushtokenset, //
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
