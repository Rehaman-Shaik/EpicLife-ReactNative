import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

const initialMediaList = [
    { id: 1, name: "Red Dead Redemption 2", isWatched: false, media_type: "games" },
    { id: 2, name: "Game of Thrones", isWatched: true, media_type: "series" },
    { id: 3, name: "Interstellar", isWatched: false, media_type: "movies" },
    // Add more media here
];

function CombinedMediaList({ mediaType }) {
    const [mediaName, setMediaName] = useState("");
    const [mediaList, setMediaList] = useState(initialMediaList);

    const toggleMediaStatus = (id) => {
        setMediaList(prevList =>
            prevList.map(media =>
                media.id === id ? { ...media, isWatched: !media.isWatched } : media
            )
        );
    };

    const addMedia = () => {
        if (mediaName.trim() === "") return;
        const newMedia = {
            id: mediaList.length + 1,
            name: mediaName,
            isWatched: false,
            media_type: mediaType,
        };
        setMediaList(prevList => [...prevList, newMedia]);
        setMediaName("");
    };

    const renderMedia = (medias, watchedStatus) => {
        return medias
            .filter(media => media.media_type === mediaType && media.isWatched === watchedStatus)
            .map(media => (
                <TouchableOpacity key={media.id} onPress={() => toggleMediaStatus(media.id)}>
                    <MediaCard id={media.id} name={media.name} />
                </TouchableOpacity>
            ));
    };

    function MediaCard({ id, name }) {
        return (
            <View style={styles.card}>
                <Text style={styles.mediaId}>{id}</Text>
                <Text style={styles.mediaName}>{name}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} to Watch`}</Text>
                <ScrollView>
                    {renderMedia(mediaList, false)}
                </ScrollView>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Watched`}</Text>
                <ScrollView>
                    {renderMedia(mediaList, true)}
                </ScrollView>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={`Add a ${mediaType}`}
                    value={mediaName}
                    onChangeText={setMediaName}
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

export default CombinedMediaList;
