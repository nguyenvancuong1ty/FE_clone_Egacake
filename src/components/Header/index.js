import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../Cart';
function Header() {
    const navigate = useNavigate();
    const numberProduct = localStorage.getItem('number_product');
    const [isLogin, setLogin] = useState(localStorage.getItem('isLogin'));
    const [isShowCart, setShowCart] = useState(false);
    const [isShow, setShow] = useState(false);
    const notify = () => toast.success('Logout Success !', { autoClose: 1500 });
    return (
        <header>
            <div className="container">
                <div className="row header">
                    <div className="col-xl-3">
                        <img
                            src="https://theme.hstatic.net/200000460475/1000990214/14/logo.png?v=127"
                            alt=""
                            className="logo"
                        />
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
                                    <img
                                        src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/order-icon.webp"
                                        alt=""
                                        className="header__opstion--img"
                                    />
                                    <p className="header__opstion--title">Đơn hàng</p>
                                </NavLink>
                            </li>
                            <li className="shop header__opstion--item">
                                <NavLink to="/shop" className="header__opstion--link">
                                    <img
                                        src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/address-icon.webp"
                                        alt=""
                                        className="header__opstion--img"
                                    />
                                    <p className="header__opstion--title">Cửa hàng</p>
                                </NavLink>
                            </li>
                            <li className="header__opstion--item account">
                                {isLogin === 'true' ? (
                                    <>
                                        <div
                                            className="header__opstion--link"
                                            onClick={() => {
                                                setShow(true);
                                            }}
                                        >
                                            <img
                                                src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/account-icon.webp"
                                                alt=""
                                                className="header__opstion--img"
                                            />
                                            <p className="header__opstion--title">Logout</p>
                                        </div>

                                        <div className={isShow ? 'overlay show' : 'overlay'}>
                                            <div className="modals">
                                                <b>Bạn có muốn đăng xuất không</b>
                                                <div className="btn">
                                                    <button
                                                        className="btn_modal"
                                                        onClick={() => {
                                                            setShow(false);
                                                        }}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="btn_modal"
                                                        onClick={() => {
                                                            setShow(false);
                                                            localStorage.clear();
                                                            localStorage.setItem('number_product', 0);
                                                            setLogin(false);
                                                            notify();
                                                            setTimeout(() => {
                                                                navigate('/');
                                                            }, 1500);
                                                        }}
                                                    >
                                                        Ok
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <NavLink to="/login" className="header__opstion--link">
                                        <img
                                            src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/account-icon.webp"
                                            alt=""
                                            className="header__opstion--img"
                                        />
                                        <p className="header__opstion--title">Login</p>
                                    </NavLink>
                                )}
                            </li>
                            <li
                                className="header__opstion--item product__show"
                                onClick={(e) => {
                                    setShowCart(true);
                                }}
                                onMouseLeave={() => {
                                    setShowCart(false);
                                }}
                            >
                                <div to="/cart" className="header__opstion--link">
                                    <img
                                        src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/cart-icon.webp"
                                        alt=""
                                        className="header__opstion--img"
                                    />
                                    <p className="header__opstion--title">Giỏ hàng</p>
                                    <div className="number__product">
                                        <span className="number">{numberProduct}</span>
                                    </div>
                                </div>
                                {isShowCart && <Cart />}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container__head">
                    <ul className="grid wide container__head--navbar">
                        <li className="head__navbar--item">
                            <NavLink to="/" exact="true" className="home head__navbar--link">
                                <b>Trang chủ</b>
                            </NavLink>
                        </li>
                        <li className="head__navbar--item" id="intro">
                            <NavLink to="/intro" className="head__navbar--link">
                                <b>Giới thiệu</b>
                            </NavLink>
                        </li>
                        <li className="head__navbar--item">
                            <NavLink to="/cakes" className="head__navbar--link">
                                <b>Cửa hàng bánh</b>
                            </NavLink>
                        </li>
                        <li className="head__navbar--item">
                            <NavLink to="/sale" className="head__navbar--link">
                                <b> Chương trình khuyến mại </b>
                            </NavLink>
                        </li>
                        <li className="head__navbar--item">
                            <NavLink to="/recipe" className="head__navbar--link">
                                <b>Công thức làm bánh</b>
                            </NavLink>
                        </li>
                        <li className="head__navbar--item">
                            <NavLink to="/news" className="head__navbar--link">
                                <b>Tin tức</b>
                            </NavLink>
                        </li>
                        <li className="head__navbar--item">
                            <NavLink to="/contact" className="head__navbar--link">
                                <b>Liên hệ</b>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </header>
    );
}

export default Header;
