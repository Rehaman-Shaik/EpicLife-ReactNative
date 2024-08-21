import { Tabs } from "expo-router";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function HomeTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{
        title: "Home", tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="todo" options={{
        title: "To-Do", tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="tasks" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="diary" options={{
        title: "Diary", tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book-edit" color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="finance" options={{
        title: "Finance", tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="finance" color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="watchList" options={{
        title: "WatchList", tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="list-status" color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile", tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" color={color} size={size} />
        )
      }} />
    </Tabs>
  );
}
