import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

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
            </>
        )
    }
}

export default Home;