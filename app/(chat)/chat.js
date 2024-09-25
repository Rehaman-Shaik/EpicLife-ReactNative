import { View, Text, Button, ScrollView } from "react-native";
import { Link } from "expo-router";
import { ChatCard } from "../../components/chat/ChatCard";

export default function Chat() {
  return (
    <View style={{ padding: 12, marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Chat Screen</Text>
      <Text style={{ marginVertical: 10 }}>
        Welcome to the Chat screen! From here, you can view your friends list or add new friends.
      </Text>
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
    </View>
  );
}
