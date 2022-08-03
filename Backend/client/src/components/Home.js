import { Items } from './Items'
import React, { useState, useContext,useEffect } from 'react';
import appContext from '../context/appContext';
import Login from './Login'
export default function Home(props) {
    const { setprogress, showAlert, alert } = props;
    const context = useContext(appContext)
    const { getallcartitems } = context
    props.setprogress(0)
    const getuser = async () => {
        const response = await fetch(`api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
    };
    getuser()
    useEffect(() => {
        getallcartitems();
        // eslint-disable-next-line
    }, [])

    return (
        <div>

            {localStorage.getItem('token') ? <Items setprogress={setprogress} showAlert={showAlert} alert={alert} /> : <Login setprogress={setprogress} alert={alert} />}
        </div>
    )
}


