import { useState } from 'react';
import Slider from 'react-slick';
import Nav from '~/components/Nav';
import Voucher from '~/components/Voucher';
import FlashSaleItem from '~/components/FlashSaleItem';
import { collections } from '~/data';
import { useFetch } from '~/hooks/useFetch';
import './Home.scss';
import ProductItem from '~/components/ProductItem';
import { NavLink } from 'react-router-dom';
import BlogItem from '~/components/BlogItem';
import Header from '~/components/Header';
import { useHeaderData } from '~/hooks/useHeaderData';
function Home() {
    localStorage.setItem('number_product', useHeaderData());
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        dot: true,
        slidesToScroll: 1,
    };

    const newProduct = useFetch('get', 'v1/api/newproduct');
    const voucher = useFetch('get', 'v1/api/voucher');
    const cakeDetail = useFetch('get', 'v1/api/cakedetail');
    const news = useFetch('get', 'v1/api/news');
    const cakeRecipe = useFetch('get', 'v1/api/recipe');
    let numberic = 0;
    const [itemNum, setItemNum] = useState(6);
    const [isShowAll, setIsShowAll] = useState(false);
    const [typeCake, setTypeCake] = useState(7);
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <div className="container df">
                <div className="body__left">
                    <Nav></Nav>
                </div>
                <div className="body__right">
                    <div className="body__right--head--img">
                        <Slider {...settings}>
                            {Array.isArray(newProduct) &&
                                newProduct.map((item, index) => {
                                    return (
                                        <div className="body__right--img" key={index}>
                                            <img src={item.Image} alt="" />
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                    <div className="body__right--code">
                        <div className="code__list">
                            <div className="code">
                                {Array.isArray(voucher) &&
                                    voucher.map((item, index) => {
                                        return index < 4 && <Voucher item={item} key={index} />;
                                    })}
                            </div>
                            <NavLink to={'/sale'} className="product__content--submit">
                                Xem tất cả
                                <i className="fa-sharp fa-solid fa-chevron-right"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="body__right--flashsale">
                        <div className="flashsale__header">
                            <div className="flashsale__header--left">
                                <h3 className="flashsale__header-title"> MÙA YÊU, DEAL NGỌT</h3>
                                <img
                                    src="https://nguyenvancuong1ty.github.io/intern_cake/img/sale.webp"
                                    alt=""
                                    className="flashsale__header--img"
                                />
                                <p className="flashsale__header--text">
                                    <span behavior="" direction="">
                                        <a href="/" className="flashsale__header--link">
                                            Giảm 30K cho đờ hàng từ 399K
                                        </a>
                                        <a href="/" className="flashsale__header--link">
                                            Giảm 8% cho đờ hàng từ 499K
                                        </a>
                                        <a href="/" className="flashsale__header--link">
                                            Giảm 10% cho đờ hàng từ 800K
                                        </a>
                                    </span>
                                </p>
                            </div>
                            <div className="flashsale__header--right">
                                <div className="flashsale__countdown">
                                    <span className="flashsale__countdown--title">Kết thúc sau</span>
                                    <div className="flashsale__countdown--item">
                                        <span className="hours"> 8</span> <br /> <span>Giờ</span>{' '}
                                    </div>
                                    :
                                    <div className="flashsale__countdown--item">
                                        <span className="minute"> 59</span> <br /> <span>Phút</span>{' '}
                                    </div>
                                    :
                                    <div className="flashsale__countdown--item">
                                        <span className="second"> 59</span> <br /> <span>Giây</span>{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flashsale__content">
                            <div className="grids">
                                {Array.isArray(cakeDetail) &&
                                    cakeDetail.map((item, index) => {
                                        return index < 8 && <FlashSaleItem item={item} key={index} />;
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className="body__collections">
                        {collections.map((item) => {
                            return (
                                <div className="body__collections--item" key={item.id}>
                                    <img src={item.image} alt="" className="body__collections--img" />
                                    <p className="body__collections--des">{item.name}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="body__right--product">
                        <div className="product__title">
                            <img src="./img/product.webp" alt="" className="product__title--icon" />
                            <h1 className="product__title--text">QUÀ VALENTINE</h1>
                        </div>
                        <div className="product__content">
                            <ul className="product__content--group">
                                <li className="product__content--item">
                                    <img src="./img/product1.webp" alt="" className="product__content--img" />
                                </li>
                                {Array.isArray(cakeDetail) &&
                                    cakeDetail.map((item, index) => {
                                        if (item.sale > 0) {
                                            numberic++;
                                        }
                                        return (
                                            item.sale > 0 &&
                                            numberic <= itemNum && <ProductItem item={item} key={index} />
                                        );
                                    })}
                            </ul>
                            <div className="test"></div>
                            {isShowAll && (
                                <button
                                    className="product__content--submit"
                                    onClick={() => {
                                        setItemNum(6);
                                        setIsShowAll(!isShowAll);
                                    }}
                                >
                                    Ẩn bớt
                                    <i className="fa-sharp fa-solid fa-chevron-right"></i>
                                </button>
                            )}
                            {isShowAll || (
                                <button
                                    className="product__content--submit"
                                    onClick={() => {
                                        setIsShowAll(!isShowAll);
                                        setItemNum(cakeDetail.length);
                                    }}
                                >
                                    Xem tất cả
                                    <i className="fa-sharp fa-solid fa-chevron-right"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="body__right--banner">
                        <img src="./img/banner.webp" alt="" id="banner--img" className="banner--imgs" />
                    </div>
                    <div className="body__right--cake">
                        <div className="cake__title">
                            <div className="cake__title--left">
                                <img src="./img/product2-icon.webp" alt="" className="cake__title--icon" />
                                <h1 className="cake__title--text">BÁNH NGỌT</h1>
                            </div>
                            <div className="cake__title--right">
                                <span
                                    className={
                                        activeIndex === 0
                                            ? 'cake__title--connect type__cake--active'
                                            : 'cake__title--connect'
                                    }
                                    onClick={() => {
                                        setTypeCake(7);
                                        setActiveIndex(0);
                                    }}
                                >
                                    Cupcakes
                                </span>
                                <span
                                    className={
                                        activeIndex === 1
                                            ? 'cake__title--connect type__cake--active'
                                            : 'cake__title--connect'
                                    }
                                    onClick={() => {
                                        setTypeCake(2);
                                        setActiveIndex(1);
                                    }}
                                >
                                    Wedding cakes
                                </span>
                                <span
                                    className={
                                        activeIndex === 2
                                            ? 'cake__title--connect type__cake--active'
                                            : 'cake__title--connect'
                                    }
                                    onClick={() => {
                                        setTypeCake(4);
                                        setActiveIndex(2);
                                    }}
                                >
                                    Holiday cakes
                                </span>
                            </div>
                        </div>
                        <div className="cake__content">
                            {Array.isArray(cakeDetail) &&
                                cakeDetail.map((item, index) => {
                                    return item.categoryCake === typeCake && <FlashSaleItem item={item} key={index} />;
                                })}
                        </div>
                        <button href="/" className="cake__content--submit">
                            Xem tất cả
                            <i className="fa-sharp fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                    <div className="body__right--banner">
                        <img src="./img/banner1.webp" alt="" className="banner--img" />
                        <img src="./img/banner2.webp" alt="" className="banner--img" />
                        <img src="./img/banner3.webp" alt="" className="banner--img" />
                    </div>
                    <div className="body__right--polices">
                        <div className="policies--items">
                            <img src="./img/polices1.webp" alt="" className="policies--img" />
                            <span className="policies--text">Giao hàng đúng giờ</span>
                        </div>
                        <div className="policies--items">
                            <img src="./img/polices2.webp" alt="" className="policies--img" />
                            <span className="policies--text">Ưu đãi mỗi ngày</span>
                        </div>
                        <div className="policies--items">
                            <img src="./img/polices3.webp" alt="" className="policies--img" />
                            <span className="policies--text">Đổi trả trong vòng 7 ngày</span>
                        </div>
                    </div>
                    <div className="body__right--blog">
                        <div className="blog__body">
                            <div className="blog__news">
                                <div className="blog__news--title">
                                    <a href="/" className="blog__news--link">
                                        <img src="./img/tintuc.webp" alt="" className="blog__news--img" />
                                        <span className="blog__news--text">TIN TỨC</span>
                                    </a>
                                </div>
                                <div className="blog__news--content">
                                    <div className="grid">
                                        {Array.isArray(news) &&
                                            news.map((item, index) => {
                                                return (
                                                    index <= 1 && <BlogItem item={item} key={index} textLimit={50} />
                                                );
                                            })}

                                        <button className="blog__content--submit">
                                            Xem tất cả
                                            <i className="fa-sharp fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="blog__news">
                                <div className="blog__news--title">
                                    <a href="/" className="blog__news--link">
                                        <img src="./img/conthuc.webp" alt="" className="blog__news--img" />
                                        <span className="blog__news--text">CÔNG THỨC LÀM BÁNH</span>
                                    </a>
                                </div>
                                <div className="blog__news--content">
                                    {Array.isArray(cakeRecipe) &&
                                        cakeRecipe.map((item, index) => {
                                            return index <= 1 && <BlogItem item={item} key={index} textLimit={50} />;
                                        })}

                                    <a href="/" className="blog__content--submit">
                                        Xem tất cả
                                        <i className="fa-sharp fa-solid fa-chevron-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
