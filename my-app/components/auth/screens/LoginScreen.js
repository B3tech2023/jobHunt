import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { Text } from "react-native-paper";
import { ScreenHeaderBtn } from "../../../components";
import { icons, images } from "../../../constants";
import { theme } from "../../../core/theme";
import enviroment from "../../../environment/enviroment";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const app = initializeApp(enviroment.firebaseConfig),
      auth = getAuth(app);
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (result) => {
        console.log(result);
        navigation.setOptions({
          headerShown: true,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              handlePress={navigation}
              dimension="100%"
            />
          ),
        });
        navigation.navigate("Accueil");
      })
      .catch((e) => console.warn(e));
  };

  const googleAuth = async () => {
    const app = initializeApp(enviroment.firebaseConfig),
      auth = getAuth(app),
      provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
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
      .catch((error) => {
      });
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
        inputContainerStyle={{ border: "none" }}
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        <Text style={{ color: "white" }}>Connexion</Text>
      </Button>
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
        onPress={() => {
          navigation.replace("RegisterScreen");
        }}
        mode="contained"
      >
        <Text style={{ color: "white" }}>Inscription</Text>
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    backgroundColor: "#000",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
