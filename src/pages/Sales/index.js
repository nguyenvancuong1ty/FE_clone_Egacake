import FlashSaleItem from '~/components/FlashSaleItem';
import Header from '~/components/Header';
import Voucher from '~/components/Voucher';
import { useFetch } from '~/hooks/useFetch';
import './Sale.scss';
function Sales() {
    const voucher = useFetch('get', 'v1/api/voucher');
    const caekDetail = useFetch('get', 'v1/api/cakedetail');
    return (
        <>
        <Header/>
            <div className="mt-120"></div>
            <div className="container">
                <div className="body__right--code">
                    <div className="code__list">
                        <b>Voucher giam gia hap dan</b>
                        <div className="code">
                            {Array.isArray(voucher) &&
                                voucher.map((item, index) => {
                                    return <Voucher item={item} key={index} />;
                                })}
                        </div>
                    </div>
                </div>
                <div className="wrap">
                    <b className="product">Các sản phẩm đang Giảm giá</b>
                    <div className="cake_sale" width="100%">
                        {caekDetail.map((item, index) => {
                            return item.sale > 0 && <FlashSaleItem item={item} key={index} col={2} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sales;
