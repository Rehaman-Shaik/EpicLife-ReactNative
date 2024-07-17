import { HomeLinkButton } from '@/components/Button';
import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, View, ScrollView } from "react-native";
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


export default function HomeScreen() {
    interface TodoItem {
        text: string;
        struck: boolean;
    }
    const initialListTODO = [
        { text: "Buy Milk", struck: false },
        { text: "Buy Sugar", struck: false },
        { text: "Buy Eggs", struck: false }
    ];
    const [text, setText] = useState('');
    const [items, setItems] = useState<TodoItem[]>(initialListTODO);

    const handlePressStrikeThrough = (index: number) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index].struck = !newItems[index].struck;
            return newItems;
        });
    };

    const createText = (item: TodoItem, index: number) => {
        return (
            <TouchableOpacity key={index} onPress={() => handlePressStrikeThrough(index)}>
                <Text style={[styles.itemText, { textDecorationLine: item.struck ? "line-through" : "none" }]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        );
    };

    const handlePress = () => {
        if (text.trim() !== '') {
            setItems(prevItems => [...prevItems, { text, struck: false }]);
            setText('');
        }
    };
    return (
        <SafeAreaView style={styles.topContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a task"
                    value={text}
                    onChangeText={newText => setText(newText)}
                />
                <Button title="Add" onPress={handlePress} />
            </View>
            <ScrollView style={styles.scrollView}>
                {items.map((item, index) => createText(item, index))}
            </ScrollView>
            {HomeLinkButton()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
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
        paddingHorizontal: 8,
        marginRight: 8,
        height: 40,
        backgroundColor: '#fff',
    },
    scrollView: {
        marginTop: 16,
        marginBottom: 16,
    },
    itemText: {
        padding: 8,
        fontSize: 18,
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});
