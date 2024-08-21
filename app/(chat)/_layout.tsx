import { Tabs } from "expo-router";

export default function HomeTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="friendsList" options={{ title: "friendsList" }} />
      <Tabs.Screen name="addFriends" options={{ title: "addFriends" }} />
    </Tabs>
  );
}
