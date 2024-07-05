import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowInfo({user_id}){
    const [information, setInformation]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/getAllInfo', { params: { user_id } });
                setInformation(result.data);
            } catch (err) {
                console.log('error in fetching from frontend', err);
            }
        };

        fetchData();
    }, [user_id]);

    console.log(information.data);

    return <h1>{information.data}</h1>
}

export default ShowInfo;