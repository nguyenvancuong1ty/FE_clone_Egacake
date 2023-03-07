import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate ,useParams } from 'react-router-dom';
import Header from '~/components/Header';
import { useFetch } from '~/hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
function CakeDetail() {
    const cakedetail = useFetch('get', 'v1/api/cakedetail');
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isBought, setIsBought] = useState(false);
    const navigate = useNavigate();
    const dataCart = useFetch('get', `v1/api/cake_by_cart/${localStorage.getItem('user_id')}`);

    useEffect(() => {
        let num =
            dataCart &&
            dataCart.length > 0 &&
            dataCart.find((item) => {
                return item.cakeId === data.id;
            });
        if (num) {
            setIsBought(true);
        } else {
            setIsBought(false);
        }
    }, [dataCart, data.id]);

    useEffect(() => {
        if (cakedetail && cakedetail.length > 0) {
            let newData = cakedetail.find((item) => {
                return item.id === Number(id);
            });
            setData(newData);
        }
    }, [cakedetail, id]);

    const handleAddProduct = () => {
        if(!localStorage.getItem('isLogin')) {
            toast.warning('Thất bại! Bạn chưa đăng nhập !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
        else if (isBought) {
            toast.warning('Thất bại! Mặt hàng này đã hết hoặc đã có trong giỏ !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
        else if (!isBought){
            setIsBought(true);
            axios
                .post('https://18.143.149.62:3000/v1/api/cake_by_cart', {
                    userId: localStorage.getItem('user_id'),
                    cakeId: data.id,
                })
                .then((res) => {
                    toast.success('Đã thêm mặt hàng này !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    setTimeout(() => {
                        navigate('/cakes');
                    }, 2000);
                });
        }
    };
    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <section className="product-details">
                <div className="container">
                    <div className="product-image">
                        <img src={data.images} alt="" />
                    </div>
                    <div className="product-info">
                        <>
                            <h1 className="product-title">{data.nameCake}</h1>
                        </>
                        <div className="product-stats">
                            <div className="product-price">
                                <span className="product-label">Giá:</span>
                                <span className="product-value">{data.price}VNĐ</span>
                            </div>
                            <div className="product-sold">
                                <span className="product-label">Đã bán:</span>
                                <span className="product-value">{data.sold} sản phẩm</span>
                            </div>
                            <div className="product-stock">
                                <span className="product-label">Số lượng tồn:</span>
                                <span className="product-value">{data.inventory} sản phẩm</span>
                            </div>
                        </div>
                        <button
                            className={'btn_buy'}
                            onClick={() => {
                                handleAddProduct();
                            }}
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <div className="product-description">
                        <h2 className="product-section-title">Mô tả</h2>
                            <p className="product-text">{data.detail}</p>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default CakeDetail;
