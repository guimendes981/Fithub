import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import RandomCard from "../components/RandomCard";
import CardSets from "../components/CardSets";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#3DEC63',
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginForm}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black"/>
          ),
        }}
      />
      <Tab.Screen
        name="RandomCard"
        component={RandomCard}
        options={{
          tabBarLabel: "Random Card",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="question" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="CardSets"
        component={CardSets}
        options={{
          tabBarLabel: "Card Sets",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}