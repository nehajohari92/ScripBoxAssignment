import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet,Button,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

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
  const [sortBy, setSortBy] = useState('votes'); // Default sorting by votes


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

  const upvoteChallenge = async (challengeId: string) => {
    // Find the challenge by ID and update the upvote count
    setChallenges((prevChallenges) =>
    prevChallenges.map((challenge) =>
      challenge.id === challengeId
        ? { ...challenge, votes: (challenge.votes || 0) + 1 } // Increment votes or start from 1 if undefined
        : challenge
    )
  );
   // Save the updated challenges to local storage
    saveChallenges();
  };

  const saveChallenges = async () => {
    try {
      // Save challenges to local storage
      await AsyncStorage.setItem('challenges', JSON.stringify(challenges));
    } catch (error) {
      console.error('Error saving challenges:', error);
    }
  };

  const renderItem = ({ item }) => {
    const parsedDate = parseISO(item.date);
    const formattedDate = format(parsedDate, 'ddMMyy');

    return (
      <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Total Votes- {item.votes}</Text>
            <Text>Date- {item.date}</Text>
            <TouchableOpacity onPress={() => upvoteChallenge(item.id)} style={styles.upvoteButton}>
             <Text>👍 Upvote ({item.votes || 0})</Text>
            </TouchableOpacity>
          </View>
    );
  };
  const handleSort = (criteria : string) => {
    // Update the sorting criteria and re-render the component
    setSortBy(criteria);
    sortChallenges(criteria);
  };

  const sortChallenges = (criteria : string) => {
    // Sort challenges based on the selected criteria
    setChallenges((prevChallenges) =>
      [...prevChallenges].sort((a, b) => {
        if (criteria === 'votes') {
          return (b.votes || 0) - (a.votes || 0);
        } else if (criteria === 'date') {
          return parseISO(b.date) - parseISO(a.date);
        }
        return 0;
      })
    );
  };

  return (
    
    <View style={styles.container}>
    <Text style={styles.title}>Challenges</Text> 
    <View style={styles.sortButtons}>
        <Button title="Sort by Votes" onPress={() => handleSort('votes')} />
        <Button title="Sort by Date" onPress={() => handleSort('date')} />
      </View>
    {challenges.length === 0 ? (
      <Text>No challenges available.</Text>
    ) : (
      <FlatList
        data={challenges}
        keyExtractor={(item, index) => `${index}`} // Use index as key for simplicity
        renderItem={renderItem}
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
  upvoteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  sortButtons: {
    flexDirection: 'row',
    borderRadius: 4,
    margin: 8
    
  },

});

export default HomeScreen;
