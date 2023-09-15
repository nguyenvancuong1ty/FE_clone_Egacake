import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';

function CakeManager() {
    const res = useFetch('get', 'v1/api/cakedetail');
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);
    const [isShow, setShow] = useState(false);
    const [categoryCake, setCategoryCake] = useState('');
    const [price, setPrice] = useState('');
    const [sold, setSold] = useState('');
    const [images, setImages] = useState('');
    const [sale, setSale] = useState('');
    const [detail, setDetail] = useState('');
    const [inventory, setInventory] = useState('');
    const [nameCake, setNameCake] = useState('');
    const [typeSubmit, setSubmit] = useState('');
    const [id, setId] = useState(0);
    const [current, setCurrent] = useState(0);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setTimeout(() => {
            setData(res);
            setLoading(false);
        }, 500);
    }, [res]);

    useEffect(() => {
        setCurrent(parseInt(data.length / 10) === 0 ? data.length / 10 : Math.ceil(data.length / 10));
        setItems(Array.from({ length: current }).map((_, i) => i));
    }, [data, current]);

    useEffect(() => {
        items.length > 0 && setCurrentPage(items.length);
    }, [items.length]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_URL}v1/api/cakeDetail`, {
                data: { id: id },
            });
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleAdd = () => {
        setShow(true);
    };
    const handleSubmit = () => {
        if (typeSubmit === 'add') {
            axios
                .post(`${process.env.REACT_APP_URL}v1/api/cakeDetail`, {
                    categoryCake: categoryCake,
                    images: images,
                    nameCake: nameCake,
                    price: price,
                    sold: sold,
                    inventory: inventory,
                    sale: sale,
                    detail: detail,
                })
                .then((response) => {
                    setData(response.data.data);
                    setShow(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (typeSubmit === 'update') {
            axios
                .put(`${process.env.REACT_APP_URL}v1/api/cakeDetail`, {
                    id: id,
                    categoryCake: categoryCake,
                    images: images,
                    nameCake: nameCake,
                    price: price,
                    sold: sold,
                    inventory: inventory,
                    sale: sale,
                    detail: detail,
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
                            <th scope="col">CategoryCake</th>
                            <th scope="col">NameCake</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Inventory</th>
                            <th scope="col">Image</th>
                            <th scope="col">Sale</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isloading && <Loading colspan={10} />}
                        {data &&
                            data.map((item, index) => {
                                return (
                                    index + 1 <= currentPage * 10 &&
                                    index + 1 >= currentPage * 10 - 9 && (
                                        <tr key={index}>
                                            <td>{item.categoryCake}</td>
                                            <td>{item.nameCake}</td>
                                            <td>{item.price}</td>
                                            <td>{item.sold}</td>
                                            <td>{item.inventory}</td>
                                            <td>
                                                <img
                                                    alt=""
                                                    src={item.images}
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            </td>
                                            <td>{item.sale}%</td>
                                            <td>{item.detail.slice(0, 30)}...</td>
                                            <td>
                                                <Button
                                                    id={item.id}
                                                    style={{ cursor: 'pointer' }}
                                                    click={() => {
                                                        handleDelete(item.id);
                                                    }}
                                                    value="Xóa"
                                                />
                                                <Button
                                                    class="mt-1"
                                                    value="Sửa"
                                                    click={() => {
                                                        setId(item.id);
                                                        setCategoryCake(item.categoryCake);
                                                        setNameCake(item.nameCake);
                                                        setPrice(item.price);
                                                        setSold(item.sold);
                                                        setSale(item.sale);
                                                        setImages(item.images);
                                                        setDetail(item.detail);
                                                        setInventory(item.inventory);
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
                            <td colSpan={11}>
                                {items &&
                                    items.map((num) => {
                                        return (
                                            <button
                                                className={currentPage === num + 1 ? 'active' : ''}
                                                key={num}
                                                onClick={() => {
                                                    setCurrentPage(num + 1);
                                                }}
                                            >
                                                {num + 1}
                                            </button>
                                        );
                                    })}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={11}>
                                <Button
                                    value="Thêm"
                                    className="add__type-cake"
                                    click={() => {
                                        setCategoryCake('');
                                        setNameCake('');
                                        setPrice('');
                                        setSold('');
                                        setSale('');
                                        setImages('');
                                        setDetail('');
                                        setInventory('');
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
                            <label htmlFor="categoryCake">categoryCake</label>
                            <input
                                type="text"
                                className="form-control"
                                id="categoryCake"
                                aria-describedby="categoryCake"
                                placeholder="Enter categoryCake"
                                value={categoryCake}
                                onChange={(e) => {
                                    setCategoryCake(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nameCake">NameCake</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nameCake"
                                aria-describedby="nameCake"
                                placeholder="Enter nameCake"
                                value={nameCake}
                                onChange={(e) => {
                                    setNameCake(e.target.value);
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
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                aria-describedby="price"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sold">Sold</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sold"
                                aria-describedby="sold"
                                placeholder="Enter sold"
                                value={sold}
                                onChange={(e) => {
                                    setSold(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inventory">Inventory</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inventory"
                                aria-describedby="inventory"
                                placeholder="Enter inventory"
                                value={inventory}
                                onChange={(e) => {
                                    setInventory(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sale">Sale</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sale"
                                aria-describedby="sale"
                                placeholder="Enter sale"
                                value={sale}
                                onChange={(e) => {
                                    setSale(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="detail">Detail</label>
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

export default CakeManager;
