import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function profile() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    router.replace('/');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='logout' onPress={handleLogout} />

    </View>
  );
}
