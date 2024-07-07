import React, {useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/contextProvider";
// import {Bar, Line, Pie , Doughnut} from "react-chartjs-2";

const Charts = ({user_id}) => {
    const [chartData, setChartData] = useState(null);
  
    useEffect(() => {
      const fetchChartData = async () => {
        try {
            console.log(user);
          const response = await axios.get('/charts',user_id);
          setChartData(response.data);
        } catch (err) {
          console.error('Error fetching chart data:', err);
        }
      };
  
      fetchChartData();
    }, [user.data.id]);
  
    if (!chartData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        {/* Render your charts here using the chartData */}
        <h1>Charts</h1>
        <pre>{JSON.stringify(chartData, null, 2)}</pre>
      </div>
    );
  };

export default Charts;