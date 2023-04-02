import { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
//import LoginPageScreen from "./LoginPageScreen";
//import GetCoordinates from "./GetCoordinates";
import * as LocalAuthentication from "expo-local-authentication";
//import LoginPageScreen from "./LoginPageScreen";

export default function Biometric({ route }) {
  const [IsBiometricSupported, setIsBiometricSupported] = useState("false");
  const [IsBiometricAdded, setIsBiometricAdded] = useState("false");
  const [IsBiometricAuthenticated, setIsBiometricAuthenticated] =
    useState(false);
  const navigation1 = useNavigation();
  var result = 0;
  //const SelectedStation = route.params.StationSelected;
  //console.log("Selected Station in Biometric  Page:", SelectedStation);
  const ItemsForTransfer = route.params.ItemsForTransfer;
  /*console.log(
    "Selected Station in Biometric  Page:",
    ItemsForTransfer.Stationname
  );*/

  function CheckAuthenticateBiometric() {
    if (IsBiometricAuthenticated == true) {
      console.log("biometric auth successfull");
      return "true";
    } else {
      if (IsBiometricAuthenticated == false) {
        console.log("biometric auth faliure");
        return "false";
      } else {
        console.log("Something weird happening");
      }
    }
  }

  //Check if hardware supports Biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      setIsBiometricSupported(compatible);

      //console.log("Is biometric supported", IsBiometricSupported);

      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      //() => disableDeviceFallback();
      setIsBiometricAdded(savedBiometrics);
      // console.log("Is biometric saved", IsBiometricAdded);

      if (IsBiometricAuthenticated == false) {
        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate",
          //fallbackLabel: "Enter Password",
          disableDeviceFallback: true,
          cancelLabel: "Cancel",
          fallbackLabel: "",
        });
        try {
          if (auth) {
            setIsBiometricAuthenticated(auth.success);
          }
        } catch (error) {
          console.log("Error Biometric Auth:", error);
        }
      }
    })();
  });
  if (IsBiometricSupported == false) {
    Alert.alert(
      "BioMetric Not Supported",
      "Please check your mobile settings."
    );
    navigation1.navigate("Welcome");
  } else {
    if (IsBiometricAdded == false) {
      Alert.alert("BioMetric Not Added", "Please add and try again.");
      navigation1.navigate("Welcome");
    } else {
      //console.log("Biometric available and added");
      /*
      console.log(
        "Is biometric authenticated in condition",
        IsBiometricAuthenticated
      );
      if (IsBiometricAuthenticated == "false") {
        console.log("biometric auth false");
        //navigation1.navigate("Welcome");
      } else {
        console.log("biometric auth successfull");
        navigation1.navigate("GetLocationPage");
      }*/
    }
  }
  //Add Biometric check here.try using function
  //simply adding as above is not working

  return (
    <View style={styles.container}>
      <Text>Checking Biometric Credentials</Text>
      {(() => {
        if (IsBiometricAuthenticated) {
          //console.log("Successful Biometric ", IsBiometricAuthenticated);
          {
            navigation1.replace("GetLocationPage", {
              //SelectedStation: SelectedStation,
              ItemsForTransfer: ItemsForTransfer,
            });
          }
        } else {
          console.log(
            " Biometric Authentication status",
            IsBiometricAuthenticated
          );
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0893FC",
    padding: 10,
    borderRadius: 5,
    marginVertical: 30,
  },
});
