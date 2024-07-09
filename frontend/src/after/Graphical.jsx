import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import './Graphical.css';

const Charts = ({ user_id }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('/charts', { params: { user_id } });
        setChartData(response.data);
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };

    fetchChartData();
  }, [user_id]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const { transaction_summary, saving_by_category, expense_by_category, balance_by_method } = chartData;

  const bar_data = {
    labels: transaction_summary.map(data => data.transection_type),
    datasets: [{
      label: "Total Amount",
      data: transaction_summary.map(data => data.total_balance),
      backgroundColor: ['#36A2EB', '#FF6384'],
      barPercentage: 0.4,
      categoryPercentage: 0.5
    }]
  };

  const pie_sav = {
    labels: saving_by_category.map(data => data.category),
    datasets: [{
      label: "Amount",
      data: saving_by_category.map(data => data.total_saving),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  };

  const pie_exp = {
    labels: expense_by_category.map(data => data.category),
    datasets: [{
      label: "Amount",
      data: expense_by_category.map(data => data.total_expense),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
  };

  const donut_met = {
    labels: balance_by_method.map(data => data.transection_method.trim()),
    datasets: [{
      label: "Amount",
      data: balance_by_method.map(data => data.total_balance),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  };

  const transactionSummaryOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Transaction Summary',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const savingByCategoryOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Saving by Category',
      },
    },
  };

  const expenseByCategoryOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Expense by Category',
      },
    },
  };

  const balanceByMethodOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Balance by Method',
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="charts-container">
      <h1>Financial Overview</h1>
      <p>Welcome to your personal finance dashboard. Here you'll find a detailed overview of your financial transactions, savings, expenses, and balance distribution. Let's dive into the data!</p>
      
      <div className="chart-section">
        <h2>Transaction Summary</h2>
        <p>This chart summarizes all your transactions, categorized into savings and expenses, showing the total balance for each type.</p>
        <Bar data={bar_data} options={transactionSummaryOptions} />
      </div>
      
      <div className="chart-row">
        <div className="chart-pie1-section">
          <h2>Saving by Category</h2>
          <p>This pie chart breaks down your savings into various categories, giving you a clear picture of where you are accumulating wealth.</p>
          <Doughnut data={pie_sav} options={savingByCategoryOptions} />
        </div>
        <div className="chart-pie-section">
          <h2>Expense by Category</h2>
          <p>This pie chart illustrates your expenses across different categories, helping you understand your spending habits.</p>
          <Doughnut data={pie_exp} options={expenseByCategoryOptions} />
        </div>
      </div>
      
      <div className="chart-section">
        <h2>Balance by Method</h2>
        <p>This doughnut chart shows the distribution of your total balance across various transaction methods such as Net Banking, UPI, and Cash.</p>
        <Pie data={donut_met} options={balanceByMethodOptions} />
      </div>
    </div>
  );
};

export default Charts;
