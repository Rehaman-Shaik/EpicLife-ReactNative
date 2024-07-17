import { Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function Page() {
    return (
        <View>
            <Link href="/home">
                <Text>
                    Home
                </Text>
            </Link>
        </View>
    );
}
