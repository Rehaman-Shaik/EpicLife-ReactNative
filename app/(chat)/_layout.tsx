import { Tabs } from "expo-router";

export default function HomeTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="friendsList" options={{ title: "Friends List" }} />
      <Tabs.Screen name="addFriends" options={{ title: "Add Friends" }} />
    </Tabs>
  );
}
