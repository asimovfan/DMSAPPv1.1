import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import EmergencyCall from "../../screens/EmergencyCall";
import { Colors } from "../../constants/styles";
import * as Linking from "expo-linking";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const url = `https://amprosystems.in`;

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.length > 4;
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === email;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert(
        "RESPONSE",
        "The confirm password and new password must match"
      );
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    /*
    console.log("change credentials received in AuthContent:");
    console.log("P.No:", email);
    console.log("old password:", confirmEmail);
    console.log("new password:", password);*/
    onAuthenticate({ email, password, confirmEmail });
  }

  return (
    <View>
      {isLogin ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images.png")}
          />
        </View>
      ) : (
        <View></View>
      )}

      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={EmergencyCall}>{"Contact Admin"}</FlatButton>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? "Change Password" : "Back to Log in"}
          </FlatButton>
        </View>
      </View>
      <View>
        <Text style={styles.text}>
          {isLogin ? "© 2022-Government Railway Police" : ""}
        </Text>
        <Text style={styles.text}>{isLogin ? "All Rights Reserved" : ""}</Text>
        <Text style={styles.text}>
          {isLogin ? "Designed and Developed" : ""}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => Linking.openURL(url)}
            style={styles.text}
          >
            <Text style={styles.textlink}>
              {isLogin ? "by Ampro Systems" : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 30,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 50,
    borderWidth: 0,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignSelf: "center",
  },
  textlink: {
    marginTop: 10,
    color: "olive green",
    fontSize: 20,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignSelf: "center",
  },
});
