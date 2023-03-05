import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';
function RecipeManager() {
    const res = useFetch('get', 'v1/api/recipe');
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setData(res);
            setLoading(false);
        }, 500);
    }, [res]);
    const handleDelete = (userId) => {};
    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <div className="container">
                <table className="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Date Create</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isloading && <Loading colspan={6} />}
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title}</td>
                                        <td>{item.detail}</td>
                                        <td>
                                            <img src={item.images} alt="" style={{ width: '50px', height: '50px' }} />
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
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default RecipeManager;
