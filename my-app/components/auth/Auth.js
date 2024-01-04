import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-native-paper";
import { theme } from "../../core/theme";
import Accueil from "../Accueil";
import Profile from "../drawer";
import editProfile from "../drawer/edit-profile";
import Welcome from "../home/welcome/Welcome";
import {
  Dashboard,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  StartScreen,
} from "./screens";
const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: false,
          headerTitle: "",
        }}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={editProfile}></Stack.Screen>
      </Stack.Navigator>
    </Provider>
  );
}
