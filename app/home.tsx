import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinkButton, LinkButtonWithReplace } from '@/components/Button';
import Post from '@/components/feed/post';


export default function Page() {
    return (
        <SafeAreaView style={styles.topContainer}>
            <View style={styles.buttonContainer}>
                {LinkButton("/todo", "TO-DO")}
                {LinkButton("/diary", "Diary")}
                {LinkButton("/finance", "Finance")}
                {LinkButton("/watchList", "Watch/Play List")}
            </View>
            <View style={styles.buttonContainer}>
                {LinkButton("/chat", "Chat")}
                {LinkButtonWithReplace("/", "LogOut")}
            </View>
            {/* {LinkButton("/Test", "Test")} */}
            <ScrollView style={{ flexDirection: 'column', marginLeft: 25, marginTop: 10, marginRight: 25 }}>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </ScrollView>
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