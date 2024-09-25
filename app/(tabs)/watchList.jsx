import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addWatchItem = async (newEntry) => {
  console.log(JSON.stringify(newEntry));
  const userToken = await AsyncStorage.getItem('authToken');
  try {
    const response = await fetch(`https://rehamanshaikofficial.xyz/watch-list/${userToken}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
    });
    if (response.ok) {
      console.log("Item added successfully");
    } else {
      console.error("Failed to add item:", response.status);
    }
  } catch (error) {
    console.error("Error adding to-do item:", error.message);
  }
};

async function getData(setMediaList) {
  const userToken = await AsyncStorage.getItem('authToken');
  const url = `https://rehamanshaikofficial.xyz/watch-list/${userToken}/all`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    setMediaList(data);
  } catch (error) {
    console.error("Error fetching to-do items:", error.message);
  }
}

const mediaTypeOptions = [
  { label: 'Game', value: 'game' },
  { label: 'Series', value: 'series' },
  { label: 'Movie', value: 'movie' },
  { label: 'Book', value: 'book' },
];

function MediaList() {
  const [mediaName, setMediaName] = useState("");
  const [mediaType, setMediaType] = useState(null);
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    getData(setMediaList);
  }, []);

  const toggleMediaStatus = (id) => {
    setMediaList(prevList =>
      prevList.map(media =>
        media.id === id ? { ...media, isPlayed: !media.isPlayed } : media
      )
    );
  };

  const addMedia = async () => {
    if (mediaName.trim() === "" || !mediaType) return;
    const newMedia = {
      id: mediaList.length + 1,
      name: mediaName,
      isPlayed: false,
      mediaType,
    };
    setMediaList(prevList => [...prevList, newMedia]);
    setMediaName("");
    setMediaType(null);
    await addWatchItem(newMedia);
    await getData(setMediaList);
  };

  const renderMedia = (medias, playedStatus) => {
    return medias.filter(media => media.isPlayed === playedStatus).map(media => (
      <TouchableOpacity key={media.id} onPress={() => toggleMediaStatus(media.id)}>
        <MediaCard id={media.id} name={media.name} mediaType={media.mediaType} />
      </TouchableOpacity>
    ));
  };

  function MediaCard({ id, name, mediaType }) {
    return (
      <View style={styles.card}>
        <Text style={styles.mediaId}>{id}</Text>
        <Text style={styles.mediaName}>{name}</Text>
        <Text style={styles.mediaType}>{mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Media to Watch/Play</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderMedia(mediaList, false)}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Watched/Played Media</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderMedia(mediaList, true)}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add media name'
          value={mediaName}
          onChangeText={setMediaName}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={mediaTypeOptions}
          labelField="label"
          valueField="value"
          placeholder="Select media type"
          value={mediaType}
          onChange={item => setMediaType(item.value)}
        />
        <Button title="Add" onPress={addMedia} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 15,
  },
  section: {
    flex: 1, // Ensure each section takes up available space
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20, // Add padding to prevent content from being cut off
  },
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  mediaId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mediaName: {
    fontSize: 14,
    color: '#555',
  },
  mediaType: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginRight: 10,
    height: 40,
  },
  dropdown: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default MediaList;
