import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, View, StyleSheet, Button } from 'react-native';
import Post from '@/components/feed/post';

// Main Page Component
export default function Page() {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.buttonContainer}>
        <Button title="Chat" onPress={() => navigateTo('/chat')} />
        <Button title="Notifications" onPress={() => navigateTo('/Notifications')} />
      </View>
      <ScrollView style={styles.scrollView}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Post key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginTop:10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  scrollView: {
    marginHorizontal: 2,
  },
});
