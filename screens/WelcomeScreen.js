import axios from "axios";
import React from "react";

import { useContext, useEffect, useState } from "react";
import { ServerApiAddress } from "../util/ServerApi";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import OpenMaps from "./OpenMaps";
import * as Device from "expo-device";
import * as Network from "expo-network";
import NetInfo from "@react-native-community/netinfo";

async function GetDataHook() {
  useEffect(() => {
    async function GetData() {
      const DutyDetails = await FetchData(token);
      console.log("Duty Details fetched on refresh:");
      console.log(DutyDetails);
      // setFetchedMesssage(DutyDetails);
    }
    GetData();
  }, []);
}
async function SendDeviceDetails(token, DeviceDetails, userid) {
  const backendurl = ServerApiAddress();
  console.log("Sending userid", userid);
  console.log("Sending Device details");
  //const response = "null";
  const url = backendurl + `/api/v1/mobile`;
  //const url =`https://8f87-122-161-90-27.ngrok.io/api/v1/mobile`;
  //const url = `https://dmsbackend.amprosystems.in/api/v1/mobile`;
  try {
    const response = await axios.post(
      url,
      {
        //connectionType: "abc",
        //deviceIp: "22",
        userId: userid,
        data: DeviceDetails,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("device details api response", response);
    return response;
  } catch (error) {
    console.log("Error Device details API:", error);
  }
}

async function FetchData(token) {
  const backendurl = ServerApiAddress();
  console.log("Duty Data req sent to server");
  const response = await axios.get(
    //"https://test-49947-default-rtdb.firebaseio.com/DutyDetails.json" //firebase

    backendurl + `/api/v1/duty`,
    //`https://8f87-122-161-90-27.ngrok.io/api/v1/duty`,
    { headers: { Authorization: `Bearer ${token}` } }
  ); //ngrock
  console.log("Duty Details received are:");
  console.log(response.data);
  //console.log("Duty Type:", response.data.data[0].dutyType);
  //console.log(response.data.DutyStartFrom);
  //const DutyDetailsList = [];

  if (response.data.data[0].dutyType === "ESCORT") {
    let tempList = new Array();
    let tempMidStationList = new Array();

    /*
  //firebase
  if (response.data.startStationMarked === false) {
    tempList = [response.data.startStation];
  }
  if (response.data.mid1StationMarked === false) {
    tempList = [...tempList, response.data.mid1Station];
  }
  if (response.data.mid2StationMarked === false) {
    tempList = [...tempList, response.data.mid2Station];
  }
  if (response.data.endStationMarked === false) {
    tempList = [...tempList, response.data.endStation];
  }
  */
    //ngrock

    if (response.data.data[0].startStationMarked === 0) {
      tempList = [response.data.data[0].startStation];
    }
    console.log("start station", response.data.data[0].startStation);

    if (
      response.data.data[0].mid1StationMarked === 0 &&
      response.data.data[0].mid1Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid1Station];
    }
    if (
      response.data.data[0].mid2StationMarked === 0 &&
      response.data.data[0].mid2Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid2Station];
    }
    if (
      response.data.data[0].mid3StationMarked === 0 &&
      response.data.data[0].mid3Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid3Station];
    }
    if (
      response.data.data[0].mid4StationMarked === 0 &&
      response.data.data[0].mid4Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid4Station];
    }
    if (response.data.data[0].endStationMarked === 0) {
      tempList = [...tempList, response.data.data[0].endStation];
    }

    if (response.data.data[0].mid1Station != "") {
      tempMidStationList = [
        ...tempMidStationList,
        response.data.data[0].mid1Station,
      ];
    }
    if (response.data.data[0].mid2Station != "") {
      tempMidStationList = [
        ...tempMidStationList,
        response.data.data[0].mid2Station,
      ];
    }
    if (response.data.data[0].mid3Station != "") {
      tempMidStationList = [
        ...tempMidStationList,
        response.data.data[0].mid3Station,
      ];
    }
    if (response.data.data[0].mid4Station != "") {
      tempMidStationList = [
        ...tempMidStationList,
        response.data.data[0].mid4Station,
      ];
    }

    /*console.log("duty station list", tempList);

    let midlisttemp = tempList.splice(1, tempList.length - 1);
    console.log("list with start removed", midlisttemp);
    let midsize = midlisttemp.length;
    console.log("midlisttemp.length", midlisttemp.length);
    let midlisttemp2 = midlisttemp.splice(1,midsize);
    console.log("list with end removed", midlisttemp2);*/

    const DutyDetailsObject = {
      //ngrock array is being passed so for all change accordingly
      dutyId: response.data.data[0].dutyId,
      userId: response.data.data[0].userId,
      userName: response.data.data[0].userName,
      userPno: response.data.data[0].userPno,
      dutyType: response.data.data[0].dutyType,
      trainNumber: response.data.data[0].trainNumber,
      trainName: response.data.data[0].trainName,
      startStation: response.data.data[0].startStation,
      mid1Station: response.data.data[0].mid1Station,
      mid2Station: response.data.data[0].mid2Station,
      mid3Station: response.data.data[0].mid3Station,
      mid4Station: response.data.data[0].mid4Station,
      endStation: response.data.data[0].endStation,
      userStartLat: response.data.data[0].startStationLat,
      userStartLong: response.data.data[0].startStationLong,
      //userMiddleLat: response.data.data[0].middleStationLat,
      //userMiddleLong: response.data.data[0].middleStationLong,
      userEndLat: response.data.data[0].endStationLat,
      userEndLong: response.data.data[0].endStationLong,
      /*midStationList: [
        response.data.data[0].mid1Station,
        response.data.data[0].mid2Station,
        response.data.data[0].mid3Station,
        response.data.data[0].mid4Station,
      ],*/
      midStationList: tempMidStationList,
      stationList: tempList,
      //platformNumber: response.data.data[0].platformNumber,
      remarks: response.data.data[0].remarks,

      /*
    //data as per firebase
    // SelectStation: response.data.SelectStation,
    //stationList: response.data.SelectStation,//to be used when complete list comes as array from backend
    Status: response.data.Status,
    dutyId: response.data.dutyId,
    userName: response.data.userName,
    userPno: response.data.userPno,
    dutyType: response.data.dutyType,
    trainNumber: response.data.trainNumber,
    trainName: response.data.trainName,
    startStation: response.data.startStation,
    mid1Station: response.data.mid1Station,
    mid2Station: response.data.mid2Station,
    endStation: response.data.endStation,
    userStartLat: response.data.startStationLat,
    userStartLong: response.data.startStationLong,
    //userMid1Lat: response.data.mid1StationLat,
    //userMid1Long: response.data.mid1StationLong,
    //userMid2Lat: response.data.mid2StationLat,
    //userMid2Long: response.data.mid2StationLong,
    userEndLat: response.data.endStationLat,
    userEndLong: response.data.endStationLong,
    platformNumber: response.data.platformNumber, //platform duty
    midStationList: [response.data.mid1Station, response.data.mid2Station],
    stationList: tempList,
    */
    };
    //console.log("Fetched Duty Details:", DutyDetailsObject);
    return DutyDetailsObject;
  } //end of ESCORT Duty
  else {
    let tempList = new Array();
    // console.log("Platform Duty Received");
    /*
  //firebase
  if (response.data.startStationMarked === false) {
    tempList = [response.data.startStation];
  }
  if (response.data.mid1StationMarked === false) {
    tempList = [...tempList, response.data.mid1Station];
  }
  if (response.data.mid2StationMarked === false) {
    tempList = [...tempList, response.data.mid2Station];
  }
  if (response.data.endStationMarked === false) {
    tempList = [...tempList, response.data.endStation];
  }
  */
    //ngrock

    if (response.data.data[0].startStationMarked === 0) {
      tempList = ["START"];
    }
    if (
      response.data.data[0].mid1StationMarked === 0 &&
      response.data.data[0].mid1Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid1Station];
    }
    if (
      response.data.data[0].mid2StationMarked === 0 &&
      response.data.data[0].mid2Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid2Station];
    }
    if (
      response.data.data[0].mid3StationMarked === 0 &&
      response.data.data[0].mid3Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid3Station];
    }
    if (
      response.data.data[0].mid4StationMarked === 0 &&
      response.data.data[0].mid4Station != ""
    ) {
      tempList = [...tempList, response.data.data[0].mid4Station];
    }

    if (response.data.data[0].endStationMarked === 0) {
      tempList = [...tempList, "END"];
    }

    const DutyDetailsObject = {
      //ngrock array is being passed so for all change accordingly
      dutyId: response.data.data[0].dutyId,
      userId: response.data.data[0].userId,
      userName: response.data.data[0].userName,
      userPno: response.data.data[0].userPno,
      dutyType: response.data.data[0].dutyType,
      startStation: response.data.data[0].startStation,
      userStartLat: response.data.data[0].startStationLat,
      userStartLong: response.data.data[0].startStationLong,
      dutyList: tempList,
      startPointName: response.data.data[0].startPointName, //
      startDateTime: response.data.data[0].startDateTime,
      endDateTime: response.data.data[0].endDateTime,
      remarks: response.data.data[0].remarks,
    };
    console.log("Fetched Duty Details:", DutyDetailsObject);
    return DutyDetailsObject;
  } //end of else
}

