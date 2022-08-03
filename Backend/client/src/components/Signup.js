import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Alert } from './Alert';
import cross from '../images/cross.png'
const Signup = (props) => {
    props.setprogress(0)
    let navigate = useNavigate();
    const [crediantials, setCrediantials] = useState({ name: "", phone: "", password: "", cpassword: "" })
    const phone = document.getElementById('phone')
    const phone_block = document.getElementById('phone-block')
    const handleSubmit = async (e) => {

        props.setprogress(10)
        if (crediantials.password === crediantials.cpassword) {
            e.preventDefault();
            props.setprogress(20)
            const response = await fetch(`api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: crediantials.name, phone: crediantials.phone, password: crediantials.password })
            })

            const json = await response.json()
            props.setprogress(50)
            if (json.success) {
                props.setprogress(70)
                localStorage.setItem('token', json.authToken)
                props.setprogress(100)
                navigate('/');
            }
            else if (!json.phone_length) {
                props.setprogress(100)
                props.showAlert("*Enter a valid phone number.")
            }

            else {
                props.setprogress(100)
                props.showAlert("*User with this phone number already exists")
            }
        }
        else {
            props.setprogress(100)
            e.preventDefault()
            props.showAlert("*Password and Confirm Password are different")
        }
    };

    const handleOnChange = (e) => {
        setCrediantials({ ...crediantials, [e.target.name]: e.target.value })
    }
  

    return (
        <div className='container my-3'>
            <div className='form-template' id='form-login' >
                <div className='head'>
                    <h3 className='form-title'>Sign Up</h3>
                </div>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" onChange={handleOnChange} className="form-control" name='name' id="name" required minLength={3} />

                        <label htmlFor="phone" className="form-label">Phone Number </label>
                        <div className='d-flex ' id='phone-block'>
                            <input type="number" oninvalid="setCustomValidity('Phone number should be of 10 digits')" oninput="setCustomValidity('')" minLength={10} maxLength={10} onChange={handleOnChange} className="form-control" onKeyUp={(e) => {
                                e.target.disabled = false
                                if (e.target.value.length === 10)
                                    e.target.disabled = true;
                                if (e.target.disabled) {
                                    let img = document.createElement('img')
                                    img.setAttribute('class', "cross")
                                    img.setAttribute('src', cross)
                                    phone_block.append(img)
                                    img.addEventListener('click',()=>{
                                        phone.disabled=false
                                        phone.value=''
                                        phone_block.removeChild(img)
                                    })
                                }
                            }} name='phone' id="phone" required />
                        </div>
                        <label htmlFor="password" className="form-label">Password </label>
                        <input type="password" onChange={handleOnChange} className="form-control" name='password' id="password" required minLength={7} />
                        <label htmlFor="cpassword" className="form-label">Confirm Password </label>
                        <input type="password" onChange={handleOnChange} className="form-control" name='cpassword' id="cpassword" required minLength={7} />

                        <button type="submit" className="btn btn-primary form-btn">Signup</button>
                    </form>
                    <Alert alert={props.alert} />
                    <div className='log-sig-redirect'> Already have an account? <Link to='/login'>Login</Link></div>
                </div>

            </div>
        </div>

    )
}

export default Signup