import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, use } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import style from './LoginPage.module.css'
import { login } from '../../services/loginServices';
import { getUsers } from '../../services/userServices';

function LoginPage() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    function func_setEmail(event) {
        setEmail(event.target.value)
    }

    function func_setPassword(event) {
        setPassword(event.target.value)
    }

    async function submit(event) {
        event.preventDefault() // protect reload page
        console.log({ email, password })
        const loginStatus = await login(email, password)
        if (loginStatus.status === 200) {
            navto_home()
        }
    }

    function navto_registeration() {
        navigate('/register')
    }

    function navto_home() {
        navigate('/')
    }

    async function func_getUsers() {
        console.log(await getUsers())
    }

    return (
        <div className={style.main}>
            <div className={style.wrapper}>
                <div className={style.title}>Login Form</div>
                <form onSubmit={submit}>
                    <div className={style.field}>
                        <input type="text" required onChange={func_setEmail} />
                        <label>Email Address</label>
                    </div>
                    <div className={style.field}>
                        <input type="password" required onChange={func_setPassword} />
                        <label>Password</label>
                    </div>
                    <hr className={style.hr}/>
                    <div className={style.field}>
                        <input type="submit" value="Login" />
                    </div>
                    <div className={style.signuplink}>
                        Not a member? <button type="button" onClick={navto_registeration}>Signup now</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;