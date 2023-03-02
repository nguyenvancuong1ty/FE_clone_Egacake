import { useEffect, useState } from 'react';
import { useFetch } from '~/hooks/useFetch';
function Cart() {
    let url = `v1/api/cake_by_cart/${localStorage.getItem('user_id')}`;
    const res = useFetch('get', url);
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(res);
    }, [res, data]);

    let total = data.reduce((init, item) => {
        return init + (item.price - (item.price * item.sale) / 100) * item.total_quantity;
    }, 0);
    return (
        <>
            <div className="wrap_cart">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <img src={item.images} alt="" />
                                <div className="content">
                                    <b>{item.nameCake}</b>
                                    <h1>
                                        Giá: {(item.price - (item.price * item.sale) / 100).toLocaleString('en-US')} x{' '}
                                        <b>{item.total_quantity}</b>
                                    </h1>
                                </div>
                            </div>
                        );
                    })}
                <footer>
                    <b className="total_price">
                        Tổng tiền tạm tính: <b>{total.toLocaleString('en-US')}đ</b>
                    </b>
                    <button>Tiến hành thanh toán</button>
                </footer>
            </div>
        </>
    );
}

export default Cart;
