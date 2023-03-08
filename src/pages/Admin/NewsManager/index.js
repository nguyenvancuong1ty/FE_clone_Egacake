import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import axios from 'axios';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';
function RecipeManager() {
    const res = useFetch('get', 'v1/api/news');
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [isShow, setShow] = useState(false);
    const [images, setImages] = useState('');
    const [typeSubmit, setSubmit] = useState('');
    const [detail, setDetail] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setData(res);

            setLoading(false);
        }, 500);
    }, [res]);
    
    const handleDelete = (id) => {
        axios
            .delete('https://cakebyme.shop:3000/v1/api/news', {
                data: { id: id },
            })
            .then((response) => {
                setData(data.filter((news) => news.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAdd = () => {
        setShow(true);
    };
    const handleSubmit = () => {
        if (typeSubmit === 'add') {
            axios
                .post('https://cakebyme.shop:3000/v1/api/news', {
                id: id,
                title: title,
                images: images,
                detail: detail})
                .then((response) => {
                    setData(response.data.data);
                    setShow(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (typeSubmit === 'update') {
            axios
                .put('https://cakebyme.shop:3000/v1/api/news', {
                    id: id,
                    title: title,
                    images: images,
                    detail: detail
                })
                .then((response) => {
                    setData(response.data.data);
                    setShow(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Date Create</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isloading && <Loading colspan={6}/>}
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title}</td>
                                        <td>{item.detail.slice(0,30)}...</td>
                                        <td>
                                            <img src={item.images} alt="" style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>{item.dateCreate}</td>
                                        <td> <Button
                                                    click={() => {
                                                        handleDelete(item.id);
                                                    }}
                                                    value="Xóa"
                                                ></Button>
                                                <Button
                                                    class = "mt-1"
                                                    value="Sửa"
                                                    click={() => {
                                                        setId(item.id);
                                                        setTitle(item.title);
                                                        setImages(item.images);
                                                        setSubmit('update');
                                                        setDetail(item.detail);
                                                        setShow(true);
                                                    }}
                                                />
                                            </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <Button
                                    value="Thêm"
                                    className="add__type-cake"
                                    click={() => {
                                        setTitle('');
                                        setImages('');
                                        setDetail('');
                                        setSubmit('add');
                                        handleAdd();
                                    }}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div className={isShow ? 'overlay show' : 'overlay'} onClick={() => setShow(false)}>
                    <div className="frm_add" onClick={(e) => e.stopPropagation()}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                aria-describedby="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="images">Images</label>
                            <input
                                type="text"
                                className="form-control"
                                id="images"
                                aria-describedby="images"
                                placeholder="Enter images"
                                value={images}
                                onChange={(e) => {
                                    setImages(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="detail">detail</label>
                            <input
                                type="text"
                                className="form-control"
                                id="detail"
                                aria-describedby="detail"
                                placeholder="Enter detail"
                                value={detail}
                                onChange={(e) => {
                                    setDetail(e.target.value);
                                }}
                            />
                        </div>
                        <Button
                            className="btn btn-primary"
                            value="Submit"
                            click={() => {
                                handleSubmit();
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecipeManager;
