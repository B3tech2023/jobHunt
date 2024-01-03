import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import bg from "../../assets/bg.png";
import logout from "../../assets/logout.png";
import profile1 from "../../assets/profile.png";

export default function Profile() {
  const navigation = useNavigation();
  const [check, setCheck] = React.useState(null);
  React.useEffect(() => {
    async function checkData() {
      setCheck(JSON.parse(await AsyncStorage.getItem("user")));
      console.log(check);
    }
    checkData();
  }, []);
  return (
    <ImageBackground source={bg}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image source={check?.photoUrl} style={styles.profilePhoto} />
          <Text style={styles.profileName}>{check?.displayName}</Text>
          <Text style={{ color: "grey" }}>{check?.email}</Text>
        </View>
        <View style={[styles.NavButtons, { flex: 0.8, marginTop: "7.5em" }]}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              flex: 0.6,
            }}
          >
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 60,
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  // marginBottom: 10,
                  marginRight: 30,
                }}
              >
                <Image source={profile1} style={{ width: 25, height: 25 }} />
              </View>
              <Text style={styles.button_name}>Edit profile</Text>
            </Pressable>
          </View>
          <View style={[styles.NavButtons, { flex: 0.2 }]}>
            <Pressable
              onPress={() => {
                navigation.setOptions({
                  headerShown: false,
                  headerLeft: null,
                });
                navigation.navigate("LoginScreen");
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 60,
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: 10,
                  marginBottom: 10,
                  marginRight: 30,
                }}
              >
                <Image source={logout} style={{ width: 35, height: 20 }} />
              </View>
              <Text style={styles.button_name}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff00",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    flex: 0.3,
    marginTop: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "80%",
  },
  NavButtons: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "80%",
  },
  profilePhoto: {
    width: 84,
    height: 84,
    borderRadius: 60,
    marginBottom: 25,
  },
  profileName: {
    fontSize: 30,
    fontWeight: "600",
  },
  button_name: {
    fontWeight: "500",
  },
});
