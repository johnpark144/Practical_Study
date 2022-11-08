import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext";

export default function LoginPage({ setIsLoggedIn }) {
    const { user, loginUser, createUser, signUpMode, setSignUpMode } = useContext(AuthContext) // useContext를통해 createContext로 제공받은 것을 사용

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [user])

    return (
        <div>
            {signUpMode ? (
                <form onSubmit={createUser}>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" id="password1" />
                    </div>
                    <div>
                        <label>Password Confirm</label>
                        <input type="password" name="password2" id="password2" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <button type="submit">Create Account</button>
                </form>
            ) : (
                <form onSubmit={loginUser}>
                    <input type='text' name='username' placeholder='Enter Username' />
                    <input type='password' name='password' placeholder='Enter Password' />
                    <input type='submit' value='Login'/>
                </form>
            )}
            <button onClick={()=>{setSignUpMode(!signUpMode)}}>{signUpMode ? 'Go to Login' : 'Go to sign up'}</button>
        </div>
    )
}