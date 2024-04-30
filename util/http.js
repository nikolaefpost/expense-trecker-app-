import axios from "axios";

const ROOT_URL = 'https://expense-trecker-app-default-rtdb.europe-west1.firebasedatabase.app/';
export const storeExpense = async (token, uid, expenseData) => {
    const response = await axios.post(`${ROOT_URL}expenses/${uid}.json?auth=${token}`, expenseData);
    return response.data.name;
}

export const fetchExpense = async (token, uid) => {
    const response = await axios.get(`${ROOT_URL}expenses/${uid}.json?auth=${token}`);
    const {data} = response;

    return data !== null ?  Object.keys(data).map(key => ({
        id: key,
        amount: data[key].amount,
        date: new Date(data[key].date),
        description: data[key].description
    })):[];
};

export const updateExpenseServer =  (token, uid, id, expenseData)=>
    axios.put(`${ROOT_URL}expenses/${uid}/${id}.json?auth=${token}`, expenseData);

export const deleteExpenseServer =  (token, uid, id) =>
    axios.delete(`${ROOT_URL}expenses/${uid}/${id}.json?auth=${token}`);

