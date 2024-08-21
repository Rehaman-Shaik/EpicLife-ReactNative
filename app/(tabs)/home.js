import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, View, StyleSheet, Button, Text } from 'react-native';
import Post from '@/components/feed/post';

// Main Page Component
export default function Page() {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>EpicLife</Text>
        <View style={styles.buttonContainer}>
          <Button title="Chat" onPress={() => navigateTo('/chat')} />
          <Text> </Text>
          <Button title="N" onPress={() => navigateTo('/Notifications')} />
        </View>
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
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft:5
  },
  scrollView: {
    marginHorizontal: 2,
  },
});
