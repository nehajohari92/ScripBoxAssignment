import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  // set heading of screen
  navigation.setOptions({
    headerTitle: 'Dashboard',
  });

  const handleAddChallenge = () => {
    navigation.navigate('AddChallenge');
  };

  const [challenges, setChallenges] = useState([]);

  // Fetch challenges from local storage
  const fetchChallenges = async () => {
    try {
      const challengesString = await AsyncStorage.getItem('challenges');
      if (challengesString) {
        const storedChallenges = JSON.parse(challengesString);
        console.log(challengesString);
        setChallenges(storedChallenges);
        console.log(storedChallenges);
        
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {  
      fetchChallenges();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Challenges</Text> 
  
    {challenges.length === 0 ? (
      <Text>No challenges available.</Text>
    ) : (
      <FlatList
        data={challenges}
        keyExtractor={(item, index) => `${index}`} // Use index as key for simplicity
        renderItem={({ item }) => (
          <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    )}
    <Button title="Add Challenge" onPress={handleAddChallenge} />

  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  challengeItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#f0f0f0',
    width: '100%',
    maxWidth: '100%'
  },
  challengeTitle: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
