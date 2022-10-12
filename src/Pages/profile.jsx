import React from "react";

export const Profile = () => {

    const data = JSON.parse(localStorage.getItem("userCredentials"))
    // console.log(data)
    return(
        <p>this is {data.userName}'s profile</p>
    )
}