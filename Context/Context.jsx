import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [apiMessage, setApiMessage] = useState("Success!");
    const loginExistingUser = async (user)=> {
        try {

            const response = await axios.post("http://localhost:8080/login", user, {
                headers:{
                    "Content-Type": "application/json"
                }
            })
            console.log(response);
            setToken(response.data.token);
            setUser(response.data.minimalInfo);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.minimalInfo));
            if (response.status === 200) {
                navigate("/");
            }
        }catch(e) {
            if (e.response && e.response.status === 401) {
                alert(e.response.data);
            }
            else if (e.response && e.response.status === 400) {
                alert(e.response.data);
            } else {
                console.log(e);
            }
        }
    }
    const createForum = async (forum)=> {
        try {

            const response = await axios.post("http://localhost:8080/fora/forum/create", forum, {
                headers:{
                    "Content-Type": "application/json"
                }
            })
            console.log(response);
            
            if (response.status === 201) {
                navigate("/");
            }
        }catch(e) {
            if (e.response && e.response.status === 401) {
                alert(e.response.data);
            }
            else if (e.response && e.response.status === 400) {
                alert(e.response.data);
            } else {
                console.log(e);
            }
        }
    }
    const registerNewUser = async (newUser) => {
    try {
        
        const response = await axios.post("http://localhost:8080/register", newUser, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 201) {
            navigate("/login");
        } 
        
    } catch (e) {
        if (e.response && e.response.status === 401) {
                alert(e.response.data);
            }
            else if (e.response && e.response.status === 400) {
                alert(e.response.data);
            } else {
                console.log(e);
            }
    }
}
    return (
        <AuthContext.Provider value={{ user, token, loginExistingUser, registerNewUser, createForum, setUser,  apiMessage }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
