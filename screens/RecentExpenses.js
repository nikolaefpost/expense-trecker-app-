import React from 'react';
import {View, Text} from "react-native";
import ExpensesOutput from "../сomponents/ExpensesOutput";
import {useExpensesCtx} from "../store/context/expenses";
import {getDataMinusDays} from "../util/date";

const RecentExpenses = () => {
    const { expenses} = useExpensesCtx()
    const recentExpenses = expenses.filter((expense)=>{
        const date7DaysAgo = getDataMinusDays( 7)
        return expense.date > date7DaysAgo
    })
    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={recentExpenses}
            fallBackText="No expenses for the last 7 days."/>
    );
};

export default RecentExpenses;