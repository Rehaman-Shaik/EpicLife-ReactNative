import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Image, Text, Button } from 'react-native';
import { LinkTouchableOpacity } from '@/components/Button';
import { useRouter } from 'expo-router';

// Main Component
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your credentials.');
      return;
    }

    try {
      const response = await fetch('https://rehamanshaikofficial.xyz/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result['shouldLogin'] === true) {
        router.replace('/home');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageSection />
      {error && <ErrorMessage message={error} />}
      <InputSection email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
      <ButtonSection onLogin={handleLogin} />
      <SignUpPrompt />
    </SafeAreaView>
  );
}

// Components
const ImageSection = () => (
  <View style={styles.imageContainer}>
    <Image
      style={styles.image}
      source={require('../assets/images/loading-image-square.png')}
    />
  </View>
);

const InputSection = ({ email, setEmail, password, setPassword }) => (
  <View style={styles.inputContainer}>
    <CustomTextInput
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
    />
    <CustomTextInput
      placeholder="Enter your password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
  </View>
);

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

const ButtonSection = ({ onLogin }) => (
  <View style={styles.buttonContainer}>
    <Button title="Login" onPress={onLogin} />
  </View>
);

const SignUpPrompt = () => (
  <View style={styles.signUpContainer}>
    <Text style={styles.signUpText}>Don't have an account?</Text>
    {LinkTouchableOpacity('/signup', 'Signup', 'blue')}
  </View>
);

const ErrorMessage = ({ message }) => (
  <Text style={styles.errorText}>{message}</Text>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginTop: 70,
    marginBottom: 20,
  },
  image: {
    height: 310,
    width: 450,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    marginRight: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
