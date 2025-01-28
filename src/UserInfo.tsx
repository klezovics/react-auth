import {useEffect, useState} from 'react'
import './App.css'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function UserInfo() {

    const authHeader = useAuthHeader();
    const [userData, setUserData] = useState(null);
    const authUser = useAuthUser();
    console.log(authUser);

    useEffect(() => {
        const fetchUserData = async () => {
            const apiBaseUrl =  import.meta.env.VITE_API_URL

            try {
                const response = await fetch(apiBaseUrl + "/api/user/me/", {
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
