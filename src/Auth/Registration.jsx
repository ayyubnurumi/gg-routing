import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Checkbox, Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  SafetyOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { userRegistration } from "../service/AuthService";

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

  const navigate = useNavigate();

  const [payload, setpayload] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [checked, setchecked] = useState(false);
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
    }, 4000);
  };

  const onFinish = () => userRegistration(payload, navigate);

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
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input
            autoComplete="new-username"
            onChange={(e) =>
              setpayload({ ...payload, userName: e.target.value })
            }
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="email"
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
            autoComplete="new-email"
            onChange={(e) => setpayload({ ...payload, email: e.target.value })}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>

        <Form.Item
          name="password"
          onChange={(e) => setpayload({ ...payload, password: e.target.value })}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            autoComplete="new-password"
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
            autoComplete="new-password"
            prefix={
              <SafetyCertificateOutlined className="site-form-item-icon" />
            }
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          onChange={() => setchecked(true)}
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
          <Button
            htmlType="submit"
            style={{ marginBottom: 5 }}
            onClick={()=>enterLoading(0)}
            type="primary"
            loading={loadings[0]}
            disabled={
              payload.userName && payload.email && payload.password && checked
                ? false
                : true
            }
          >
            Register
          </Button>
          <br />
          Already have an account <a href="/login">login now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
