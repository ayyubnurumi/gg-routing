import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { Button, Checkbox, Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  SafetyOutlined,
  SafetyCertificateOutlined,
  // PhoneOutlined
} from "@ant-design/icons";

// const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 32,
    },
    sm: {
      span: 32,
    },
    md: {
      span: 64,
    },
    lg: {
      span: 64,
    },
    xl: {
      span: 128,
    },
    xxl: {
      span: 128,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 32,
      offset: 4,
    },
  },
};

export const Registration = () => {
  const [form] = Form.useForm();

  const [userName, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [phone, setphone] = useState("");
  // const [gender, setgender] = useState("");
  const [navigate, setnavigate] = useState(false)

  const onFinish = async e => {
    // e.preventDefault();
    await axios.post('https://nodejs-backend-api-playground.herokuapp.com/auth/user/registration', {
      userName, email, password
    })
    // localStorage.setItem("username", JSON.stringify(username));
    // localStorage.setItem("email", JSON.stringify(email));
    // localStorage.setItem("password", JSON.stringify(password));
    // localStorage.setItem("phone", JSON.stringify(phone));
    // localStorage.setItem("gender", JSON.stringify(gender));
    // console.log(userName, email, password)
    setnavigate(true);
  };

  if (navigate) {
    return <Navigate to='/login' />
  }

  return (
    <div className="registration">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="userName"
          onChange={(e) => setusername(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
          >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            tooltip="What do you want others to call you?"
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="email"
          onChange={(e) => setemail(e.target.value)}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>

        <Form.Item
          name="password"
          onChange={(e) => setpassword(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<SafetyOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={
              <SafetyCertificateOutlined className="site-form-item-icon" />
            }
            placeholder="Confirm Password"
          />
        </Form.Item>

        {/* <Form.Item
          name="phone"
          onChange={(e) => setphone(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone Number"
          />
        </Form.Item> */}

        {/* <Form.Item
          name="gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select
            placeholder="select your gender"
            onChange={(value) => setgender(value)}
          >
            <Option key='Male' value='Male'>
              Male
            </Option>
            <Option key='Female' value='Female'>
              Female
            </Option>
            <Option key='Other' value='Other'>
              just Human
            </Option>
          </Select>
        </Form.Item> */}

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="/agreement">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button style={{marginBottom: 5}} type="primary" htmlType="submit">
            Register
          </Button>
          <br />
          Already have an account <a href="/login">login now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};