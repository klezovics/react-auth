import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthProvider from "react-auth-kit";
import store from './authStore.js'
import Home from "./Home.tsx";
import UserInfo from "./UserInfo.tsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import {BrowserRouter, NavLink, Route, Routes} from "react-router";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import PrivateRoute from "./PrivateRoute.tsx";

function App() {
    return (
        <>
            <AuthProvider store={store}>
                <BrowserRouter>
                    <nav>
                        <h1>This is Auth Test</h1>
                        <NavLink to="/">Home</NavLink> | <NavLink to="/user">About</NavLink>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/user" element={<UserInfo/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
