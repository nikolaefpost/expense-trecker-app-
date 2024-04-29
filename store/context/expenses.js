import {createContext, useContext, useReducer} from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpense: (expenses)=>{},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
})

export const useExpensesCtx = () => useContext(ExpensesContext);

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "DELETE":
            return state.filter(expense => expense.id !== action.payload);
        case "ADD":
            // const id = `${new Date().toDateString()}${Math.random()}`;
            return [action.payload, ...state];
        case "SET":
            return action.payload.reverse();
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
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    const deleteExpense = (id) => {
        dispatch({type: "DELETE", payload: id})
    }
    const addExpense = (expenseData) => {
        dispatch({type: "ADD", payload: expenseData})
    }
    const setExpense = (expenses) => {
        dispatch({type: "SET", payload: expenses})
    }
    const updateExpense = (id, expenseData) => {
        dispatch({type: "UPDATE", payload: {id, data: expenseData}})
    }
    const value = {
        expenses: expensesState,
        deleteExpense,
        addExpense,
        updateExpense,
        setExpense
    }
    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider