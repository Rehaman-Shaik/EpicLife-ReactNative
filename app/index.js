import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Image, Text, Button } from 'react-native';
import { LinkTouchableOpacity } from '@/components/Button';
import { useRouter } from 'expo-router';

// Main Component
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCredentialsCorrect, setIsCredentialsCorrect] = useState(true);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch('https://rehamanshaikofficial.xyz/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        if (result['shouldLogin'] == true) {
          router.replace('/home');
        } else {
          console.log('Login failed', result);
          setIsCredentialsCorrect(false)
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else{
      setIsInputEmpty(true)
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <ImageSection />
      {isCredentialsCorrect ? <Text>  </Text> : <Text>Credentials are not correct try again</Text>}
      {isInputEmpty && <Text> Please enter your Credentials </Text>}
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
    <TextInput
      style={styles.input}
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="Enter your password"
      secureTextEntry={true}
      value={password}
      onChangeText={setPassword}
    />
  </View>
);

const ButtonSection = ({ onLogin }) => (
  <View style={styles.buttonContainer}>
    <Button title='Login' onPress={onLogin} />
  </View>
);

const SignUpPrompt = () => (
  <View style={styles.signUpContainer}>
    <Text style={styles.signUpText}>
      Don't have an account?
    </Text>
    {LinkTouchableOpacity('/signup', 'Signup', 'blue')}
  </View>
);

// Styles
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
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
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  signUpContainer: {
    borderColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  signUpText: {
    marginRight: 5,
  },
});
