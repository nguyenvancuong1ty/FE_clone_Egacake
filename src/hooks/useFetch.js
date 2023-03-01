import { useEffect, useState } from 'react';
import axios from 'axios';
import './Loading.scss';
export const useFetch = (method, url, options) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: method,
                url: url,
                data: options,
            }).then((res) => {
                setData(res.data.data);
            });
        };
        fetchData();
    }, [url, method]);

    // nếu quá trình lấy dữ liệu chưa hoàn tất, trả về một giá trị rỗng hoặc một thông báo loading
    // nếu quá trình lấy dữ liệu đã hoàn tất, trả về dữ liệu
    return data;
};
