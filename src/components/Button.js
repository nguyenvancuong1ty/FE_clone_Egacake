function Button(props) {
    return (
        <button className={`button-component ${props.class}`} onClick={props.click} type = {props.type}>
            {props.value}
        </button>
    );
}

export default Button;
