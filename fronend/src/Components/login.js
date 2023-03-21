import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const handleLogin = async () => {
        console.log('---------------', email, password);

        let result = await fetch('http://localhost:5000/login', {

            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'Application/json',
                
            }

        });

        result = await result.json();
        console.log('rsult login data-----------------------', result);

        if (result.auth) {
            // localStorage.setItem('user', JSON.stringify(result));
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));

            navigate('/')


        } else {
            alert('please provide right name');
        }
    }
    return (

        <div className='login'>
            <h1>Login</h1>

            <input className='inputbox' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
            <input className='inputbox' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
            <button className='appButton' onClick={handleLogin} type='button'>Login</button>
        </div>

    )

}


export default Login;