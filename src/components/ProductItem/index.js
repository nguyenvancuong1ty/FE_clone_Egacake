import { NavLink } from "react-router-dom";
function ProductItem({ item, index }) {
    return (
        <NavLink to= {`/detail/${item.id}`} className="product__content--item col-xl-3" key={index}>
            <img src="./img/frame_1.webp" alt="" className="product__content--img" />
            <div className="product__content--text">
                <p className="product__content--name">{item.nameCake}</p>
                <p className="product__content--sale--price">
                    {(item.price - (item.price * item.sale) / 100).toLocaleString('en-US')}đ
                </p>
                <span className="product__content--price">{item.price}đ</span>
                <span> -{item.sale}%</span>

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
                    ></div>{' '}
                </div>
            </div>

            <img src={item.images} alt="" className="product__content--img--foreign" />
        </NavLink>
    );
}

export default ProductItem;
