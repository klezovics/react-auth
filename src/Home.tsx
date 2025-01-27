import {useEffect, useState} from 'react'
import './App.css'
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {useNavigate, useSearchParams} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Home() {

    const signIn = useSignIn();
    const signOut = useSignOut()
    const auth = useAuthUser()
    const authHeader = useAuthHeader()
    const isAuthenticated = useIsAuthenticated()
    const [searchParams] = useSearchParams();
    const nav =         useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            handleSignIn(token);
        }
    }, [searchParams]);

    const handleSignIn = (token) => {
        if (signIn({
            auth: {
                token: token,
                type: 'Bearer'
            },
            refresh: null,  // Adjust if you have a refresh token in the URL
            userState: { email: "ak@gmail.com" } // Adjust based on your needs
        })) {
            console.log('Signed in successfully');
            nav("/")
        } else {
            console.error('Sign-in failed');
        }
    };

    const handleGoogleLogin = () => {
        const apiBaseUrl =  import.meta.env.VITE_API_URL
        console.log("Using base URL:" + apiBaseUrl)

        setTimeout(() => {
            window.location.href = apiBaseUrl + "/oauth2/authorization/google"
        }, 10000)
    }

    const handleLogout = () => {
        signOut()
        console.log('Logged out successfully')
        nav("/")
    }

    return (
        <>
            <div>This is the main page</div>
            <div>Auth header is {authHeader}</div>
            {isAuthenticated && <div>You are logged in as {auth?.email}</div>}
            {isAuthenticated && <button onClick={handleLogout}>Sign Out</button>}
            {!isAuthenticated && <button onClick={handleGoogleLogin}>Login with Google</button>}
        </>
    )
}

export default Home
