import React from 'react';
import { StyleSheet ,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/component/LoginScreen';
import HomeScreen from './src/component/HomeScreen';
import AddChallengeScreen from './src/component/AddChallenges';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name ="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="AddChallenge" component={AddChallengeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set the default background color
  },
});
export default App;
