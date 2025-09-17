import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = React.createContext();
// function to act as a context provider for the entire front end application
const AuthProvider = ({ children }) => {
    //state to hold info about the user in local storage
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const navigate = useNavigate();
    //state to hold the user's token in the users local storage 
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [apiMessage, setApiMessage] = useState("Success!");
    //function to send a post request to backend for loging in the user and receive a token with minimal info about the user
    const loginExistingUser = async (user)=> {
        try {

            const response = await axios.post("https://retekprojects.com:8443/login", user, {
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
                navigate("/home");
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
    //function to send a post request to the backend for posting a forum
    const commentReply = async (forumId, forumMessage) => {
        try {

        
            const response  = await axios.post(`https://retekprojects.com:8443/fora/forum/${forumId}/messages`, forumMessage, {
                headers:{
                    "Content-Type": "application/json"
                }

            })
            
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
    //function to send a post request to the backend for creating a forum
    const createForum = async (forum)=> {
        try {

            const response = await axios.post("https://retekprojects.com:8443/fora/forum/create", forum, {
                headers:{
                    "Content-Type": "application/json"
                }
            })
            console.log(response);
            
            if (response.status === 201) {
                navigate("/home");
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
    //function to send a post request to the backend to register a new user
    const registerNewUser = async (newUser) => {
    try {
        
        const response = await axios.post("https://retekprojects.com:8443/register", newUser, {
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
        //Auth text prover holds these variables for access to other parts of the application (AuthProvider is Wrapped around </App> in main.jsx)
        <AuthContext.Provider value={{ user, token, commentReply, loginExistingUser, registerNewUser, createForum, setUser,  apiMessage }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
