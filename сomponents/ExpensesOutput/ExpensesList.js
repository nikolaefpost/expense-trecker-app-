import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = ({item}) => {

    return <ExpenseItem {...item}/>
}

const ExpensesList = ({expenses}) => {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={item => item.id}
        />
    );
};

export default ExpensesList;