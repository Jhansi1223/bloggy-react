import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "./../../appwrite/auth"
import {logout} from "./../../store/authSlice"
import { LOGOUT_URI } from '../../appwrite/backendUrls';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        const response = await fetch(LOGOUT_URI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await response.json();
        if (!data.error) {
            dispatch(logout());
        }
    }
    return (
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn