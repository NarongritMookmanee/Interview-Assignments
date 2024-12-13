import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import style from './EditUserPage.module.css'
import { getUserById, updateUser, deleteUser } from '../../services/userServices';
import { login } from '../../services/loginServices';
import Headers from '../../components/Header/Headers';

function EditUserPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const delAccount = useRef(false)

    useEffect(() => {
        const credential = JSON.parse(localStorage.getItem('usrCredential'))
        setFormData(credential)
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const navto_home = () => {
        navigate('/')
    }

    const navto_login = () => {
        navigate('/login')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { id } = JSON.parse(localStorage.getItem('usrCredential'))
        if (delAccount.current === true) {
            try {
                if (formData.password !== formData.confirmPassword) {
                    setFormData({ ...formData, confirmPassword: "" });
                    return alert('Confirm password is not correct!!')
                }
                const delStatus = await deleteUser(id)
                console.log(delStatus)
                if (delStatus.status === 'succeeded') {
                    navto_login()
                    return alert('Delete account successfully')
                }
                return
            } catch (error) {
                return alert(error.message)
            }
        }
        if (formData.password !== formData.confirmPassword) {
            setFormData({ ...formData, confirmPassword: "" });
            return alert('Confirm password is not correct!!')
        }
        delete formData.confirmPassword
        delete formData.exp
        delete formData.id
        delete formData.iat
        console.log('usrCredential: ', formData)
        console.log('usrCredential-id: ',)
        try {
            const regStatus = await updateUser(id, formData)
            console.log(regStatus)
            if (regStatus.status === 'succeeded') {
                const loginStatus = await login(formData.email, formData.password)
                if (loginStatus.status === 200) {
                    alert('Update user information successfuly')
                    setFormData({ ...formData, confirmPassword: "" });
                }
            }
        } catch (e) {
            alert(e.message)
        }
    };

    return (
        <div>
            <Headers home={false} edituser={true} />
            <div className={style.main}>
                <div calss="container">
                    <div class="rows">
                        <div className={style.container}>
                            <div className={style.title}>Edit user informations</div>
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
                                        <input type="submit" value="Update" onClick={(e) => delAccount.current = false} />
                                    </div>
                                    <hr className={style.hr} />
                                    <div className={style.delbutton} >
                                        <input type="submit" value="Delete account" onClick={(e) => delAccount.current = true} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserPage;