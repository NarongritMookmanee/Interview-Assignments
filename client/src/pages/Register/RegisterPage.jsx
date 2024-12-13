import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import style from './RegisterPage.module.css'
import { createUser } from "../../services/userServices";
import { login } from "../../services/loginServices";

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const navto_home = () => {
        navigate('/')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        if (formData.password !== formData.confirmPassword) {
            setFormData({ ...formData, confirmPassword: "" });
            return alert('Confirm password is not correct!!')
        }
        const userCredential = formData
        delete userCredential.confirmPassword
        try {
            const regStatus = await createUser(userCredential)
            console.log(regStatus)
            if (regStatus.status === 'succeeded') {
                const loginStatus = await login(userCredential.email, userCredential.password)
                if (loginStatus.status === 200) {
                    navto_home()
                }
            }
        } catch (e) {
            alert(e.message)
        }
    };

    return (
        <div className={style.main}>

            <div className={style.container}>
                <div className={style.title}>Registration</div>
                <div className={style.content}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.userdetails}>

                            <div className={style.inputbox}>
                                <span className={style.details}>Username</span>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={style.inputbox}>
                                <span className={style.details}>Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={style.inputbox}>
                                <span className={style.details}>Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={style.inputbox}>
                                <span className={style.details}>Confirm Password</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={style.button}>
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;