function WelcomeScreen({ navigation }) {
  const [FetchedMesssage, setFetchedMesssage] = useState([]);
  const [SelectedStation, setSelectedStation] = useState("empty");
  const [DutyStartEnd, setDutyStartEnd] = useState("empty");
  const [DutyId, setDutyId] = useState(0);
  const [UserPno, setUserPno] = useState(0);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const fetchedpushtoken = authCtx.pushtoken;
  const newArr = fetchedpushtoken.slice(23, 64);
  const [DeviceIPValue, setDeviceIPValue] = useState();
  const [DeviceConnectionType, setDeviceConnectionType] = useState();
  const [DeviceIsConnected, setDeviceIsConnected] = useState();
  const [ConnectionDetails, setConnectionDetails] = useState();
  var userid = 2;
  //Alert.alert(newArr);

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      async function GetData() {
        const DutyDetails = await FetchData(token);
        //console.log("Duty Details are as follows:");
        //console.log(DutyDetails);
        setFetchedMesssage(DutyDetails);
      }
      GetData();
    });
    return focusHandler;
  }, [navigation]);

  async function SendPushToken() {
    const response = await axios.put(
      "https://test-49947-default-rtdb.firebaseio.com/pushtoken.json?auth=" +
        token,
      fetchedpushtoken
    );
    console.log("Fetched push token from memory sent to server");
    console.log(fetchedpushtoken);
    //console.log("Extracted Value");
    //console.log(newArr);

    //ngrock
    /*
    const response = await axios.post(
      //"https://test-49947-default-rtdb.firebaseio.com/DutyDetails.json" //firebase
  
      backendurl + "/api/v1/coordinate",
      {
        station: location.station,
        lat: location.lat,
        long: location.long,
        accuracy: location.accuracy,
        userPno: location.userPno,
        dutyId: location.dutyId,
        createdAt: location.createdAt,
       
      },
  
      { headers: { Authorization: `Bearer ${token}` } }
    ); //ngrock
  */
    //console.log("coordinate api response", response);
    return response;
  }

  //var DutyStationChosen = false;
  //console.log("Welcome page accessed");
  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "grey", marginHorizontal: 5 }}
      />
    );
  };
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  //var name;
  //console.log("DutyStationChosen:", DutyStationChosen);

  /*
  useEffect(() => {
    async function GetData() {
      const DutyDetails = await FetchData(token);
      //console.log("Duty Details are as follows:");
      //console.log(DutyDetails);
      setFetchedMesssage(DutyDetails);
    }
    GetData();
  }, []);*/
  const getItem = (name) => {
    Alert.alert("Station Selected:", name);
    setSelectedStation(name);
  };
  const getItem2 = (name) => {
    Alert.alert("Duty Selected:", name);
    setDutyStartEnd(name);
  };

  const ItemDetails = {
    Stationname: SelectedStation,
    UserPno: FetchedMesssage.userPno,
    DutyId: FetchedMesssage.dutyId,
  };

  const DutyTypeDetails = {
    Stationname: DutyStartEnd,
    UserPno: FetchedMesssage.userPno,
    DutyId: FetchedMesssage.dutyId,
  };
  //const DeviceIP=await Network.getIpAddressAsync();

  useEffect(() => {
    async function GetIP() {
      const DeviceIP = await Network.getIpAddressAsync();
      //console.log("Device IP:");
      //console.log(DeviceIP);
      setDeviceIPValue(DeviceIP);
      //setFetchedMesssage(DutyDetails);
    }
    GetIP();
  }, []);
  /*const YourComponent = () => {
    const netInfo = useNetInfo();
    console.log("Connection type", netInfo.type);
    console.log("Is connected?", netInfo.isConnected);
    //console.log("Signal strength", netInfo.details);
  };*/

  NetInfo.fetch().then((state) => {
    //console.log("Connection type", state.type);
    setDeviceConnectionType(state.type);
    //console.log("Is connected?", state.isConnected);
    //setDeviceIsConnected(state.isConnected);
    //console.log("Details", state.details);
    setConnectionDetails(state.details);
  });
  try {
    if (FetchedMesssage.userId > 0) {
      userid = FetchedMesssage.userId;
    }
  } catch (error) {
    console.log("Error in fetching duty details:", error);
  }

  const DeviceDetails = {
    //UserPno: userid,
    OnHardware: Device.isDevice, //tells wether physical device or simulator
    DeviceManufacturer: Device.manufacturer, //tells device manufacturer
    DeviceModelName: Device.modelName, //tells device model number
    DeviceOsName: Device.osName, //tells OS running on device
    DeviceOsVersion: Device.osVersion, //tells OS version running on device
    DevicePlatformApiLevel: Device.platformApiLevel, //tells SDK version running on device
    DeviceIP: DeviceIPValue, //tells IPv4 address of device
    ConnectionType: DeviceConnectionType, //tells type of connection(cellular,wifi etc.)
    DeviceConnectionState: DeviceIsConnected, //true if a network
    ApkVersion: 1.0,
    //ConnectionStatus: ConnectionDetails, //based on type of connection returns details of connection
  };
  //console.log("Device Details", DeviceDetails);
  //SendDeviceDetails(token, DeviceDetails, userid);
  //console.log("Hardware Details:", DeviceDetails);
  //sending pushnotifications to server remove comment when sending push token to backend
  /*
  try {
    const responsepushtoken = SendPushToken();
  } catch (error) {
    console.log("Error in sending pushtoken to server", error);
  }*/
  switch (FetchedMesssage.dutyType) {
    case "ESCORT":
      return (
        <View style={styles.appContainer}>
          <View style={styles.listContainer}>
            <Text style={styles.text}>Name:</Text>
            <Text style={styles.text}>{FetchedMesssage.userName}</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.text}>Duty Type:</Text>
            <Text style={styles.text}>{FetchedMesssage.dutyType}</Text>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.text}>Train No.:</Text>
            <Text style={styles.text}>{FetchedMesssage.trainNumber}</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.text}>Train Name:</Text>
            <FlatList
              horizontal={true}
              data={FetchedMesssage.trainName}
              renderItem={(itemData2) => {
                return (
                  <View>
                    <Text style={styles.textlisthorizontal}>
                      {itemData2.item}
                    </Text>
                  </View>
                );
              }}
              //keyExtractor={(item, index) => {
              //   return item;
              // }}
              //ItemSeparatorComponent={myItemSeparator}
              ListEmptyComponent={myListEmpty}
              //alwaysBounceVertical={false}
            />
          </View>
          <View style={styles.listContainer}>
            <TouchableOpacity
              onPress={() =>
                OpenMaps(
                  FetchedMesssage.userStartLat,
                  FetchedMesssage.userStartLong
                )
              }
              style={styles.text}
            >
              <Text style={styles.text}>Open Start Location:</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{FetchedMesssage.startStation}</Text>
          </View>
          <View style={styles.listContainer}>
            <View>
              <Text
                style={
                  styles.text
                  // fontSize: 25,
                  //textAlign: "center",
                  // marginTop: 5,
                  // fontWeight: "bold",
                  //textDecorationLine: "underline",
                }
              >
                Middle Stations:
              </Text>
            </View>
            <FlatList
              data={FetchedMesssage.midStationList}
              renderItem={(itemData1) => {
                return (
                  <View>
                    <Text style={styles.textlist}>{itemData1.item}</Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => {
                return item;
              }}
              ItemSeparatorComponent={myItemSeparator}
              ListEmptyComponent={myListEmpty}
              alwaysBounceVertical={false}
            />
          </View>

          <View style={styles.listContainer}>
            <TouchableOpacity
              onPress={() =>
                OpenMaps(
                  FetchedMesssage.userEndLat,
                  FetchedMesssage.userEndLong
                )
              }
              style={styles.text}
            >
              <Text style={styles.text}>Open End Location:</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{FetchedMesssage.endStation}</Text>
          </View>

          <View style={styles.listContainer}>
            <View>
              <Text
                style={
                  styles.text
                  // fontSize: 25,
                  //textAlign: "center",
                  // marginTop: 5,
                  // fontWeight: "bold",
                  //textDecorationLine: "underline",
                }
              >
                Select Duty Station:
              </Text>
            </View>
            <FlatList
              data={FetchedMesssage.stationList}
              renderItem={(itemData) => {
                return (
                  <View style={styles.goalItem}>
                    <TouchableOpacity
                      onPress={() => getItem(itemData.item)}
                      style={styles.selecttext}
                    >
                      <Text style={styles.goalText}>{itemData.item}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => {
                return item;
              }}
              ItemSeparatorComponent={myItemSeparator}
              ListEmptyComponent={myListEmpty}
              alwaysBounceVertical={false}
            />
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.text}>Remarks:</Text>
            <FlatList
              horizontal={true}
              data={FetchedMesssage.remarks}
              renderItem={(itemData3) => {
                return (
                  <View>
                    <Text style={styles.textlisthorizontal}>
                      {itemData3.item}
                    </Text>
                  </View>
                );
              }}
              //keyExtractor={(item, index) => {
              //   return item;
              // }}
              //ItemSeparatorComponent={myItemSeparator}
              ListEmptyComponent={myListEmpty}
              //alwaysBounceVertical={false}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              SelectedStation != "empty"
                ? navigation.replace("BiometricAuthPage", {
                    //StationSelected: SelectedStation,
                    ItemsForTransfer: ItemDetails,
                  })
                : Alert.alert("Select Duty Station first");
            }}
            style={styles.btn}
          >
            <Text style={styles.buttontext}>Mark Presence</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Welcome");
            }}
            style={styles.btn}
          >
            <Text style={styles.buttontext}>Refresh</Text>
          </TouchableOpacity>
        </View>

        /////////////Removed Code/////////
        /*      
      <View style={styles.goalsContainer}>
        <Text style={styles.text}>Status: {FetchedMesssage.Status}</Text>
      </View>
            <View style={styles.goalsContainer}>
        <Text style={styles.text}>
          Duty Starts From: {FetchedMesssage.startStation}
        </Text>
      </View>
      <View style={styles.goalsContainer}>
        <Text style={styles.text}>
          Duty Ends at: {FetchedMesssage.endStation}
        </Text>
      </View>
      
      
      
      */
      );
      break;
    /**PLATFORM
     * Name
     * Duty type
     * Duty Station
     * Platform Number(startPointName)
     * Start time
     * End Time
     * Select Duty Mode:START/END(instead of station name send this)
     */

    case "PLATFORM":
    case "CIRCULATING":
    case "PICKET":
    case "OUTER":
    case "OFFICE":
    case "OTHER":
      return (
        <View style={styles.appContainer}>
          <View style={styles.listContainer}>
            <Text style={styles.text}>Name:</Text>
            <Text style={styles.text}>{FetchedMesssage.userName}</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.text}>Duty Type:</Text>
            <Text style={styles.text}>{FetchedMesssage.dutyType}</Text>
          </View>
          <View style={styles.listContainer}>
            <TouchableOpacity
              onPress={() =>
                OpenMaps(
                  FetchedMesssage.userStartLat,
                  FetchedMesssage.userStartLong
                )
              }
              style={styles.text}
            >
              <Text style={styles.text}>Duty Station:</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{FetchedMesssage.startStation}</Text>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.text}>Platform Number</Text>
            <Text style={styles.text}>{FetchedMesssage.startPointName}</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.text}>Start Date Time:</Text>
            <Text style={styles.text}>{FetchedMesssage.startDateTime}</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.text}>End Date Time:</Text>
            <Text style={styles.text}>{FetchedMesssage.endDateTime}</Text>
          </View>
          <View style={styles.listContainer}>
            <View>
              <Text
                style={
                  styles.text
                  // fontSize: 25,
                  //textAlign: "center",
                  // marginTop: 5,
                  // fontWeight: "bold",
                  //textDecorationLine: "underline",
                }
              >
                Select Duty Nature:
              </Text>
            </View>
            <FlatList
              data={FetchedMesssage.dutyList}
              renderItem={(itemData) => {
                return (
                  <View style={styles.goalItem}>
                    <TouchableOpacity
                      onPress={() => getItem2(itemData.item)}
                      style={styles.selecttext}
                    >
                      <Text style={styles.goalText}>{itemData.item}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => {
                return item;
              }}
              ItemSeparatorComponent={myItemSeparator}
              ListEmptyComponent={myListEmpty}
              alwaysBounceVertical={false}
            />
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.text}>Remarks:</Text>
            <FlatList
              horizontal={true}
              data={FetchedMesssage.remarks}
              renderItem={(itemData3) => {
                return (
                  <View>
                    <Text style={styles.textlisthorizontal}>
                      {itemData3.item}
                    </Text>
                  </View>
                );
              }}
              //keyExtractor={(item, index) => {
              //   return item;
              // }}
              //ItemSeparatorComponent={myItemSeparator}
              ListEmptyComponent={myListEmpty}
              //alwaysBounceVertical={false}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              DutyStartEnd != "empty"
                ? navigation.replace("BiometricAuthPage", {
                    //StationSelected: SelectedStation,
                    ItemsForTransfer: DutyTypeDetails,
                  })
                : Alert.alert("Select Duty Type first");
            }}
            style={styles.btn}
          >
            <Text style={styles.buttontext}>Mark Presence</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Welcome");
            }}
            style={styles.btn}
          >
            <Text style={styles.buttontext}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );

      break;
    /**CIRCULAR
     * Name
     * Duty type
     * Duty Station(Start Station)
     * Duty Point(startdutyPoint)
     * Start time
     * End Time
     *Select Duty Mode:START/END(instead of station name send this)
     */
    default:
      return (
        <View style={styles.appContainer}>
          <View>
            <Text style={styles.title}>
              At Present you don't have any live duty.Please wait till your next
              duty gets live.
            </Text>
            <Text style={styles.title}></Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace("Welcome");
              }}
              style={styles.btn}
            >
              <Text style={styles.buttontext}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
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
  btn2: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    //alignSelf: "center",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginVertical: 30,
  },
  buttontext: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignItems: "flex-start",
  },
  text: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignItems: "flex-start",
  },
  textlist: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 50,
    //alignItems: "stretch",
  },
  textlisthorizontal: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 3,
    //marginHorizontal: 5,
    //alignItems: "stretch",
  },
  textFaded: {
    color: "grey",
    fontSize: 25,

    fontWeight: "600",
  },
  selecttext: {
    color: "red",
    fontSize: 25,
    fontWeight: "600",
  },
  description: {
    fontSize: 18,
    // color: "gray",
    //textAlign: "center",
    //marginHorizontal: 20,
    //marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff"',
    alignItems: "center",
    justfyContent: "center",
  },

  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    //alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 4,
    justifyContent: "space-evenly",
  },
  listContainer: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  goalItem: {
    margin: 8,
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
