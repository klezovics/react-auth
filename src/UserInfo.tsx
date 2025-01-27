import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthProvider from "react-auth-kit";
import store from './authStore.js'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function UserInfo() {

    const authHeader = useAuthHeader();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/user/me/", {
                    method: "GET",
                    headers: {
                        "Authorization": authHeader,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [authHeader]);

    return (
        <>
            <div>This is the user info page</div>
            {userData ? (
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    )
}

export default UserInfo
