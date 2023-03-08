import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import { useFetch } from '~/hooks/useFetch';
import { useHeaderData } from '~/hooks/useHeaderData';
function UsersManager() {
    localStorage.setItem('number_product', useHeaderData());
    const res = useFetch('get', 'v1/api/users');
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);
    const [isShow, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setData(res);
            setLoading(false);
        }, 500);
    }, [res]);
    const handleDelete = (userId) => {
        axios
            .delete('https://cakebyme.shop:3000/v1/api/users', {
                data: { id: userId },
            })
            .then((response) => {
                setData(data.filter((user) => user.id !== userId));
            })
            .catch((error) => {
                console.log(error);
            });
        setShow(false);
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
                            <th scope="col">User Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">authorization</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isloading && <Loading colspan={5} />}
                        {data &&
                            data.map((item, index) => {
                                return (
                                    item.authorization !== 1 && (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.userName}</td>
                                            <td>{item.password}</td>
                                            <td>{item.authorization ? 'Admin' : 'User'}</td>
                                            <td>
                                                <Button
                                                    click={() => {
                                                        setShow(true)
                                                        setIdDelete(item.id);
                                                    }}
                                                    value = 'Xóa'
                                                 />
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                    </tbody>
                </table>
                { isShow && <Modal isShow = {isShow} type = "User" clickShow = {() => {setShow(false)}} clickOk = {() => handleDelete(idDelete)} /> }          
            </div>
        </>
    );
}

export default UsersManager;
