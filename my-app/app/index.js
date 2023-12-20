import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import Auth from "../components/auth/Auth";
import { COLORS, SIZES, icons, images } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

let redirect = false;

const Home = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  AsyncStorage.getItem("token").then(async (val) => {
    await AsyncStorage.clear();
    console.log(val);
    if (val && !redirect) {
      redirect = true;
      navigation.setOptions({
        headerShown: true,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
        ),
        headerTitle: "",
      });
      navigation.navigate("Accueil");
    }
  });
  return (
    <Auth
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default Home;
