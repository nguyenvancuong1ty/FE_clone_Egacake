

function Voucher({ item, click }) {
    return (
        <div className="code__item col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="code__item--content">
                <b className="code__item--title">NHẬP MÃ: {item.code}</b>
                <p className="code__item--description">
                    {item.detail.slice(0, 50)} {item.detail.length > 50 ? '...' : ''}
                </p>
                <div className="code__item--continue">
                    <button className="code__item--btn">sao chép</button>
                    <b className="code__item--link" onClick={() => click(item.id)}>
                        Điều kiện
                    </b>
                </div>
            </div>
        </div>
    );
}

export default Voucher;
