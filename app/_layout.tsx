import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="todo" />
      <Stack.Screen name="diary" />
      <Stack.Screen name="finance" />
      <Stack.Screen name="watchList" />
      <Stack.Screen name="Test" />
    </Stack>
  );
}
