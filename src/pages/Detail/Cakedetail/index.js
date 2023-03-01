import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '~/components/Header';
import { useFetch } from '~/hooks/useFetch';
import './index.scss';
function CakeDetail() {
    const cakedetail = useFetch('get', '/v1/api/cakedetail');
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (cakedetail && cakedetail.length > 0) {
            let newData = cakedetail.find((item) => {
                return item.id == id;
            });
            setData(newData);
        }
    }, [cakedetail]);

    return (
        <>
        <Header />
            <div className="mt-120"></div>
            <section className="product-details">
                <div className="container">
                    <div className="product-image">
                        <img src={data.images} alt="Product Image" />
                    </div>
                    <div className="product-info">
                        <h1 className="product-title">{data.nameCake}</h1>
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
                        <div className="product-description">
                            <h2 className="product-section-title">Thông tin chi tiết</h2>
                            <p className="product-text">{data.detail}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CakeDetail;
