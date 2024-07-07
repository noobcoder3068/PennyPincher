import React from "react";
import {Bar, Line, Pie , Doughnut} from "react-chartjs-2";

function Charts({user_id})
{
  console.log("we sre in charts");
    
    return (
        <p>Hello {user_id}</p>
    )
}

export default Charts;