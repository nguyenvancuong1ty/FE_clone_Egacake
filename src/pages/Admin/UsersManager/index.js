import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';
import { useHeaderData } from '~/hooks/useHeaderData';
function UsersManager() {
    localStorage.setItem('number_product', useHeaderData());
    const res = useFetch('get', 'v1/api/users');
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setData(res);
            setLoading(false);
        }, 500);
    }, [res]);
    const handleDelete = (userId) => {
        axios
            .delete('v1/api/users', {
                data: { id: userId },
            })
            .then((response) => {
                setData(data.filter((user) => user.id !== userId));
            })
            .catch((error) => {
                console.log(error);
            });
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
                                                <button
                                                    onClick={() => {
                                                        handleDelete(item.id);
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UsersManager;
