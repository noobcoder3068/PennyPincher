import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ShowInfo from "./ShowInfo";
import "./AddGet.css";
import AddExpanse from "./AddExpanse";
import UserContext from "../context/contextProvider";

function AddGet() {
  const [expenses, setExpenses] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { user } = useContext(UserContext);
  const user_id = user.data.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        const result = await axios.get('/getAllInfo', { params: { user_id } });
        setExpenses(result.data);
      } catch (err) {
        console.log('Error in fetching from backend', err);
      }
    };

    fetchData();
  }, [user_id, triggerFetch]);

  const addExpense = async (expense) => {
    try {
      await axios.post('/addExpense', { user_id, ...expense });
      setTriggerFetch(!triggerFetch);
    } catch (err) {
      console.log('Error in adding expense', err);
    }
  };

  return (
    <div>
      <h1>Welcome Back, Master!</h1>
      <h1>Expense Tracker</h1>
      <AddExpanse addExpense={addExpense} />
      <ShowInfo expenses={expenses} />
    </div>
  );
}

export default AddGet;