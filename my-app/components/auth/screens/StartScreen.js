import React from "react";
import { Image } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Image source={require("../../../assets/accueil.png")} />
      <Header
        style={{
          fontSize: 36,
          fontWeight: "bold",
          textAlign: 'center'
        }}
      >
        Trouvez l'emploi idéal
      </Header>
      <Paragraph>
        Trouver votre emploi de rêve n'a jamais été aussi simple et rapide
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Commencer
      </Button>
    </Background>
  );
}
