import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from "react-native";
import {IconButton, Button} from "../сomponents";
import {GlobalStyles} from "../constants/styles";
import {useExpensesCtx} from "../store/context/expenses";
import ExpenseForm from "../сomponents/ManagerExpense/ExpenseForm";
// import {Button} from "../сomponents";

const ManageExpenses = ({route, navigation}) => {
    const {expenses, deleteExpense, updateExpense, addExpense} = useExpensesCtx()
    const editedExpenseId = route.params?.expenseId;
    const currentExpense = expenses.find(ex=>ex.id === editedExpenseId)
    const isEditing = Boolean(editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        deleteExpense(editedExpenseId)
        navigation.goBack();
    }
    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = (expenseData) => {
        if (isEditing) {
            updateExpense(editedExpenseId, expenseData)
        } else {
            addExpense(expenseData)
        }
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <ExpenseForm
                isEditing={isEditing}
                onCancel={cancelHandler}
                onConfirm={confirmHandler}
                currentExpense={currentExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
            <Text>ManageExpenses</Text>
        </View>
    );
};

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
})