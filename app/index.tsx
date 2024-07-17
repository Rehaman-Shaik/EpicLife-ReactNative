import { SafeAreaView, TextInput, View, StyleSheet, Image } from 'react-native';
import { LinkButtonWithReplace } from '@/components/Button';

export default function Login_SignUp() {
  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/loading-image-square.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Enter your email" />
        <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
      </View>
      <View style={styles.buttonContainer}>
        {LinkButtonWithReplace("/home", "Sign Up")}
        {LinkButtonWithReplace("/home", "Login")}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  input: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
