import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import style from './Headers.module.css'
import { logout as logoutService } from '../../services/logoutServices';

function Headers(props) {
    const navigate = useNavigate()
    const username = useRef(JSON.parse(localStorage.getItem('usrCredential')).username)
    const navto_edituser = () => {
        navigate('/edituser')
    }

    const navto_login = () => {
        navigate('/login')
    }

    const logout = () => {
        logoutService()
        navto_login()
    }

    return (
        <header class="p-3 text-bg-dark">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {props.home ? <li><a href="/" class="nav-link px-2 text-secondary">Home</a></li> : <li><a href="/" class="nav-link px-2 text-white">Home</a></li>}
                        {/* <li><a href="/edituser" class="nav-link px-2 text-white">Features</a></li>
                        <li><a href="#" class="nav-link px-2 text-secondary">About</a></li> */}
                    </ul>
                    <div class={style.usernameLabel}>
                        {username.current}
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-outline-light me-2" onClick={navto_edituser} disabled={props.edituser}>Edit user informations</button>
                        <button type="button" class="btn btn-warning" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Headers;