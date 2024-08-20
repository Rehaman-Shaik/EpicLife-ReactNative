import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Post from '@/components/feed/post';


export default function Page() {
    return (
        <SafeAreaView style={styles.topContainer}>
            <View style={{height:50, width:"100%", borderColor:'blacke', borderWidth:1, borderRadius:10, marginTop:15}}>
            </View>
            {/* {LinkButton("/Test", "Test")} */}
            <ScrollView style={{ flexDirection: 'column', marginLeft: 2, marginTop: 3, marginRight: 2}}>
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
        marginTop:5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
})