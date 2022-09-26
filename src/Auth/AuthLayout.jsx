import React from "react";
import { Outlet } from "react-router";
import './Auth.css'

export const AuthLayout = () => {
    return (
        <div className="auth">
            <Outlet />
        </div>
    )
}