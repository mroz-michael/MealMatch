import { useState } from "react";
import { login } from "../services/userServices";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const res = await login({username, password});
        console.log('res is ', res);
    }

    return (
        <>
        <h3>Login page goes here :) </h3>
        <label htmlFor="loginUsername">Username</label>
        <input id='loginUsername' type="text" onChange={e => setUsername(e.target.value.trim())}/>
        <br></br>
        <label htmlFor="loginPassword">Password</label>
        <input id='loginPassword' type='password' onChange={e => setPassword(e.target.value)} />
                <br></br>
        <button onClick={() => handleLogin()}>Login</button>
        </>
    )
}

export default Login;