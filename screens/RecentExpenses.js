import React, {useEffect, useState} from 'react';
import ExpensesOutput from "../сomponents/ExpensesOutput";
import {useExpensesCtx} from "../store/context/expenses";
import {getDataMinusDays} from "../util/date";
import {fetchExpense} from "../util/http";
import {ErrorOverlay, LoadingOverlay} from "../сomponents";
import {useAuthCtx} from "../store/context/auth";

const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState('')
    const {expenses, setExpense} = useExpensesCtx();

    const {token, uid} = useAuthCtx();
    const recentExpenses = expenses.filter((expense) => {
        const date7DaysAgo = getDataMinusDays(7)
        return expense.date > date7DaysAgo
    })

    useEffect(() => {

        const fetchExpenses = async () => {
            if (!token || !uid) return
            try {
                setIsFetching(true)
                const expenses = await fetchExpense(token, uid);
                setExpense(expenses);
            } catch (error) {
                console.log(error)
                setError('Could not fetch expenses!')
                // console.error("Error fetching expenses:", error);
            }
            setIsFetching(false)
        };
        fetchExpenses();
    }, [token, uid]);

    const errorHandler = () => {
        setError("")
    }

    if (error && !isFetching) return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    if (isFetching) return <LoadingOverlay/>
    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={recentExpenses}
            fallBackText="No expenses for the last 7 days."/>
    );
};

export default RecentExpenses;