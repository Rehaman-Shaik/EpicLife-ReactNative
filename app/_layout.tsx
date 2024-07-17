import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="todo" />
      <Stack.Screen name="dairy" />
      <Stack.Screen name="finance" />
      <Stack.Screen name="movies" />
      <Stack.Screen name="games" />
      <Stack.Screen name="series" />
      <Stack.Screen name="Test" />
    </Stack>
  );
}
