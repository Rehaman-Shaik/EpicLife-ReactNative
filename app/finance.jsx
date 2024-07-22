import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { HomeLinkButton } from '@/components/Button';

function finance() {
    const [accountBalance, setAccountBalance] = useState(1001);
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactions, setTransactions] = useState([]);

    const handlePressInputButton = () => {
        if (amount.trim() !== '' && transactionType.trim() !== '') {
            const newTransaction = {
                id: transactions.length + 1,
                time: new Date().toLocaleString(),
                type: transactionType,
                amount: parseFloat(amount),
            };

            setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
            setAmount('');
            setTransactionType('');

            if (transactionType.toLowerCase() === 'credit') {
                setAccountBalance(prevBalance => prevBalance + newTransaction.amount);
            } else if (transactionType.toLowerCase() === 'debit') {
                setAccountBalance(prevBalance => prevBalance - newTransaction.amount);
            }
        }
    };

    const renderTransaction = (transaction) => (
        <View key={transaction.id} style={styles.transaction}>
            <Text style={styles.transactionText}>{transaction.id}</Text>
            <Text style={styles.transactionText}>{transaction.time}</Text>
            <Text style={styles.transactionText}>{transaction.type}</Text>
            <Text style={styles.transactionText}>{transaction.amount}</Text>
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
                <TextInput
                    style={styles.input}
                    placeholder="Enter whether transaction is credit or debit"
                    value={transactionType}
                    onChangeText={setTransactionType}
                />
                <Button title="Add" onPress={handlePressInputButton} />
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
    balanceContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    bankName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    balance: {
        fontSize: 16,
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
    },
    transactionText: {
        fontSize: 14,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});

export default finance;
