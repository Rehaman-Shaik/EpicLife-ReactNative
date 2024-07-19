import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { HomeLinkButton } from '@/components/Button';
import diaryEntries from '../components/diary/entrylist';

export default function Page() {
    const [isPressed, setIsPressed] = useState(null);
    const [diaryEntriesReact, setDiaryEntriesReact] = useState(diaryEntries);
    const [text, setText] = useState('');

    const handlePress = (id) => {
        setIsPressed(prevValue => (prevValue === id ? null : id));
    };

    const handlePressInputButton = () => {
        if (text.trim() !== '') {
            const newEntry = {
                id: diaryEntriesReact.length + 1,  // Ensure the id is unique and incremental
                time: new Date().toLocaleString(),  // Properly formatted date and time
                text: text,
            };
            setDiaryEntriesReact(prevItems => [...prevItems, newEntry]);
            setText('');
        }
    };

    const renderDiaryEntry = (entry) => {
        const displayText = isPressed === entry.id ? entry.text : entry.text.slice(0, 130) + '...';
        return (
            <TouchableOpacity key={entry.id} onPress={() => handlePress(entry.id)} style={isPressed === entry.id ? styles.pressedDiary : styles.diary}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{entry.id}</Text>
                    <Text style={styles.time}>{entry.time}</Text>
                </View>
                <Text style={styles.text}>{displayText}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.topContainer}>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter an entry"
                    value={text}
                    onChangeText={newText => setText(newText)}
                />
                <Button title="Add" onPress={handlePressInputButton} />
            </View>
            <ScrollView>
                <View>
                    {diaryEntriesReact.map(renderDiaryEntry)}
                </View>
            </ScrollView>
            <View>
                {HomeLinkButton()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    diary: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        height: 100,
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    pressedDiary: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        height: 300,
        width: "100%",
        padding: 10,
        backgroundColor: "#e0e0e0",
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    time: {
        color: '#888',
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        flex: 2,
        marginRight: 5,
        height: 40,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
});

export { Page };
