//import { Text } from "react-native";
import { Button, View, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import React from "react";

export default function EmergencyCall() {
  return (
    <View style={styles.container}>
      <Button
        //title="Open URL with ReactNative.Linking"
        onPress={Linking.openURL("tel:+919999999999")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  button: {
    marginVertical: 10,
  },
});

//<Anchor href="https://google.com">Go to Google</Anchor>;
// <Anchor href="mailto:support@expo.dev">Email support</Anchor>
