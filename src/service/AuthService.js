import { message } from "antd";
import axios from "axios";

const BASE_PATH = "https://nodejs-backend-api-playground.herokuapp.com/";

export const userRegistration = async (payload, navigate) => {
  try {
    const registration = await axios.post(
      `${BASE_PATH}auth/user/registration`,
      payload
    );
    // console.log(registration.data.data);
    message.success(registration.data.message);
    navigate("/login");
  } catch (error) {
    // console.log(error.response);
    if (
      error.response.data.message.errorEmailExist &&
      error.response.data.message.errorUserNameExist
    ) {
      message.error(error.response.data.message.errorEmailExist, 3);
      message.error(error.response.data.message.errorUserNameExist, 3);
    } else {
      message.error(error.response.data.message, 3);
    }
  }
};

export const userLogin = async (payload, navigate) => {
  try {
    // login user
    const loginResults = await axios.post(
      `${BASE_PATH}auth/user/login`,
      payload
    );
    // get access token from refresh token user login return response with headers option
    // check insomnia or postman @ GENERATE ACCESS TOKEN Request
    // console.log(loginResults)
    const getAccessToken = await axios.get(
      `${BASE_PATH}auth/generate/accessToken`,
      {
        headers: {
          Authorization: `Bearer ${loginResults.data.data.refreshToken}`,
        },
      }
    );
    // console.log(getAccessToken)

    // create data structure about user credentials from all API hit above and save to local storage
    const userCredentials = {
      ...loginResults.data.data,
      accessToken: getAccessToken.data
    };
    // console.log(userCredentials)

    // actually save to local storage.  userCredentials data and key need to format to string before saving,
    // otherwise it will be convert to an object see https://prnt.sc/sqmjF9Ri51dN
    localStorage.setItem(
      "userCredentials", JSON.stringify(userCredentials)
    );

    // redirect to dashboard or whatever your page after auth
    message.success(loginResults.data.message);
    navigate("/dashboard");

    // check or uncomment below log to see the actual process of hitting the above API
    // console.log(loginResults.data);
    // console.log(getAccessToken.data);
    // console.log(userCredentials);
  } catch (error) {
    //console.log(error);
    message.error('username or password or both are wrong!!!', 3);
  }
};

export const userLogout = (navigate) => {
  localStorage.removeItem("userCredentials");
  localStorage.removeItem("username");
  message.success("logout success!!!");
  navigate("/login");
};
