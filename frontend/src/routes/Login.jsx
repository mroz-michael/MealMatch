import { useState } from "react";
import { login } from "../services/userServices";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setUsername('')
            setPassword('')
            setError('')
            const res = await login({username, password});
            navigate("/");
        } catch (err) {
            
            const msg = err.message || "Unknown Error";
            setError(msg);
        }
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
                {error && <p style={ {color: "red"} }>{error}</p>}
        <button onClick={() => handleLogin()}>Login</button>
        </>
    )
}

export default Login;