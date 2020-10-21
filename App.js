import React from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home';
import IMC from './src/IMC';
import Calc from './src/Calc';
import Login from './src/Login';
import Previsao from './src/Previsao';
import Temperatura from './src/Temperatura';
import Todolist from './src/ToDo';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return(
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ 
          headerStyle: { backgroundColor: '#f50' },
          headerTintColor: 'white',
          headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20}
        }}>
          
          <Stack.Screen name="Login" component={Login} options={{
            title: 'Autenticação do usuário', 
          }}/>
          <Stack.Screen name="Home" component={Home} options={{title: 'Início', headerLeft: null}}/>
          <Stack.Screen name="Calc" component={Calc}/>
          <Stack.Screen name="IMC" component={IMC}/>
          <Stack.Screen name="Previsao" component={Previsao}/>
          <Stack.Screen name="Temperatura" component={Temperatura}/>
          <Stack.Screen name="Tarefas" component={Todolist}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}