import FlashSaleItem from '~/components/FlashSaleItem';
import Header from '~/components/Header';
import Voucher from '~/components/Voucher';
import { useFetch } from '~/hooks/useFetch';
import { useState } from "react";
import './Sale.scss';

function Sales() {
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const voucher = useFetch('get', 'v1/api/voucher');
    const cakeDetail = useFetch('get', 'v1/api/cakedetail');
    const [isShow, setShow] = useState(false);
    const selectedVoucher = voucher.find(v => v.id === selectedVoucherId);
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
                                    return <Voucher item={item} key={index} click = {(id) => { setSelectedVoucherId(id); setShow(true)}} />;
                                })}
                        </div>
                    </div>
                </div>
                <div className="wrap">
                    <b className="product">Các sản phẩm đang Giảm giá</b>
                    <div className="cake_sale" width="100%">
                        {cakeDetail.map((item, index) => {
                            return item.sale > 0 && <FlashSaleItem item={item} key={index} col={2} />;
                        })}
                    </div>
                </div>
            </div>
            <div className={isShow ? 'overlay show' : 'overlay'} onClick={() => setShow(false)}>
                    <div className="frm_add" onClick={(e) => e.stopPropagation()}>
                    <div className="card">
                        {selectedVoucher && <>
                            <div className="card-header">{selectedVoucher.code}</div>
                            <div className="card-body">
                            <h5 className="card-title">{selectedVoucher.detail}</h5>
                            <p className="card-text">{selectedVoucher.requirement}</p>            
                            </div>
                            </>
                        }
                        </div> 
                    </div>
                </div>
        </>
    );
}

export default Sales;
