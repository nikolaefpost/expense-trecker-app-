import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {IconButton, Button, LoadingOverlay, ErrorOverlay} from "../сomponents";
import {GlobalStyles} from "../constants/styles";
import {useExpensesCtx} from "../store/context/expenses";
import ExpenseForm from "../сomponents/ManagerExpense/ExpenseForm";
import {storeExpense, updateExpenseServer, deleteExpenseServer} from "../util/http";
import {useAuthCtx} from "../store/context/auth";


const ManageExpenses = ({route, navigation}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {token} =useAuthCtx();
    const [error, setError] = useState('')
    const {expenses,  addExpense, updateExpense, deleteExpense} = useExpensesCtx()
    const editedExpenseId = route.params?.expenseId;
    const currentExpense = expenses.find(ex=>ex.id === editedExpenseId)
    const isEditing = Boolean(editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing]);
    const errorHandler = () => {
        setError("")
    }

    const deleteExpenseHandler = async () => {
        setIsSubmitting(true)
        try{
            await deleteExpenseServer(editedExpenseId)
            deleteExpense(editedExpenseId)
            navigation.goBack();
        }catch (e) {
            setIsSubmitting(false);
            setError("Could not delete expense - please try again later")
        }

    }
    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = async (expenseData) => {
        setIsSubmitting(true)
        try{
            if (isEditing) {
                await updateExpenseServer(editedExpenseId, expenseData)
                updateExpense(editedExpenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData, token)
                addExpense({...expenseData, id})
            }
            navigation.goBack();
        }catch (e) {
            setIsSubmitting(false)
            setError(isEditing? "Could not update expense - please try again later":
                "Could not save data - please try again later")
        }

    }

    if (error && !isSubmitting) return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    if (isSubmitting) return <LoadingOverlay/>

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