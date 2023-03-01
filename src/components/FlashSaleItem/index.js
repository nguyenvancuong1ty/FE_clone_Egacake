import { NavLink } from 'react-router-dom';

function FlashSaleItem({ item, col }) {
    return (
        <NavLink to={`/detail/${item.id}`} className={`rows col-xl-${col}`}>
            <div className="flashsale__content--item">
                <img src={item.images} alt="" className="flashsale__content--img" />
                <p className="flashsale__content--name">{item.nameCake}</p>
                <p className="flashsale__content--price">
                    {(item.price - (item.price * item.sale) / 100).toLocaleString('en-US')}đ
                </p>
                <p className="initial_price">
                    {item.sale > 0 && (
                        <>
                            <span className="product__content--price">{item.price}đ</span>
                            <span> -{item.sale}%</span>
                        </>
                    )}
                </p>
                <i className="sale--search fa-solid fa-magnifying-glass"></i>
                <div className="flashsale__content--icon">
                    <i className="fa-sharp fa-solid fa-bag-shopping"></i>
                </div>
                <div className="flashsale__content--bought">
                    <div className="bought">
                        <img
                            src="https://nguyenvancuong1ty.github.io/intern_cake/img/fire-icon.svg"
                            alt=""
                            className="bought--img"
                        />
                        <span className="bought__text">Đã bán</span>
                        <span className="bought__quantity"> {item.sold} </span>
                        <span className="bought__text">Sản phẩm</span>
                    </div>

                    <div
                        className="bought__up"
                        style={{
                            width: `${(item.sold / (item.inventory + item.sold)) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
        </NavLink>
    );
}

export default FlashSaleItem;
