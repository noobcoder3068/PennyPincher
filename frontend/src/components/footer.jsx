import React from "react";
import "./footer.css"

function Footer(){
    const date = new Date();
    const day = date.getDate(); 
    const month = date.toLocaleString('en-US', { month: 'long' }); 
    const year = date.getFullYear();

    return <div className="footer">
        <p>Ab_d....   ©   {`${day}  ${month}  ${year}`}</p>
    </div>
}

export default Footer;