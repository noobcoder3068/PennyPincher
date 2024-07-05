import React, { useState } from "react";
import "./AddExpanse.css";

function AddExpanse({ addExpense }) {
  const [include, setInclude] = useState(false);

  const [note, setNote] = useState({
    type: "",
    description: "",
    amount: "",
    category: "",
    method: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));

    if (name === "type") {
      setInclude(value === "Expense");
    }
  }

  async function submitNote(event) {
    event.preventDefault();
    try {
      console.log(note);
      await addExpense(note);
      setNote({
        type: "",
        description: "",
        amount: "",
        category: "",
        method: "",
      });
    } catch (err) {
      console.log("There was an error in sending from add expense ", err.response ? err.response.data : err.message);
    }
  }

  return (
    <div className="create-area">
      <form className="create-note">
        <label>Cash Flow</label>
        <select
          name="type"
          value={note.type}
          onChange={handleChange}
          className="cashflow"
        >
          <option value="">Select Type</option>
          <option value="Expense">Expense</option>
          <option value="Saving">Saving</option>
        </select>

        <input
          name="description"
          type="text"
          onChange={handleChange}
          value={note.description}
          placeholder="Description"
        />
        <input
          name="amount"
          type="number"
          onChange={handleChange}
          value={note.amount}
          placeholder="Amount"
        />
        <input
          name="method"
          type="text"
          onChange={handleChange}
          value={note.method}
          placeholder="Method"
        />

        {include ? (
          <>
            <label>Category</label>
            <select
              name="category"
              value={note.category}
              onChange={handleChange}
              className="category"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Clothing">Clothing</option>
              <option value="Other_expense">Other_expense</option>
            </select>
          </>
        ) : (
          <>
            <label>Category</label>
            <select
              name="category"
              value={note.category}
              onChange={handleChange}
              className="category"
            >
              <option value="">Select Method</option>
              <option value="Income">Income</option>
              <option value="Bonus">Bonus</option>
              <option value="Gift">Gift</option>
              <option value="Other_Saving">Other_saving</option>
            </select>
          </>
        )}

        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default AddExpanse;
