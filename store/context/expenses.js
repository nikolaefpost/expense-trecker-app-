import {createContext, useContext, useReducer, useState} from "react";

const expensesData = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2024-03-10")
    },
    {
        id: "e2",
        description: "A pair of short",
        amount: 25,
        date: new Date("2024-02-26")
    },
    {
        id: "e3",
        description: "A pair of bad girls",
        amount: 159.02,
        date: new Date("2024-02-23")
    },
    {
        id: "e4",
        description: "Some bananas",
        amount: 9.02,
        date: new Date("2024-02-28")
    },
    {
        id: "e5",
        description: "A book",
        amount: 29.02,
        date: new Date("2024-02-27")
    },
    {
        id: "e6",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2024-02-25")
    },
    {
        id: "e7",
        description: "A pair of short",
        amount: 25,
        date: new Date("2024-02-26")
    },
    {
        id: "e8",
        description: "A pair of bad girls",
        amount: 159.02,
        date: new Date("2024-10-23")
    },
    {
        id: "e9",
        description: "Some bananas",
        amount: 9.02,
        date: new Date("2024-02-22")
    },
    {
        id: "e10",
        description: "A book",
        amount: 29.02,
        date: new Date("2024-02-21")
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, {description, amount, date}) => {
    },
})

export const useExpensesCtx = () => useContext(ExpensesContext);

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "DELETE":
            return state.filter(expense => expense.id !== action.payload);
        case "ADD":
            const id = `${new Date().toDateString()}${Math.random()}`;
            return [{...action.payload, id}, ...state];
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatedItem = {...state[updatableExpenseIndex], ...action.payload.data};
            return [...state.slice(0, updatableExpenseIndex), updatedItem,
                ...state.slice(updatableExpenseIndex + 1)];
        default:
            return state;
    }
};

const ExpensesContextProvider = ({children}) => {

    const [expensesState, dispatch] = useReducer(expensesReducer, expensesData)


    const deleteExpense = (id) => {
        dispatch({type: "DELETE", payload: id})
    }
    const addExpense = (expenseData) => {
        dispatch({type: "ADD", payload: expenseData})
    }
    const updateExpense = (id, expenseData) => {
        dispatch({type: "UPDATE", payload: {id, data: expenseData}})
    }
    const value = {
        expenses: expensesState,
        deleteExpense,
        addExpense,
        updateExpense
    }
    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider