//import { Text } from "react-native";
import { Button, View, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import React from "react";
var station = [
  "Kanpur Central",
  "Unnao Junction",
  "Lucknow",
  "Basti",
  "Gorakhpur",
];
//var lat = [26.4537, 26.5492, 26.8317, 26.8156, 26.7597];
//var lng = [80.3513, 80.4868, 80.9221, 82.7693, 83.3818];

export default function OpenMaps(lat, lng) {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${lat},${lng}`;
  const label = "My location";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  //var dummyurl = "https://www.google.com/maps/search/?api=1&";

  return (
    <View style={styles.container}>
      <Button
        onPress={Linking.openURL(url)}
        //onPress={Linking.openURL(dummyurl)}
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
