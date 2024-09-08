import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Load the username from AsyncStorage or an API if available
    const loadUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username'); // Assuming 'username' is stored
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    loadUsername();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {username ? (
        <Text style={styles.username}>Welcome, {username}!</Text>
      ) : (
        <Text style={styles.username}>Welcome, User!</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    marginBottom: 40,
  },
});
