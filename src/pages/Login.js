import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Authentication.scss';
import axios from 'axios';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = () => {
        axios({
            method: 'post',
            url: '/v1/api/login',
            data: {
                username: username,
                password: password,
            },
        }).then((res) => {
            if (res.data.statusCode) {
                alert('login OK');
                navigate('/');
            } else {
                alert('Invalid Username or Password');
            }
        });
    };
    console.log(username, password);
    return (
        <>
            <div className="mt-120"></div>
            <form className="login">
                <h1 className="login__title">
                    Đăng nhập
                    <span className="cancel">X</span>
                </h1>
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
