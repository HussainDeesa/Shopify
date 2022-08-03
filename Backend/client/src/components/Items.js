import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/appContext"
import Item from './Item'
import { useNavigate } from "react-router-dom";
import { Alert } from './Alert'

export const Items = (props) => {
    const {setprogress,showAlert,alert}=props
    props.setprogress(0)
    let navigate = useNavigate();
    const context = useContext(noteContext)
    const { items, getallitems } = context
    useEffect(() => {
            getallitems()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className='row my-3'>
                {items.map((items) => {
                    return <Item key={items._id} items={items} setprogress={setprogress} />
                })}
            </div>
        </>
    )
}
