import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { useNavigation } from "expo-router";
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

function editProfile(nav) {
  // navigation.navigate("Profile");
}

export default ScreenHeaderBtn;
