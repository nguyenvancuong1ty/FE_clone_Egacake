import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import axios from 'axios';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { useFetch } from '~/hooks/useFetch';
function VoucherManager() {
    const res = useFetch('get', 'v1/api/voucher');
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);
    const [id, setId] = useState(0);
    const [typeSubmit, setSubmit] = useState('');
    const [code, setCode] = useState('');
    const [isShow, setShow] = useState(false);
    const [requirement, setRequirement] = useState('');
    const [detail, setDetail] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setData(res);

            setLoading(false);
        }, 500);
    }, [res]);
    
    const handleDelete = (id) => {
        axios
            .delete('https://18.143.149.62:3000/v1/api/voucher', {
                data: { id: id },
            })
            .then((response) => {
                setData(data.filter((voucher) => voucher.id !== id));
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
                .post('https://18.143.149.62:3000/v1/api/voucher', {
                    code: code,
                    requirement: requirement,
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
                .put('https://18.143.149.62:3000/v1/api/voucher', {
                    id: id,
                    code: code,
                    requirement: requirement,
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
                            <th scope="col">Code</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Requirement</th>
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
                                        <td>{item.code}</td>
                                        <td>{item.detail.length > 30 ? item.detail.slice(0,30): item.detail}...</td>
                                        <td>{item.requirement.length > 30?item.requirement.slice(0,30): item.requirement}...</td>
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
                                                        setCode(item.code);
                                                        setDetail(item.detail);
                                                        setRequirement(item.requirement);
                                                        setId(item.id);
                                                        setShow(true);
                                                        setSubmit('update')
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
                                        setCode('');
                                        setDetail('');
                                        setRequirement('');
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
                            <label htmlFor="code">Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                aria-describedby="code"
                                placeholder="Enter code"
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
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
                        <div className="form-group">
                            <label htmlFor="requirement">Requirement</label>
                            <input
                                type="text"
                                className="form-control"
                                id="requirement"
                                aria-describedby="requirement"
                                placeholder="Enter requirement"
                                value={requirement}
                                onChange={(e) => {
                                    setRequirement(e.target.value);
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

export default VoucherManager;
