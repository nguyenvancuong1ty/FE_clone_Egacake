import './Authentication.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '~/components/Header';
function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const regex =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [usernameSmall, setNameSmall] = useState('');
    const [emailSmall, setEmailSmall] = useState('');
    const [passwordSmall, setPasswordSmall] = useState('');
    const [confirmSmall, setConfirmSmall] = useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
        setNameSmall('');
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmailSmall('');
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordSmall('');
    };
    const handleChangeConfirm = (e) => {
        setConfirm(e.target.value);
        setConfirmSmall('');
    };
    useEffect(() => {
        setFormData({ username: username, password: password, email: email });
    }, [email, username, password]);
    function cases(inputValue, min, max) {
        switch (inputValue) {
            case 'username': {
                if (username) {
                    if (username.length < min) {
                        setNameSmall(`Toi thieu ${min} ki tu`);
                    } else if (username.length > max) {
                        setNameSmall(`Toi da ${max} ki tu`);
                    } else {
                        setNameSmall('');
                    }
                } else {
                    setNameSmall('Username is valid ');
                }
                break;
            }
            case 'email': {
                if (email) {
                    if (regex.test(email)) {
                        setEmailSmall('');
                    } else {
                        setEmailSmall('email not format');
                    }
                } else {
                    setEmailSmall('Email is valid');
                }
                break;
            }
            case 'password': {
                if (password) {
                    if (password.length < min) {
                        setPasswordSmall(`Password Toi thieu ${min} ki tu`);
                    } else if (password.length > max) {
                        setPasswordSmall(`Password Toi da ${max} ki tu`);
                    } else {
                        setPasswordSmall('');
                    }
                } else {
                    setPasswordSmall('Password is valid');
                }
                break;
            }
            case 'confirm': {
                if (confirm) {
                    if (confirm === password) {
                        setConfirmSmall('');
                    } else {
                        setConfirmSmall('Confirm not match password');
                    }
                } else {
                    setConfirmSmall('Confirm is valid');
                }
                break;
            }
            default:
                console.log('errr');
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        cases('username', 4, 8);
        cases('password', 5, 12);
        cases('email');
        cases('confirm');
        if (
            username.length >= 4 &&
            username.length <= 8 &&
            password.length >= 5 &&
            password.length <= 12 &&
            confirm === password &&
            regex.test(email)
        ) {
            fetch('/v1/api/users', {
                method: 'post', // or 'PUT'
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    alert('Create success! click Ok to Login');
                    navigate('/login');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            return;
        }
    };
    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <form action="/create-user" className="register" method="post">
                <div className="register__content">
                    <h1 className="register__title">Đăng ký</h1>
                    <div className="register__input--item">
                        <label htmlFor="" className="register__input--text">
                            Nhập tài khoản
                        </label>
                        <input
                            autoComplete="true"
                            type="text"
                            onChange={handleChangeName}
                            onInput={handleChangeName}
                            className="register__input--input"
                            id="username"
                            name="username"
                            value={username}
                        />
                        <p className="check-name">{usernameSmall}</p>
                    </div>
                    <div className="register__input--item">
                        <label htmlFor="" className="register__input--text">
                            Nhập mật khẩu
                        </label>
                        <input
                            autoComplete="true"
                            type="password"
                            onChange={handleChangePassword}
                            onInput={handleChangePassword}
                            value={password}
                            className="register__input--input"
                            id="password"
                            name="password"
                        />
                        <p className="check-pass">{passwordSmall}</p>
                    </div>
                    <div className="register__input--item">
                        <label htmlFor="" className="register__input--text">
                            Nhập lại mật khẩu
                        </label>
                        <input
                            autoComplete="true"
                            type="password"
                            onChange={handleChangeConfirm}
                            onInput={handleChangeConfirm}
                            value={confirm}
                            className="register__input--input"
                            id="confirm"
                            name="confirm"
                        />
                        <p className="check-confirm">{confirmSmall}</p>
                    </div>
                    <div className="register__input--item">
                        <label htmlFor="" className="register__input--text">
                            Nhập email
                        </label>
                        <input
                            autoComplete="true"
                            type="email"
                            onChange={handleChangeEmail}
                            onInput={handleChangeEmail}
                            value={email}
                            className="register__input--input"
                            id="email"
                            name="email"
                        />
                        <p className="check-email">{emailSmall}</p>
                    </div>
                    <div className="register__input--item login-frm">
                        <button type="button" onClick={handleSubmit} className="register__input--submit">
                            Đăng ký
                        </button>
                        <p className="register__input--register">
                            Đã có tài khoản bấm
                            <NavLink to="/login" className="register__input--link">
                                Đăng nhập
                            </NavLink>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Register;
