import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";


export default function MakeCollection() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    return (


        <div id="buy-panel">

        </div>


    )
}
