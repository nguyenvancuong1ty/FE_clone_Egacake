import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFetch } from '~/hooks/useFetch';
import Button from '../Button';
function Cart(props) {   
    const userId = localStorage.getItem('user_id');
    const [numberProduct, setNum] = useState(localStorage.getItem('number_product'));
    const url = `v1/api/cake_by_cart/${userId}`;
    const res = useFetch('get', url);
    const [data, setData] = useState([]);
    const [isShow, setShow] = useState(false);
    const [idCakeDetele, setIdCakeDetele] = useState(0);

    useEffect(() => {
        setData(res);
    }, [res]);

    const handleQuantityChange = (item, newQuantity) => {
        const cakeId = item.cakeId;
        axios.put('https://cakebyme.shop:3000/v1/api/cake_by_cart', { userId, cakeId, quantity: newQuantity }).then((res) => {
            const newData = data.map((cake) => {
                if (cake.cakeId === cakeId) {
                    cake.total_quantity = newQuantity;
                }
                return cake;
            });
            setData(newData);
        });
    };

    const handleIncrease = (item) => {
        const newQuantity = Number(item.total_quantity) + 1;
        props.onCountChange(numberProduct*1 + 1);
        localStorage.setItem("number_product",numberProduct*1+1)
        setNum(prev =>prev*1+1)
        handleQuantityChange(item, newQuantity);
        console.log(props.prevQuantity);
    };

    const handleDecrease = (item) => {
        setIdCakeDetele(item.cakeId);
        const newQuantity = item.total_quantity - 1;
        if (newQuantity < 1) {
            // Remove item from cart if quantity is zero
            setShow(true);
        } else {
            handleQuantityChange(item, newQuantity);
            props.onCountChange(numberProduct - 1);
            localStorage.setItem("number_product",numberProduct-1)
            setNum(prev =>prev - 1)
        }

    };

    const handleDelete = (item) => {
        setShow(true);
        setIdCakeDetele(item.cakeId);
        setNum(prev => prev*1+1 - item.total_quantity);
        localStorage.setItem("number_product",localStorage.getItem("number_product") - item.total_quantity);
    }

    let total = data.reduce((init, item) => {
        return init + (item.price - (item.price * item.sale) / 100) * item.total_quantity;
    }, 0);


    return (
        <>
            <div className="wrap_cart">
            {data && data.length > 0 && (
                    <>
                        {data.map((item, index) => (
                            <div className="item" key={index}>
                                <img src={item.images} alt="" />
                                <div className="content">
                                    <b>{item.nameCake}</b>
                                    <div>
                                        <h1>
                                            Giá: {(item.price - (item.price * item.sale) / 100).toLocaleString('en-US')}
                                        </h1>

                                        <span onClick={() => handleDecrease(item)}>-</span>
                                        <b>{item.total_quantity}</b>
                                        <span onClick={() => handleIncrease(item)}>+</span>
                                    </div>
                                </div>
                                    <Button value = 'X' class = "delete" click = {() => handleDelete(item)}></Button>
                            </div>
                        ))}

                        <footer>
                            <b className="total_price">
                                Tổng tiền tạm tính: <b>{total.toLocaleString('en-US')}đ</b>
                            </b>
                            <button>Tiến hành thanh toán</button>
                        </footer>

                        {isShow && (
                            <div className={isShow ? 'overlay show' : 'overlay'}>
                                <div className="modals">
                                    <b>Xóa sản phẩm này khỏi giỏ hàng của bạn</b>
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
                                                axios
                                                    .delete('https://cakebyme.shop:3000/v1/api/cake_by_cart', {
                                                        data: { userId: userId, cakeId: idCakeDetele },
                                                    })
                                                    .then((res) => {
                                                        const newData = data.filter(
                                                            (cake) => cake.cakeId !== idCakeDetele,
                                                        );
                                                        setData(newData);                     
                                                        localStorage.setItem("number_product",numberProduct-1)
                                                        setNum(prev =>prev - 1);
                                                        props.onCountChange(numberProduct - 1);
                                                    });
                                                setShow(false);
                                            }}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Cart;
