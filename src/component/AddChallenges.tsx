import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

const predefinedTags = [
  {label: 'Feature', value: 'feature'},
  {label: 'Tech', value: 'tech'},
  {label: 'Design', value: 'design'},
  {label: 'Innovation', value: 'innovation'},
];

const AddChallengeScreen = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState([]);

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
            { cancelable: false }
          );
    
        return;
      }

    try {
       // Fetch existing challenges from AsyncStorage
       const existingChallengesString = await AsyncStorage.getItem('challenges');
       const existingChallenges = existingChallengesString ? JSON.parse(existingChallengesString) : [];
 
       // Add the new challenge to the existing ones
       const newChallenge = { title, description };
       existingChallenges.push(newChallenge);
 
       // Save the updated challenges back to AsyncStorage
       await AsyncStorage.setItem('challenges', JSON.stringify(existingChallenges));
 
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
      <DropDownPicker
        items={predefinedTags}
        defaultValue={null}
        containerStyle={styles.dropdownContainer}
        style={{ backgroundColor: '#fafafa', zIndex: 1000 }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(tags) => setSelectedTag(tags)}
      />
      {/* Display selected tags */}
      <View>
        {selectedTag.map((tag) => (
          <View key={tag.value} style={styles.tag}>
            <Text>{tag.label}</Text>
          </View>
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
  dropdownContainer: {
    height: 40,
    width: 200,  // Adjust the width as needed
  },
});

export default AddChallengeScreen;
