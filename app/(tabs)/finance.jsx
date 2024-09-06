import { Dropdown } from 'react-native-element-dropdown';
import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addFinanceEntry = async (newEntry) => {
    console.log(JSON.stringify(newEntry));
    const userToken = await AsyncStorage.getItem('authToken');
    try {
        const response = await fetch(`https://rehamanshaikofficial.xyz/finance/${userToken}/add`, {
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
        console.error("Error adding finance entry:", error.message);
    }
};

async function getData(setTransactions, setAccountBalance) {
    const userToken = await AsyncStorage.getItem('authToken');
    const url = `https://rehamanshaikofficial.xyz/finance/${userToken}/all`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data);

        // Recalculate balance after fetching
        let totalBalance = 0;
        data.forEach(item => {
            totalBalance += item.type === 'credit' ? Number(item.amount) : -Number(item.amount);
        });
        setAccountBalance(totalBalance);

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const transactionTypeOptions = [
    { label: 'Credit', value: 'credit' },
    { label: 'Debit', value: 'debit' },
];

function Finance() {
    const [accountBalance, setAccountBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getData(setTransactions, setAccountBalance);
    }, []);

    const handlePressInputButton = async () => {
        // Validate amount and transaction type
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            Alert.alert('Invalid input', 'Please enter a valid amount.');
            return;
        }
        if (!transactionType) {
            Alert.alert('Missing transaction type', 'Please select a transaction type.');
            return;
        }

        const newTransaction = {
            id: transactions.length + 1,
            time: new Date().toLocaleString(),
            type: transactionType,
            amount: parseFloat(amount),
        };

        setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
        setAmount('');

        // Add transaction to the server and refresh the transaction list
        await addFinanceEntry(newTransaction);
        await getData(setTransactions, setAccountBalance);
    };

    const renderTransaction = (transaction, index) => (
        <View key={index} style={styles.transaction}>
            <Text style={styles.transactionText}>{transaction.id}</Text>
            <Text style={styles.transactionText}>{transaction.time}</Text>
            <Text style={styles.transactionText}>{transaction.type}</Text>
            <Text style={styles.transactionText}>${transaction.amount.toFixed(2)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.balanceContainer}>
                <Text style={styles.bankName}>Indian Bank</Text>
                <Text style={styles.balance}>${accountBalance.toFixed(2)}</Text>
            </View>

            <ScrollView style={styles.transactionsContainer}>
                {transactions.map(renderTransaction)}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter an amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={transactionTypeOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Select transaction type"
                    value={transactionType}
                    onChange={item => setTransactionType(item.value)}
                />
                <Button title="Add Transaction" onPress={handlePressInputButton} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        marginTop: 15,
    },
    balanceContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    bankName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    balance: {
        fontSize: 22,
        color: '#333',
    },
    transactionsContainer: {
        flex: 1,
        marginBottom: 20,
    },
    transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        marginBottom: 5,
        borderRadius: 5,
    },
    transactionText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 10,
        padding: 10,
        borderColor: '#ccc',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 35,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#888',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});

export default Finance;
