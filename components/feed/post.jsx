import { View, Text, Image, StyleSheet } from "react-native";
import image from "../../assets/images/loading-image-square.png";

function Post() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Rehaman</Text>
                <Text style={styles.headerText}>19/07/2024</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    imageContainer: {
        height: 300,
        width: "100%",
    },
    image: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",
    },
    textContainer: {
        padding: 10,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
    },
});

export default Post;
