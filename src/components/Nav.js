import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: '/v1/api/cakes',
        }).then((res) => setData(res.data.data));
    }, []);
    return (
        <div className="body__left-content">
            <div className="body__left--head">
                <i className="fa-solid fa-bars"></i>
                <h3 className="body__left--title">DANH MỤC SẢN PHẨM</h3>
            </div>
            <ul className="body__left--product">
                <li className="body__product--item">
                    <img
                        src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/1.webp"
                        alt=""
                        className="body__product--img"
                    />
                    <NavLink to="/sale" className="body__product--link">
                        Tổng hợp khuyến mãi
                    </NavLink>
                </li>

                {data &&
                    data.map((item) => {
                        return (
                            <li className="body__product--item" key={item.categoryCake}>
                                <img src={item.iconLink || './img/loading.jpg'} alt="" className="body__product--img" />
                                <NavLink to={`/cakes/${item.categoryCake}`} className="body__product--link">
                                    {item.nameCategory}
                                </NavLink>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default Nav;
