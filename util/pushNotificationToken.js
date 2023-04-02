import * as Notifications from "expo-notifications";

export function pushNotificationToken() {
  const pushTokenData = Notifications.getExpoPushTokenAsync();
  console.log("pushTokenData:");
  console.log(pushTokenData);
  return pushTokenData;
}
