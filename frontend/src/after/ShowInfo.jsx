import React from "react";
import "./ShowInfo.css";

function ShowInfo({ expenses }) {
  return (
    <div className="showinfo-container">
      <h1>Expense Entries</h1>
      <ul className="showinfo-list">
        {expenses.slice().reverse().map((expense, index) => (
          <li key={index} className="showinfo-item">
            <div className="expense-details">
              <div className="expense-description">{expense.description}</div>
              <div className="expense-amount">${expense.balance}</div>
            </div>
            <div className="expense-info">
              <div className="expense-category">{expense.category}</div>
              <div className="expense-method">{expense.method}</div>
              <div className="expense-date">{expense.date}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowInfo;
