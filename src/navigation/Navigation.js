import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import LoginForm from '../components/LoginForm';
import CadastroForm from '../components/CadastroForm';
import MinhaDieta from '../components/MinhaDieta';


const Stack = createStackNavigator();

export default function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginForm" component={LoginForm} options={
          // { title: 'Login' }
          { headerShown: false }
        }/>
        <Stack.Screen name="Home" component={Home} options={
          // { title: 'Bem-vindo ao FitManager' }
          { headerShown: false }
          
        }/>
        <Stack.Screen name="CadastroForm" component={CadastroForm} options={
          { headerShown: false }
        }/>
        {/* <Stack.Screen name ="MinhaDieta" component={MinhaDieta} options={
          // { title: 'Minha Dieta' }
          { headerShown: false }
  
        }/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );

}