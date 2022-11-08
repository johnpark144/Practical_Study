import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Header({ setIsLoggedIn }){
    let { user, logoutUser } = useContext(AuthContext) // useContext를통해 createContext로 제공받은 것을 사용
    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [user])

    return(
        <div className="app-header">
            <h1>My Notes</h1>
            <Link to='/'>Home</Link>
            {user ? (
               <p onClick={logoutUser} style={{cursor:'pointer'}}>Logout</p>
            ):(
            <Link to='/login'>Login</Link>
            )}
            {user && <p>Hello {user.username}</p>}
        </div>
    )
}
