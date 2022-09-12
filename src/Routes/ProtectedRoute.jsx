import React from "react";
import { Outlet } from "react-router";

const isUserLogin = () => {
    const user = localStorage.getItem('username')
    if (!user){
        return true;
    } else {
        return false;
    }
}

export const ProtectedRoute = () => {
    isUserLogin()
    // console.log(user)
    return(
        <Outlet />
    )
}