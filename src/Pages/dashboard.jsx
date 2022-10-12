import React from "react";

export const Dashboard = () => {
    const rawUser = localStorage.getItem('username')
    const user = rawUser.replace(/^"(.+(?="$))"$/, '$1')
    return(
        <h1 style={{fontSize: 27}}>Hi {user}, welcome home!</h1>
    )
}