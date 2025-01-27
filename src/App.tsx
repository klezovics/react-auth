import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthProvider from "react-auth-kit";
import store from './authStore.js'
import {BrowserRouter, Link, Route, Routes, useSearchParams} from "react-router-dom";
import Home from "./Home.tsx";
import UserInfo from "./UserInfo.tsx";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function App() {
    return (
        <>
            <AuthProvider store={store}>
                <BrowserRouter>
                    <nav>
                        <h1>This is Auth Test</h1>
                        <Link to="/">Home</Link> | <Link to="/user">About</Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/user" element={<UserInfo/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
