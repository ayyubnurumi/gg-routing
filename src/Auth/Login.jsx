import React, { useState } from "react";
import { useNavigate } from "react-router";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./Auth.css";

import { userLogin } from "../service/AuthService";

export const Login = () => {
  const navigate = useNavigate()
  const [payload, setpayload] = useState({
    user: "",
    password: "",
  })

  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1234);
  };

  const onFinish =()=> userLogin(payload, navigate)
  // localStorage.setItem('username', JSON.stringify(payload.user))

  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="user"
          onChange={(e) => setpayload({...payload, user: e.target.value})}
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          onChange={(e) => setpayload({...payload, password: e.target.value})}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="-">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="login-form-button"
            style={{ marginBottom: 5 }}
            onClick={()=>enterLoading(0)}
            type="primary"
            loading={loadings[0]}
            disabled={
              payload.user && payload.password
                ? false
                : true
            }
          >
            Log in
          </Button>
          <br />
          Or <a href="/registration">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
