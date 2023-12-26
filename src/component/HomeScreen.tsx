import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleAddChallenge = () => {
    navigation.navigate('AddChallenge');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Challenges</Text>
      {/* Your Challenge List Component Goes Here */}
      <Button title="Add Challenge" onPress={handleAddChallenge} />
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
});

export default HomeScreen;
