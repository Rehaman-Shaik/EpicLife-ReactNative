import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Chat() {
  return (
    <View style={{ padding: 20, marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Chat Screen</Text>
      <Text style={{ marginVertical: 10 }}>
        Welcome to the Chat screen! From here, you can view your friends list or add new friends.
      </Text>
    </View>
  );
}
