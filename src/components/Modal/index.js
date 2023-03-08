function Modal(props) {
    return ( 
        <div className={props.isShow ? 'overlay show' : 'overlay'}>
            <div className="modals">
                <b>Xóa {props.type} này</b>
                <div className="btn">
                    <button
                        className="btn_modal"
                        onClick= {props.clickShow}
                    >
                        Close
                    </button>
                    <button
                        className="btn_modal"
                        onClick={props.clickOk}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div> );
}

export default Modal;