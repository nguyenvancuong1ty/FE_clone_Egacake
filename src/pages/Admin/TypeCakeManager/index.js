import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '~/components/Button';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';
function TypeCakeManager() {
    const res = useFetch('get', 'v1/api/cakes');
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isShow, setShow] = useState(false);
    const [nameCategory, setNameCategory] = useState('');
    const [iconLink, setIconLink] = useState('');
    const [typeSubmit, setSubmit] = useState('');
    const [id, setId] = useState(0);

    const errorDelete = () => {
        toast.error('Không thể xóa loại bánh này', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };
    const addSuccess = () => {
        toast.success('Thêm thành công', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };
    const updateSuccess = () => {
        toast.success('Update thành công', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };
    useEffect(() => {
        setTimeout(() => {
            setData(res);
            setLoading(false);
        }, 500);
    }, [res]);

    const handleDelete = (id) => {
        axios
            .delete('https://cakebyme.shop:3000/v1/api/cakes', {
                data: { id: id },
            })
            .then((response) => {
                setData(data.filter((cake) => cake.categoryCake !== id));
            })
            .catch((error) => {
                errorDelete();
            });
    };

    const handleAdd = () => {
        setShow(true);
    };
    const handleSubmit = () => {
        if (typeSubmit === 'add') {
            axios
                .post('https://cakebyme.shop:3000/v1/api/cakes', { nameCategory: nameCategory, iconLink: iconLink })
                .then((response) => {
                    addSuccess();
                    setData(response.data.data);
                    setShow(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (typeSubmit === 'update') {
            axios
                .put('https://cakebyme.shop:3000/v1/api/cakes', {
                    categoryCake: id,
                    nameCategory: nameCategory,
                    iconLink: iconLink,
                })
                .then((response) => {
                    updateSuccess();
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
        <Header/>
            <div className="mt-120"></div>
            <div className="container">
                <table className="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">categoryCake </th>
                            <th scope="col">nameCategory</th>
                            <th scope="col">iconLink</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {isLoading && <Loading colspan={4}/>}
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
                                            <Button
                                                    click={() => {
                                                        handleDelete(item.categoryCake);
                                                    }}
                                                    value="Xóa"
                                                ></Button>
                                                <Button
                                                    value="Sửa"
                                                    click={() => {
                                                        setId(item.categoryCake);
                                                        setNameCategory(item.nameCategory);
                                                        setIconLink(item.iconLink);
                                                        setSubmit('update');
                                                        setShow(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4}>
                                <Button
                                    value="Thêm"
                                    className="add__type-cake"
                                    click={() => {
                                        setNameCategory('');
                                        setIconLink('');
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
                            <label htmlFor="nameCategory">NameCategory</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nameCategory"
                                aria-describedby="nameCategory"
                                placeholder="Enter nameCategory"
                                value={nameCategory}
                                onChange={(e) => {
                                    setNameCategory(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="iconLink">IconLink</label>
                            <input
                                type="text"
                                className="form-control"
                                id="iconLink"
                                aria-describedby="iconLink"
                                placeholder="Enter iconLink"
                                value={iconLink}
                                onChange={(e) => {
                                    setIconLink(e.target.value);
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
                <ToastContainer />
            </div>
        </>
    );
}

export default TypeCakeManager;
