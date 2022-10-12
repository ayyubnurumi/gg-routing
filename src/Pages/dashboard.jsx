import React from "react";

export const Dashboard = () => {
    // const rawUser = localStorage.getItem('username')
    // const user = rawUser.replace(/^"(.+(?="$))"$/, '$1')
    const data = JSON.parse(localStorage.getItem("userCredentials"))
    return(
        <h1 style={{fontSize: 27}}>Hi {data.userName}, welcome home!</h1>
    )
}