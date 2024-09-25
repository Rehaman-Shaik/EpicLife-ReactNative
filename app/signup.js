import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Image, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { LinkTouchableOpacity } from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reusable Input Component
function InputField({ placeholder, value, onChangeText, secureTextEntry = false }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

// Error Message Component
function ErrorMessage({ message }) {
  return message ? <Text style={styles.errorText}>{message}</Text> : null;
}

// Main SignUp Component
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async () => {
    setError('');
    if (!email || !password || !againPassword) {
      setError('Please enter your credentials.');
      return;
    }

    if (password !== againPassword) {
      setError('Passwords do not match.');
      setPassword('');
      setAgainPassword('');
      return;
    }
    setIsLoading(true)

    try {
      const response = await fetch('https://rehamanshaikofficial.xyz/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.shouldSignup === 'alreadypresent') {
        setError('Email already exists. Please login or use another email.');
      } else if (result.insertedId) {
        await AsyncStorage.setItem('authToken', result.insertedId);
        router.replace('/home');
      } else {
        setError('Signup failed. Please try again.');
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setError('Error signing up. Please try again later.');
      setIsLoading(false)
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/loading-image-square.png')}
        />
      </View>

      <ErrorMessage message={error} />

      <View style={styles.inputContainer}>
        <InputField placeholder="Enter your email" value={email} onChangeText={setEmail} />
        <InputField placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />
        <InputField placeholder="Confirm your password" value={againPassword} onChangeText={setAgainPassword} secureTextEntry />
      </View>

      <View style={styles.buttonContainer}>
        {isLoading ? <Text>Loading...</Text> : <Button title="Signup" onPress={handleSignup} />}
      </View>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>
          Already have an account?
        </Text>
        {LinkTouchableOpacity('/', 'Login', 'blue')}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginTop: 70,
    marginBottom: 10,
  },
  image: {
    height: 310,
    width: 450,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    padding: 7,
    fontSize: 16,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    marginRight: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
