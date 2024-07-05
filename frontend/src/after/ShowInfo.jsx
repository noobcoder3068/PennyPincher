import React from "react";
import "./ShowInfo.css";

function ShowInfo({ expenses }) {
  return (
    <div>
      <h1>Expense Entries</h1>
      <ul>
        {expenses.slice().reverse().map((expense, index) => (
          <li key={index} className="list">
            {expense.description}: ${expense.balance} ({expense.category} - {expense.method}): {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowInfo;
