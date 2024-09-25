import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

function ChatCard() {
    const handleViewPress = () => {
        // Handle the view button press (navigate or open a chat, etc.)
        console.log('View button pressed');
    };

    return (
        <ScrollView style={styles.cardContainer}>
            <View style={styles.card}>
                {/* Profile Picture Section */}
                <View style={styles.profilePicContainer}>
                    <Image
                        source={{ uri: 'https://example.com/profile-pic.jpg' }} // Replace with actual image URL
                        style={styles.profilePic}
                    />
                </View>

                {/* User Info and Message Section */}
                <View style={styles.messageContainer}>
                    <Text style={styles.userName}>User Name</Text>
                    <Text style={styles.message}>This is a user message...</Text>
                </View>

                {/* View Button Section */}
                <TouchableOpacity style={styles.viewButtonContainer} onPress={handleViewPress}>
                    <Text style={styles.viewButton}>View</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 2,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    profilePicContainer: {
        marginRight: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    messageContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    message: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    viewButtonContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    viewButton: {
        color: '#007bff',
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 8,
        textAlign: 'center',
    },
});

export { ChatCard };
