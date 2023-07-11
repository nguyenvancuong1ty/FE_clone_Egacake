import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
function Voucher({ item, click }) {
    const text= item.code;
    const handleCopyClick = () => {
        navigator.clipboard && navigator.clipboard.writeText(text);
        copySuccess();
      };
    const copySuccess = () => {
        toast.success("Copy", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };
    return (
        <div className="code__item col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="code__item--content">
                <b className="code__item--title">NHẬP MÃ: {item.code}</b>
                <p className="code__item--description">
                    {item.detail.slice(0, 50)} {item.detail.length > 50 ? '...' : ''}
                </p>
                <div className="code__item--continue">
                    <button className="code__item--btn" onClick={() => {handleCopyClick()}}>sao chép</button>
                    <b className="code__item--link" onClick={() => click(item.id)}>
                        Điều kiện
                    </b>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Voucher;
