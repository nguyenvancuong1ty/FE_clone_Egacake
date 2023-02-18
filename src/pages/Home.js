import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = () => {
        fetch('/v1/api/users', {
            method: 'post', // or 'PUT'
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                console.log('render');
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <>
            <div className="mt-120"></div>
            <form className="w-50 m-auto">
                <h1>Home pages</h1>
                <div className="form-group ">
                    <label htmlFor="exampleInputEmail1">UserName</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirm"
                        name="confirm"
                        placeholder="Confirm Password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </>
    );
}

export default Home;
