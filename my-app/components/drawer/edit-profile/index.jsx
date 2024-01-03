import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import bg from "../../../assets/bg.png";
import enviroment from "../../../environment/enviroment";

export default EditProfile = () => {
  // AsyncStorage.getItem("")
  const [NameInput, onChangeNameInput] = useState("");
  const [EmailInput, onChangeEmailInput] = useState("");
  const [PasswordInput, onChangePasswordInput] = useState("");
  const [check, setCheck] = React.useState(null);
  const editUser = async () => {
    (await firebase.initializeApp(enviroment.firebaseConfig))
      .firestore()
      .collection("Users")
      .get();
  };

  React.useEffect(() => {
    async function checkData() {
      setCheck(JSON.parse(await AsyncStorage.getItem("user")));
      console.log(check);
    }
    checkData();
  }, []);
  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View style={[styles.container]}>
        <View style={styles.profile}>
          <Image
            source={check?.photoUrl}
            style={{
              width: 84,
              height: 84,
              borderRadius: 60,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
            }}
          >
            {check?.displayName}
          </Text>
          <Text style={{ color: "grey" }}>Paramètres</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.InputContainer}>
            <Text style={styles.InputTitle}>Nom</Text>
            <TextInput
              textAlign={"center"}
              placeholderTextColor={"gray"}
              placeholder="Votre nom complet"
              style={styles.TextInputs}
              onChangeText={onChangeNameInput}
              value={check?.displayName}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.InputTitle}>Email</Text>
            <TextInput
              textAlign={"center"}
              placeholderTextColor={"gray"}
              placeholder="Votre adresse electronique"
              style={styles.TextInputs}
              onChangeText={onChangeEmailInput}
              value={check?.email}
              aria-disabled={true}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.InputTitle}>Mot de passe</Text>
            <TextInput
              textAlign={"center"}
              placeholderTextColor={"gray"}
              placeholder="Votre mot de passe"
              style={styles.TextInputs}
              onChangeText={onChangePasswordInput}
              value={PasswordInput}
              secureTextEntry
            />
          </View>
          <Pressable
            style={{
              backgroundColor: "#5FB6DB",
              justifyContent: "center",
              alignItems: "center",
              height: "3.5em",
              width: "100%",
              marginBottom: "20%",
              marginTop: "15%",
              borderRadius: 10,
            }}
            onPress={editUser}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              ENREGISTRER
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    flex: 0.3,
    marginTop: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  main: {
    flex: 0.7,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "80%",
  },
  InputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "6.5em",
  },
  InputTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
  },
  TextInputs: {
    height: "50%",
    width: "100%",
    borderColor: "#5FB6DB",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignContent: "center",
    paddingLeft: "1em",
  },
});
