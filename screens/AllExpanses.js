import React from 'react';

import {ExpensesOutput} from "../сomponents";
import {useExpensesCtx} from "../store/context/expenses";

const AllExpanses = () => {
    const { expenses} = useExpensesCtx()
    return (
        <ExpensesOutput
            expensesPeriod="Total"
            expenses={expenses}
            fallBackText="No registered expenses found!"
        />
    );
};

export default AllExpanses;