import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

const initialMediaList = [
    { id: 1, name: "Red Dead Redemption 2", isPlayed: false, mediaType: "game" },
    { id: 2, name: "Game of Thrones", isPlayed: true, mediaType: "series" },
    { id: 3, name: "Interstellar", isPlayed: false, mediaType: "movie" },
    // Add more media here
];

function MediaList() {
    const [mediaName, setMediaName] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [mediaList, setMediaList] = useState(initialMediaList);

    const toggleMediaStatus = (id) => {
        setMediaList(prevList =>
            prevList.map(media =>
                media.id === id ? { ...media, isPlayed: !media.isPlayed } : media
            )
        );
    };

    const addMedia = () => {
        if (mediaName.trim() === "" || mediaType.trim() === "") return;
        const newMedia = {
            id: mediaList.length + 1,
            name: mediaName,
            isPlayed: false,
            mediaType: mediaType.toLowerCase(),
        };
        setMediaList(prevList => [...prevList, newMedia]);
        setMediaName("");
        setMediaType("");
    };

    const renderMedia = (medias, playedStatus) => {
        return medias.filter(media => media.isPlayed === playedStatus).map(media => (
            <TouchableOpacity key={media.id} onPress={() => toggleMediaStatus(media.id)}>
                <MediaCard id={media.id} name={media.name} mediaType={media.mediaType} />
            </TouchableOpacity>
        ));
    };

    function MediaCard({ id, name, mediaType }) {
        return (
            <View style={styles.card}>
                <Text style={styles.mediaId}>{id}</Text>
                <Text style={styles.mediaName}>{name}</Text>
                <Text style={styles.mediaType}>{mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Media to Watch/Play</Text>
                <ScrollView>
                    {renderMedia(mediaList, false)}
                </ScrollView>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Watched/Played Media</Text>
                <ScrollView>
                    {renderMedia(mediaList, true)}
                </ScrollView>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add media name'
                    value={mediaName}
                    onChangeText={setMediaName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter media type (game/series/movie)'
                    value={mediaType}
                    onChangeText={setMediaType}
                />
                <Button title="Add" onPress={addMedia} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        marginTop:15
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    mediaId: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mediaName: {
        fontSize: 14,
        color: '#555',
    },
    mediaType: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        marginRight: 10,
    },
});

export default MediaList;
