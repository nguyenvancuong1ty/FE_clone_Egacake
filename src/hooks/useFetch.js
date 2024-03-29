import { useEffect, useState } from 'react';
import axios from 'axios';
import './Loading.scss';
export const useFetch = (method, url, options) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: method,
                url: `${process.env.REACT_APP_URL}${url}`,
                data: options,
            })
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log('error');
                });
        };
        fetchData();
    }, [url, method, options]);

    // nếu quá trình lấy dữ liệu chưa hoàn tất, trả về một giá trị rỗng hoặc một thông báo loading
    // nếu quá trình lấy dữ liệu đã hoàn tất, trả về dữ liệu
    return data;
};
