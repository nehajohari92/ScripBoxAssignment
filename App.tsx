import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/component/LoginScreen';
import HomeScreen from './src/component/HomeScreen';
import AddChallengeScreen from './src/component/AddChallenges';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name ="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="AddChallenge" component={AddChallengeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
