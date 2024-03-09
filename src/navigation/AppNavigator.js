import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import RandomCard from "../components/RandomCard";
import CardSets from "../components/CardSets";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Home" component={Home} />
     
    </Stack.Navigator>
  );
}
