import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { Text } from "react-native-paper";
import { theme } from "../../../core/theme";
import enviroment from "../../../environment/enviroment";
import ScreenHeaderBtn from "../../common/header/ScreenHeaderBtn";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "../../../constants";
import profile from "../../../assets/profile.png";

export default function RegisterScreen({ navigation }) {
  const [cPassword, setCPassword] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = async () => {
    const cPasswordError = passwordValidator(cPassword.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (
      emailError ||
      passwordError ||
      cPasswordError ||
      password.value !== cPassword.value
    ) {
      setCPassword({ ...cPassword, error: cPasswordError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const app = initializeApp(enviroment.firebaseConfig);

    const data = await createUserWithEmailAndPassword(
      getAuth(app),
      email.value,
      password.value
    );
    console.log(data);
    await AsyncStorage.setItem("token", data.user.accessToken);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    // alert();
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
      ),
      headerRight: () => (
        <ScreenHeaderBtn
          iconUrl={profile}
          handlePress={navigation}
          dimension="100%"
        />
      ),
    });
    navigation.navigate("Accueil");
  };

  const googleAuth = async () => {
    const app = initializeApp(enviroment.firebaseConfig),
      auth = getAuth(app),
      provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.user.accessToken;
        try {
          const user = result.user.reloadUserInfo;
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", JSON.stringify(user));
          navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={user.photoUrl}
                handlePress={navigation}
                dimension="100%"
              />
            ),
          });
          navigation.navigate("Accueil");
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      })
      .catch((error) => {});
  };

  return (
    <Background>
      <Header
        style={{
          fontSize: 38,
          fontWeight: "bold",
          alignSelf: "start",
        }}
      >
        Bienvenue!
      </Header>
      <Text style={{ alignSelf: "start" }}>Renseignez vos identifiant</Text>
      <Input
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        errorMessage={email.error}
        errorProps={!!email.error}
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        containerStyle={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "row" + (email.error === "" ? "" : " wrap"),
          alignItems: "center",
          justifyContent: "flex-start",
          paddingVertical: 0.25,
          borderRadius: 5,
          marginTop: 40,
          marginBottom: 20,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#2199B4",
        }}
        leftIconContainerStyle={{
          backgroundColor: "#D9D9D9",
          borderRadius: 50,
          height: 30,
          width: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 0,
          marginRight: 0.75,
        }}
        inputContainerStyle={{ border: "none" }}
        leftIcon={{
          type: "font-awesome",
          name: "envelope",
          color: "#F5F5F5",
          size: 16,
        }}
        placeholder="  Adresse email"
      ></Input>
      <Input
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        errorMessage={password.error}
        errorProps={!!password.error}
        secureTextEntry
        containerStyle={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "row" + (email.error === "" ? "" : " wrap"),
          alignItems: "center",
          justifyContent: "flex-start",
          paddingVertical: 0.25,
          borderRadius: 5,
          marginBottom: 20,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#2199B4",
        }}
        leftIconContainerStyle={{
          backgroundColor: "#D9D9D9",
          borderRadius: 50,
          height: 30,
          width: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 0,
          marginRight: 0.75,
        }}
        leftIcon={{
          type: "font-awesome",
          name: "lock",
          color: "#F5F5F5",
          size: 16,
        }}
        inputContainerStyle={{ border: "none" }}
        placeholder="  Mot de passe"
      ></Input>
      <Input
        value={cPassword.value}
        onChangeText={(text) => setCPassword({ value: text, error: "" })}
        errorMessage={cPassword.error}
        errorProps={!!cPassword.error}
        secureTextEntry
        inputContainerStyle={{ border: "none" }}
        containerStyle={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "row" + (cPassword.error === "" ? "" : " wrap"),
          alignItems: "center",
          justifyContent: "flex-start",
          paddingVertical: 0.25,
          borderRadius: 5,
          marginBottom: 20,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#2199B4",
        }}
        leftIconContainerStyle={{
          backgroundColor: "#D9D9D9",
          borderRadius: 50,
          height: 30,
          width: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 0,
          marginRight: 0.75,
        }}
        leftIcon={{
          type: "font-awesome",
          name: "lock",
          color: "#F5F5F5",
          size: 16,
        }}
        placeholder="  Confirmation du mot de passe"
      ></Input>
      <View style={styles.row}>
        <Text>— &nbsp; Ou continuez avec &nbsp; — </Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={googleAuth}>
          <Image
            style={{ height: 114, width: 124, marginRight: -20 }}
            source={require("../../../assets/google.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{ height: 114, width: 124 }}
            source={require("../../../assets/fb.png")}
          />
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
