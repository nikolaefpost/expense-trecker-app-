import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from "react-native";
import Input from "./Input";
import {Button} from "../UI";
import {getFormattedDate} from "../../util/date";
import {GlobalStyles} from "../../constants/styles";

const ExpenseForm = ({onCancel, onConfirm, isEditing, currentExpense}) => {

    const [inputs, setInputs] = useState({
        amount: {
            value: currentExpense ? currentExpense.amount.toString() : "",
            isValid: true
        },
        date: {
            value: currentExpense ? getFormattedDate(currentExpense.date) : "",
            isValid: true
        },
        description: {
            value: currentExpense? currentExpense.description : "",
            isValid: true
        },
    })
    const inputChangedHandler = (inputIdentifier, entreValue) => {
        setInputs(prev => ({...prev, [inputIdentifier]: {value: entreValue, isValid: true}}))
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs(pre=> ({
                amount: {value: pre.amount.value, isValid:amountIsValid },
                date: {value: pre.date.value, isValid:dateIsValid },
                description: {value: pre.description.value, isValid:descriptionIsValid },
            }))
            // Alert.alert('Invalid input', 'Please check your input value')
            return;
        }
            onConfirm(expenseData)
    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid ;
    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, "amount"),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, "date"),
                    value: inputs.date.value
                }}/>
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: inputChangedHandler.bind(this, "description"),
                value: inputs.description.value
            }}/>
            {formIsValid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{isEditing ? "Update" : "Add"}</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"

    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16
    },
    button: {
        width: 120
    },
})
export default ExpenseForm;