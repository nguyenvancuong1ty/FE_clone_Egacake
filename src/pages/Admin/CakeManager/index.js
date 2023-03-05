import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';

function CakeManager() {
    const res = useFetch('get', 'v1/api/cakedetail');
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setData(res);

            setLoading(false);
        }, 500);
    }, [res]);
    const handleDelete = (id) => {
        axios
            .delete('http://18.143.149.62:3000/v1/api/cakedetail', {
                data: { id: id },
            })
            .then((res) => {
                setData(data.filter((item) => item.id !== id));
            })
            .then((e) => console.log('error', e));
    };
    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <div className="container">
                <table className="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">CategoryCake</th>
                            <th scope="col">NameCake</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Inventory</th>
                            <th scope="col">Image</th>
                            <th scope="col">Sale</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Time Sale</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                    {isloading && <Loading colspan={10}/>}
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.categoryCake}</td>
                                        <td>{item.nameCake}</td>
                                        <td>{item.price}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.inventory}</td>
                                        <td>
                                            <img alt="" src={item.images} style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>{item.sale}%</td>
                                        <td>{item.detail.slice(0, 30)}...</td>
                                        <td>{item.timeSale}</td>
                                        <td
                                            id={item.id}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                handleDelete(item.id);
                                            }}
                                        >
                                            X
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CakeManager;
