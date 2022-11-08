import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) // 페이지마다 저장된 토큰이 있는지 확인하여 있으면 정보를 유지해줌
    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    const [signUpMode, setSignUpMode] = useState(false)
    
    const navigate = useNavigate();

    // 로그인해서 토큰들을 불러옴
    const loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })  // input name(e.target.password)의 value
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access)) // 받은 토큰을 디코딩함
            localStorage.setItem('authTokens', JSON.stringify(data)) // localStorage에 토큰을 저장해둠
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }

    // 로그아웃
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    // 회원가입
    const createUser = async (e) => {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        let password2 = e.target.password2.value
        let email = e.target.email.value

        if (password == password2 && username && password) {
            let response = await fetch('http://127.0.0.1:8000/api/createuser/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    'username': username, 
                    'password': password,
                    'email': email,
                })
            })
            let data = await response.json()
            if (response.status === 200) {
                setSignUpMode(false)
                alert('Signup completed! /n Please Log in with your account :)')
            } else {
                alert(`Failed to create an account, ${data.message}`)
            }
        } else {
            alert('Please double check the singup forms')
        }
    }

    // Token 업데이트
    const updateToken = async () =>{
        console.log('update token called')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh':authTokens?.refresh })   // 받은 정보를 json화 시킴
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }
    // authTokens존재하면 4분마다 updateToken실행
    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, 240000)
        return()=> clearInterval(interval)

    },[authTokens, loading])

    // useContext로 사용할 객체 상수
    const contextData = {    
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        createUser: createUser,
        signUpMode: signUpMode,
        setSignUpMode: setSignUpMode,
    }

    return (
        <AuthContext.Provider value={contextData}> {/* 사용가능하게 할 value (객체 상수)를 제공 */}
            {loading ? null : children}
        </AuthContext.Provider>
    )
}