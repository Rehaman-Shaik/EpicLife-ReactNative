import { SafeAreaView, TextInput, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { LinkButtonWithReplace, LinkTouchableOpacity } from '@/components/Button';

export default function SignUp() {
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
        <TextInput style={styles.input} placeholder="Enter your password again" secureTextEntry={true} />
      </View>
      <View style={styles.buttonContainer}>
        {/* {LinkButtonWithReplace("/home", "Sign Up")} */}
        {LinkButtonWithReplace("/home", "Signup")}
      </View>
      <View style={{ borderColor: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 5 }}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  },
});
