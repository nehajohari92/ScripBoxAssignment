import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const predefinedTags = ['Feature', 'Tech', 'Design', 'Other'];

const AddChallengeScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState('Other');

  const handleTagPress = (tag) => {
    // Handle tag press logic
    console.log('Selected tag:', tag);
     setSelectedTag(tag)
  };

  const handleAddChallenge = async () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert(
        'Required Field',
        'Please provide all fields before adding a new challenge.',
        [
          {
            text: 'OK',
            //onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );

      return;
    }

    try {
      const newChallengeId = uuidv4();
      // Fetch existing challenges from AsyncStorage
      const existingChallengesString = await AsyncStorage.getItem('challenges');
      const existingChallenges = existingChallengesString
        ? JSON.parse(existingChallengesString)
        : [];

      // Add the new challenge to the existing ones
      const newChallenge = {
        id: newChallengeId,
        title,
        description,
        votes: 0,
        date: new Date().toISOString(),
        selectedTag,
      };

      existingChallenges.push(newChallenge);

      // Save the updated challenges back to AsyncStorage
      await AsyncStorage.setItem(
        'challenges',
        JSON.stringify(existingChallenges),
      );

      // Clear input fields
      setTitle('');
      setDescription('');

      console.log('Challenge added:', newChallenge);
    } catch (error) {
      console.error('Error adding challenge:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Challenge</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline
      />
       <Text>Select Tag:</Text>
      <View style={styles.tagContainer}>
        {predefinedTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={styles.tagButton}
            onPress={() => handleTagPress(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    color: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    color: '#000000',
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
  },
  dropdownContainer: {
    height: 40,
    width: 200, // Adjust the width as needed
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom : 100,
  }, 
  tagButton: {
    backgroundColor: '#3498db',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddChallengeScreen;
