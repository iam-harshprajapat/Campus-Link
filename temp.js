import React, { useState } from "react";
import axios from "axios";
import { disable } from './../../../backend/node_modules/colors/index.d';
const Login = () => {
    const [userLogin, setuserLogin] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setuserLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:8000/api/login", userLogin);
        alert(res.data.message);
    };
    return (
        <>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="box" style={{ height: '400px', width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="email"
                        onChange={handleInput}
                        name="email"
                        style={{ height: '50px', width: '80%' }}
                    />
                    <input
                        style={{ height: '50px', width: '80%' }}
                        type="password"
                        placeholder="password"
                        onChange={handleInput}
                        name="password"
                    />
                    <button onClick={handleSubmit}
                        style={{ height: '50px', width: '80%' }}
                    >Login</button>
                </div>
            </div>
        </>
    );
};

export default Login;
