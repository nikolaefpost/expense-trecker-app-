import axios from "axios";

const ROOT_URL = 'https://expense-trecker-app-default-rtdb.europe-west1.firebasedatabase.app/';
export const storeExpense = async (expenseData, token) => {
    const response = await axios.post(`${ROOT_URL}expenses.json?auth=${token}`, expenseData);
    return response.data.name;
}

export const fetchExpense = async (token) => {
    const response = await axios.get(`${ROOT_URL}expenses.json?auth=${token}`);
    const {data} = response;

    return Object.keys(data).map(key => ({
        id: key,
        amount: data[key].amount,
        date: new Date(data[key].date),
        description: data[key].description
    }));
};

export const updateExpenseServer =  (id, expenseData)=>
    axios.put(`${ROOT_URL}expenses/${id}.json`, expenseData);

export const deleteExpenseServer =  (id) =>
    axios.delete(`${ROOT_URL}expenses/${id}.json`);

