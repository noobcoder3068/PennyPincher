import React, { useState } from "react";
import "./AddExpanse.css";
import axios from "axios";

function AddExpanse({user_id}) {
  const [include, setInclude] = useState(false);

  const [note, setNote] = useState({
    type: "",
    description: "",
    amount: "",
    category: "",
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
      const result = await axios.post('/AddExpense', {...note, user_id}); 
      console.log(result.data);
      setNote({
        type: "",
        description: "",
        amount: "",
        category: "",
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

        {include && (
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
              <option value="Other">Other</option>
            </select>
          </>
        )}

        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default AddExpanse;
