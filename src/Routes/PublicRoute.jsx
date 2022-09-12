import React from "react";
import { Outlet } from "react-router";

const isUserLogin = () => {
    const user = localStorage.getItem('username')
    if (!user){
        return false;
    } else {
        return true;
    }
}

export const PublicRoute = () => {
    isUserLogin()
    // console.log(user)
    return(
        <Outlet />
    )
}