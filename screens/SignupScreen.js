import { useContext, useState } from "react";
import { Text, Alert, StyleSheet, View } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [createUserResponse, setcreateUserResponse] = useState();

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password, confirmEmail }) {
    setIsAuthenticating(true);
    try {
      const response = await createUser(email, password, confirmEmail);
      //console.log("error response length:", response.data.error[0].length);
      //console.log("message response length:", response.data.message[0].length);
      /*if (response.data.message[0].length > 0)
        setcreateUserResponse(JSON.stringify(response.data.message[0]));*/
      Alert.alert("RESPONSE", response.data.message[0]);
      //authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("ERROR", "Error in communication with Server");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    //return <LoadingOverlay message="Updating Password..." />;

    setIsAuthenticating(false);
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
const styles = StyleSheet.create({
  btn: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0893FC",
    padding: 10,
    borderRadius: 5,
  },
  btn2: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    fontSize: 50,
    fontWeight: "400",
    marginVertical: 30,
    textAlign: "center",
  },
  image: {
    width: 400,
    height: 461,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  greytext: {
    color: "grey",
    fontSize: 20,
    fontWeight: "500",
  },
  title: {
    fontSize: 50,
    fontWeight: "400",
    marginVertical: 30,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  paragraph: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9beda",
    alignItems: "center",
    justifyContent: "center",
  },
});
