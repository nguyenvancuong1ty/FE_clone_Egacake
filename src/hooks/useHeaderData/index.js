import { useState, useEffect } from 'react';
import { useFetch } from '~/hooks/useFetch';

export const useHeaderData = () => {
    const res = useFetch('get', `/v1/api/cart/${localStorage.getItem('user_id')}`);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(res);
    }, [res]);

    const numberCake = data.reduce((init, item) => {
        return init + item.quantity;
    }, 0);
    return  numberCake;
};
