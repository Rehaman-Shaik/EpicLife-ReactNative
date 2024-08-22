import Ionicons from 'react-native-vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function HomeTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="chat" options={{ title: "Chat", tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbubble-ellipses-sharp" color={color} size={size} />
        ) }} />
      <Tabs.Screen name="friendsList" options={{ title: "Friends List", tabBarIcon: ({ color, size }) => (
          <Ionicons name="people-sharp" color={color} size={size} />
        ) }} />
      <Tabs.Screen name="addFriends" options={{ title: "Add Friends", tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-add-sharp" color={color} size={size} />
        ) }} />
    </Tabs>
  );
}
