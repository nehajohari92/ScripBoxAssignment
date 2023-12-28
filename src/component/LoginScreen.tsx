import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({navigation}) => {
  const [employeeId, setEmployeeId] = useState('');

  const handleLogin = () => {

    if(employeeId.trim() ===''){
      Alert.alert(
        'Required Field',
        'Please provide valid Employee Id for login',
        [
          {
            text: 'OK',
            //onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );

    return;
    }
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hack Ideas</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee ID"
        value={employeeId}
        onChangeText={(text) => setEmployeeId(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '100%',
  },
});

export default LoginScreen;
