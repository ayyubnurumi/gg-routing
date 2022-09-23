import axios from "axios";

axios.defaults.baseURL = 'https://nodejs-backend-api-playground.herokuapp.com/';

export const userRegistration = async (payload, navigate) => {
    try {
        const registration = await axios.post(`auth/user/registration`, payload);
        navigate("/login");
        // console.log(registration.data.data);
        alert(registration.data.message)
    } catch (error) {
        // console.log(error.response.data);
        alert(error.response.data.message)
    }
};

export const userLogin = async (payload, navigate) => {
    try {
        // login user
        const loginResults = await axios.post(`auth/user/login`, payload);
        // get access token from refresh token user login return response with headers option
        // check insomnia or postman @ GENERATE ACCESS TOKEN Request
        // console.log('ini', loginResults)
        const getAccessToken = await axios.get(`auth/generate/accessToken`, {
            headers: {
                Authorization : `Bearer ${loginResults.data.data.refreshToken}`
            }
        });
        // console.log('yg ini', getAccessToken)
        
        // create data structure about user credentials from all API hit above and save to local storage
        const userCredentials = {
            ...loginResults.data.data,
            accessToken: getAccessToken.data.data
        }
        // console.log('jadi', userCredentials)
        
        // actually save to local storage.  userCredentials data nad key need to format to string before saving,
        // otherwise it will be convert to an object see https://prnt.sc/sqmjF9Ri51dN
        localStorage.setItem("userCredentials", JSON.stringify(userCredentials.accessToken));
        
        // redirect to dashboard or whatever your page after auth
        alert(loginResults.data.message)
        navigate("/dashboard");

        // check or uncomment below log to see the actual process of hitting the above API
        // console.log(loginResults.data);
        // console.log(getAccessToken.data);
        // console.log(userCredentials);
    } catch (error) {
        console.log(error);
        alert(error.message)
    }
};

export const userLogout = (navigate) => {
    localStorage.removeItem("userCredentials");
    navigate("/login");
};