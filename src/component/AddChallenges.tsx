import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const predefinedTags = [
  {label: 'Feature', value: 'feature'},
  {label: 'Tech', value: 'tech'},
  {label: 'Design', value: 'design'},
  {label: 'Innovation', value: 'innovation'},
];

const AddChallengeScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState(predefinedTags[0].value);

  const handleAddChallenge = async () => {
    try {
      // Add the new challenge directly
      const newChallenge = { title, description };

      // Save the new challenge to AsyncStorage
      await AsyncStorage.setItem('challenges', JSON.stringify([newChallenge]));

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
      <Text style={styles.label}>Select Tag:</Text>

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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default AddChallengeScreen;
