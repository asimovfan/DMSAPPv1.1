import axios from "axios";
import { Alert } from "react-native";
import { ServerApiAddress } from "../util/ServerApi";
import React, { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const API_KEY = "AIzaSyDXHNdisWA5kDTrA5LKF7NpA2XPplfjI-8";
const backendurl = ServerApiAddress();
//Change in WelcomeScreen,auth.js,auth-context(firebase,ngrock)
async function authenticate(mode, email, password) {
  //const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const url = backendurl + `/api/v1/login`;
  //const url = `https://8f87-122-161-90-27.ngrok.io/api/v1/login`;
  /*
   */

  //console.log("Sending Authentication request");

  const response = await axios.post(url, {
    pno: email, //ngrock
    //email: email, //firebase
    password: password,
    //pushToken: storedPushToken,
    //returnSecureToken: true, //firebase
  });

  console.log(response.data);
  //const token = response.data.idToken; //firebase
  //
  const token = response.data.token; //ngrock
  //
  console.log("login token");
  console.log(token);
  return token;
}

async function changePassword(email, password, confirmEmail) {
  //const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const url = backendurl + `/api/v1/password/reset`;
  //const url = `https://b3c0-223-190-82-41.ngrok.io/api/v1/login`;
  /*
   */

  //console.log("Sending Authentication request");

  const response = await axios.post(url, {
    user_pno: email,
    old_password: confirmEmail,
    new_password: password,
    confirm_password: password,
  });

  console.log(response.data);
  //Add code based on response received from server
  /*
  if(success)
  Alert.alert(
    "Login Credentials changed successfully",
    "Go BAck to Login Page");
    else
     Alert.alert(
    "Cannot update Credentials",
    "Contact Admin");


  if (response.data.error[0] != "") {
    console.log("size: ", size(response.data.error[0]));
    return response.data.error[0];
  } else if (response.data.messages != "") {
    console.log(response.data.messages[0]);
    return response.data.messages[0];
  }*/

  return response;
}

export function createUser(email, password, confirmEmail) {
  /*console.log("change credentials received in auth.js:");
  console.log("P.No:", email);
  console.log("old password:", confirmEmail);
  console.log("new password:", password);*/
  return changePassword(email, password, confirmEmail);
}

export function login(email, password) {
  console.log("Login called");
  return authenticate("signInWithPassword", email, password);
}
