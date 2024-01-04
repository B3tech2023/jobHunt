import { Stack, useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, View } from "react-native";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { COLORS, SIZES, icons, images } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bg from "../assets/bg.png";

const Accueil = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const [check, setCheck] = React.useState(null);

  React.useEffect(() => {
    async function checkData() {
      setCheck(JSON.parse(await AsyncStorage.getItem("user")));
    }
    checkData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={check?.photoUrl} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={check?.photoUrl}
              handlePress={navigation}
              dimension="100%"
            />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={bg}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
          >
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  const router = useRouter()
                  router.push(`/search/${searchTerm}`);
                }
              }}
            />

            <Popularjobs />
            <Nearbyjobs />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accueil;
