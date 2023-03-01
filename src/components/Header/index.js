import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from '../Cart';
function Header() {
    const numberProduct = localStorage.getItem('number_product');
    const [isLogin, setLogin] = useState(false);
    useEffect(() => {
        localStorage.getItem('isLogin') && setLogin(true);
    }, []);
    return (
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
                                {isLogin ? (
                                    <div
                                        className="header__opstion--link"
                                        onClick={() => {
                                            localStorage.clear();
                                            localStorage.setItem('number_product',0);
                                            setLogin(false);
                                        }}
                                    >
                                        <img
                                            src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/account-icon.webp"
                                            alt=""
                                            className="header__opstion--img"
                                        />
                                        <p className="header__opstion--title">Logout</p>
                                    </div>
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
                            <li className="header__opstion--item product__show">
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
                                <Cart />
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
        </header>
    );
}

export default Header;
