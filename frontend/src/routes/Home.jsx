import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userServices";

const Home = () => {

    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (user) => {
        if (!user) {
            return;
        }

        await logout(user);
        
        navigate("/login");
    }

    if (loading) {
        return <>
            <h2>Loading...</h2>
        </>
    }

    else if (!user || !user.username) {
        navigate("/login");
    } 
    
    else {

        return(
            <>
            <h1>Hello {user.username} </h1>
            <br/>
            <br/>
            <button onClick={() => handleLogout(user)}>Logout</button>
            </>
        )
    }
}

export default Home;