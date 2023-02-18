import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import router from './routers';
const hihi = '';
function App() {
    return (
        <Router>
            {/* <div className="topnav"> */}
            {/* <NavLink to="/" exact={true}>
                    Home
                </NavLink>
                <NavLink to="/intro">Intro</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/login"></NavLink> */}
            <header>
                <div className="container">
                    <div className="row header">
                        <div className="col-xl-3">
                            <img src="/img/logo.webp" alt="" className="logo" />
                        </div>
                        <div className="col-xl-5">
                            <div className="header-input">
                                <input type="text" placeholder="Ban can gi?" />
                                <div className="header__input--icon">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <ul className="header__opstion">
                                <li className="order header__opstion--item">
                                    <NavLink to="intro" className="header__opstion--link">
                                        <img src="./img/order-icon.webp" alt="" className="header__opstion--img" />
                                        <p className="header__opstion--title">Đơn hàng</p>
                                    </NavLink>
                                </li>
                                <li className="shop header__opstion--item">
                                    <NavLink to="/shop" className="header__opstion--link">
                                        <img src="./img/address-icon.webp" alt="" className="header__opstion--img" />
                                        <p className="header__opstion--title">Cửa hàng</p>
                                    </NavLink>
                                </li>
                                <li className="header__opstion--item account">
                                    <NavLink to="/login" className="header__opstion--link">
                                        <img src="./img/account-icon.webp" alt="" className="header__opstion--img" />
                                        <p className="header__opstion--title">{hihi || 'Tài khoản'}</p>
                                    </NavLink>
                                </li>
                                <li className="header__opstion--item product__show">
                                    <NavLink to="/cart" className="header__opstion--link">
                                        <img src="./img/cart-icon.webp" alt="" className="header__opstion--img" />
                                        <p className="header__opstion--title">Giỏ hàng</p>
                                        <div className="number__product">
                                            <span className="number">0</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container__head">
                        <ul className="grid wide container__head--navbar">
                            <li className="head__navbar--item">
                                <NavLink to="/" exact= 'true' className="home head__navbar--link">
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li className="head__navbar--item" id="intro">
                                <NavLink to="/a" className="head__navbar--link">
                                    Giới thiệu
                                </NavLink>
                            </li>
                            <li className="head__navbar--item">
                                <NavLink to="/b" className="head__navbar--link">
                                    Cửa hàng bánh
                                </NavLink>
                            </li>
                            <li className="head__navbar--item">
                                <NavLink to="/c" className="head__navbar--link">
                                    <span> Chương trình khuyến mại </span>
                                </NavLink>
                            </li>
                            <li className="head__navbar--item">
                                <NavLink to="/d" className="head__navbar--link">
                                    Công thức làm bánh
                                </NavLink>
                            </li>
                            <li className="head__navbar--item">
                                <NavLink to="/e" className="head__navbar--link">
                                    Tin tức
                                </NavLink>
                            </li>
                            <li className="head__navbar--item">
                                <NavLink to="/f" className="head__navbar--link">
                                    Liên hệ
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <Routes>
                {router.map((item) => {
                    return <Route path={item.path} element={item.component}></Route>;
                })}
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
