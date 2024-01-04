import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScreenHeaderBtn } from "../components";
import Auth from "../components/auth/Auth";
import { icons, images } from "../constants";
import React from "react";

let redirect = false;

const Home = () => {
  const navigation = useNavigation();
  const [check, setCheck] = React.useState(null);
  React.useEffect(() => {
    async function checkData() {
      const data = JSON.parse(await AsyncStorage.getItem("user"))
      setCheck(data);
      navigation.setOptions({
        headerRight: () => (
          <ScreenHeaderBtn
            iconUrl={data.photoUrl}
            handlePress={() => {
              navigation.setOptions({
                headerLeft: () => (
                  <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension="60%"
                    handlePress={() => {
                      navigation.setOptions({ headerLeft: null });
                      navigation.navigate("Accueil");
                    }}
                  />
                ),
              });
              navigation.navigate("Profile");
            }}
            dimension="100%"
          />
        ),
      });
    }
    checkData();
  }, []);

  AsyncStorage.getItem("token").then(async (val) => {
    // await AsyncStorage.clear();
    if (val && !redirect) {
      redirect = true;
      navigation.setOptions({
        headerShown: true,
        // headerLeft: () => (
        //   <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
        // ),
        headerRight: () => (
          <ScreenHeaderBtn
            iconUrl={check ? check?.photoUrl : images.profile}
            handlePress={() => {
              navigation.setOptions({
                headerLeft: () => (
                  <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension="60%"
                    handlePress={() => {
                      navigation.setOptions({ headerLeft: null });
                      navigation.navigate("Accueil");
                    }}
                  />
                ),
              });
              navigation.navigate("Profile");
            }}
            dimension="100%"
          />
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
