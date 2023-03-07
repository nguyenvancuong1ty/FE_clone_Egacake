import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import './Authentication.scss';
import axios from 'axios';
import Header from '~/components/Header';
import md5 from 'md5';
function Login() {
    const successLogin = () => {
        toast.success('Login Success', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };

    const errorLogin = () => {
        toast.error('Invalid Username or Password', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = () => {
        axios.post('https://18.143.149.62:3000/v1/api/login',
            {
                username: username,
                password: md5(password),
            }).then((res) => {
            if (res.data.statusCode) {
                localStorage.setItem('user_id', res.data.data[0].id);
                localStorage.setItem('isLogin', true);
                successLogin();
                res.data.data[0].authorization === 1 ? navigate('/admin/manager/users') : navigate('/');
            } else {
                errorLogin();
                inputRef.current.focus();
            }
        }).then(e => console.log('error', e));
    };
    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <form className="login">
                <h1 className="login__title">Đăng nhập</h1>
                <div className="login__input--item">
                    <label htmlFor="" className="login__input--text">
                        Nhập tài khoản
                    </label>
                    <input
                        type="text"
                        value={username}
                        name="username"
                        className="login__input--input"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="login__input--item">
                    <label htmlFor="" className="login__input--text">
                        Nhập mật khẩu
                    </label>
                    <input
                        ref={inputRef}
                        type="password"
                        name="password"
                        className="login__input--input"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="login__input--item remember">
                    <label htmlFor="" className="login__input--text">
                        Nhớ mật khẩu
                    </label>
                    <input type="checkbox" className="login__input--remember" />
                </div>
                <div className="login__input--item login-frm">
                    <button type="button" className="login__input--submit" onClick={handleSubmit}>
                        Đăng nhập
                    </button>
                    <ToastContainer />
                    <p className="login__input--login">
                        Chưa có tài khoản bấm
                        <NavLink to="/register" className="login__input--link">
                            Đăng kí
                        </NavLink>
                    </p>
                </div>
            </form>
        </>
    );
}

export default Login;
