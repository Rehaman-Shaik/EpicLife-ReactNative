// app/(tabs)/home.js
import { LinkButton, LinkButtonWithReplace } from '@/components/Button';
import { View, Text } from 'react-native';

export default function profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {LinkButtonWithReplace("/", "LogOut")}

    </View>
  );
}
