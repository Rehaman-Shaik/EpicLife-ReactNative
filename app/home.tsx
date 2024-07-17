import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { LinkButton, LinkButtonWithReplace } from '@/components/Button';


export default function Page() {
    return (
        <SafeAreaView style={styles.topContainer}>
            <Text>Welcome </Text>
            <View style={styles.buttonContainer}>
                {LinkButton("/todo", "TO-DO")}
                {LinkButton("/dairy", "Dairy")}
                {LinkButton("/finance", "Finance")}
                {LinkButton("/games", "Games")}
            </View>
            <View style={styles.buttonContainer}>
                {LinkButton("/movies", "Movies")}
                {LinkButton("/series", "Series")}
                {LinkButton("/chat", "Chat")}
                {LinkButtonWithReplace("/", "LogOut")}
            </View>
                {/* {LinkButton("/Test", "Test")} */}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
})