import React, { useState } from "react";
import { authService } from "fBase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    // 이메일 패스워드 타이핑
    const onChange = (e) => {
        const { target: { name, value } } = e;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    };
    // 이메일로 유저 만들거나 로그인
    const onSubmit = async (e) => {
        e.preventDefault();
        let data;
        const auth = getAuth();
        try {
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev); // 로그인할지 가입할지 바꿔줌

    // 구글, 깃허브 로그인
    const onSocialClick = async (e) => {
        const { target: { name } } = e;
        let provider;
        try {
            if (name === 'google') {
                provider = new GoogleAuthProvider();
            } else if (name === 'github') {
                provider = new GithubAuthProvider();
            }
            const data = await signInWithPopup(authService, provider);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    return <div>
        <form onSubmit={onSubmit}>
            <input name="email" type='text' placeholder="Email" required value={email} onChange={onChange} />
            <input name="password" type='password' placeholder="Password" required value={password} onChange={onChange} />
            <input type='submit' value={newAccount ? "Create Account" : "Sign in"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
}