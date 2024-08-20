import { Tabs } from 'expo-router';

export default function HomeTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="todo" options={{ title: "To-Do" }} />
      <Tabs.Screen name="diary" options={{ title: "Diary" }} />
      <Tabs.Screen name="finance" options={{ title: "Finance" }} />
      <Tabs.Screen name="watchList" options={{ title: "WatchList" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}