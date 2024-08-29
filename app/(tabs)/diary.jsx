import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const adddiaryItem = async (newEntry) => {
    console.log(JSON.stringify(newEntry));
    const userToken = await AsyncStorage.getItem('authToken');
    try {
        const response = await fetch(`https://rehamanshaikofficial.xyz/diary/${userToken}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEntry),
        });
        if (response.ok) {
            console.log("Item added successfully");
        } else {
            console.error("Failed to add item:", response.status);
        }
    } catch (error) {
        console.error("Error adding to-do item:", error.message);
    }
}

async function getData(setDiaryEntriesReact) {
    const userToken = await AsyncStorage.getItem('authToken');
    const url = `https://rehamanshaikofficial.xyz/diary/${userToken}/all`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setDiaryEntriesReact(data);
    } catch (error) {
        console.error("Error fetching to-do items:", error.message);
    }
}

export default function diary() {
    const [isPressed, setIsPressed] = useState(null);
    const [diaryEntriesReact, setDiaryEntriesReact] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        getData(setDiaryEntriesReact);
    }, []);
    
    const handlePress = (id) => {
        setIsPressed(prevValue => (prevValue === id ? null : id));
    };

    const handlePressInputButton = async () => {
        if (text.trim() !== '') {
            const newEntry = {
                id : diaryEntriesReact.length+1,
                time: new Date().toLocaleString(),  // Properly formatted date and time
                text: text,
            };
            setDiaryEntriesReact(prevItems => [...prevItems, newEntry]);
            setText('');
            adddiaryItem(newEntry);
            await new Promise(resolve => setTimeout(resolve, 5000));
            await getData(setDiaryEntriesReact);
        }
    };

    const renderDiaryEntry = (entry, index) => {
        var index = index + 1
        const displayText = isPressed === index ? entry.text : entry.text.slice(0, 130) + '...';
        return (
            <TouchableOpacity key={index} onPress={() => handlePress(index)} style={isPressed === index ? styles.pressedDiary : styles.diary}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{index}</Text>
                    <Text style={styles.time}>{entry.time}</Text>
                </View>
                <Text style={styles.text}>{displayText}</Text>
            </TouchableOpacity>
        );
    };
    
    return (
        <SafeAreaView style={styles.topContainer}>
            <ScrollView>
                <View>
                    {diaryEntriesReact.map(renderDiaryEntry)}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter an entry"
                    value={text}
                    onChangeText={newText => setText(newText)}
                />
                <Button title="Add" onPress={handlePressInputButton} />
            </View>
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        marginTop: 15
    },
    diary: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        height: 100,
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    pressedDiary: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
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
        borderRadius: 10,
        flex: 2,
        marginRight: 5,
        height: 40,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
});

export { diary };
