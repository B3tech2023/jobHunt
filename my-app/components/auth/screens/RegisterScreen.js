import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { Text } from "react-native-paper";
import { theme } from "../../../core/theme";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import { emailValidator } from "../helpers/emailValidator";
import { nameValidator } from "../helpers/nameValidator";
import { passwordValidator } from "../helpers/passwordValidator";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
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
          name: "envelope",
          color: "#F5F5F5",
          size: 16,
        }}
        placeholder="Adresse email"
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
        placeholder="Mot de passe"
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
          marginBottom: 20
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
        placeholder="Confirmation du mot de passe"
      ></Input>
      <View style={styles.row}>
        <Text>— &nbsp; Ou continuez avec &nbsp; — </Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity>
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
