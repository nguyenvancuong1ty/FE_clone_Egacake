import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';
function TypeCakeManager() {
    const res = useFetch('get', '/v1/api/cakes');
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setData(res);

            setLoading(false);
        }, 500);
    }, [res]);
    const handleDelete = (userId) => {
        axios
            .delete('/v1/api/users', {
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
        <Header/>
            <div className="mt-120"></div>
            <div className="container">
                <table className="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">categoryCake </th>
                            <th scope="col">nameCategory</th>
                            <th scope="col">iconLink</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    {isLoading && <Loading />}
                    <tbody>
                        {data &&
                            data.map((item, index) => {
                                return (
                                    item.authorization !== 1 && (
                                        <tr key={index}>
                                            <th scope="row">{item.categoryCake}</th>
                                            <td>{item.nameCategory}</td>
                                            <td>
                                                <img alt="" src={item.iconLink} />
                                            </td>
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

export default TypeCakeManager;
