import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getData(setItems) {
    const userToken = await AsyncStorage.getItem('authToken');
    const url = `https://rehamanshaikofficial.xyz/todo/${userToken}/all`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
    } catch (error) {
        console.error("Error fetching to-do items:", error.message);
    }
}

const addTodoItem = async (text) => {
    const userToken = await AsyncStorage.getItem('authToken');
    try {
        const response = await fetch(`https://rehamanshaikofficial.xyz/todo/${userToken}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
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

export default function HomeScreen() {
    const initialListTODO = [
        { text: "Loading...", struck: false },
    ];
    const [text, setText] = useState('');
    const [items, setItems] = useState(initialListTODO);

    useEffect(() => {
        getData(setItems);
    }, []);

    const handlePressStrikeThrough = (index) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index].struck = !newItems[index].struck;
            return newItems;
        });
    };

    const createText = (item, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => handlePressStrikeThrough(index)}>
                <Text style={[styles.itemText, { textDecorationLine: item.struck ? "line-through" : "none" }]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        );
    };

    const handlePress = async () => {
        if (text.trim() !== '') {
            setItems(prevItems => [...prevItems, { text, struck: false }]);
            setText('');
            addTodoItem(text);
            await new Promise(resolve => setTimeout(resolve, 5000));
            await getData(setItems);
        }
    };

    return (
        <SafeAreaView style={styles.topContainer}>
            <ScrollView style={styles.scrollView}>
                {items.map((item, index) => createText(item, index))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a task"
                    value={text}
                    onChangeText={newText => setText(newText)} />
                <Button title="Add" onPress={handlePress} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        marginTop: 20,
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
        marginRight: 8,
        height: 40,
        backgroundColor: '#fff',
    },
    scrollView: {
        marginBottom: 16,
    },
    itemText: {
        padding: 8,
        fontSize: 18,
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderRadius: 4
    },
});
