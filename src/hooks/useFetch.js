import { useEffect, useState } from 'react';
import axios from 'axios';
import './Loading.scss';
export const useFetch = (method, url, options) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            await axios({
                method: method,
                url: `https://cakebyme.shop:3000/${url}`,
                data: options,
            })
                .then((res) => {
                    setData(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log('error');
                    setLoading(false);
                });
            };
            fetchData();
    }, [url, method,options]);

    // nếu quá trình lấy dữ liệu chưa hoàn tất, trả về một giá trị rỗng hoặc một thông báo loading
    // nếu quá trình lấy dữ liệu đã hoàn tất, trả về dữ liệu
    return data;
};
