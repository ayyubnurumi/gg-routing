import { Button, Checkbox, Form, Input, Select } from "antd";
import { UserOutlined, MailOutlined, SafetyOutlined, SafetyCertificateOutlined,
PhoneOutlined, SmileOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

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
      span: 64 
    },
    xl: {
      span: 128
    },
    xxl: {
      span: 128
    }
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

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");

  const onFinish = () => {
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("password", JSON.stringify(password));
    localStorage.setItem("phone", JSON.stringify(phone));
    localStorage.setItem("gender", JSON.stringify(gender));

    navigate("/login");
  };

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
          name="username"
          // label="Username"
          onChange={(e) => setusername(e.target.value)}
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          // label="E-mail"
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
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          name="password"
          // label="Password"
          onChange={(e) => setpassword(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<SafetyOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          // label="Confirm Password"
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
          <Input.Password prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item
          name="phone"
          // label="Phone"
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
        </Form.Item>

        <Form.Item
          name="gender"
          // label="Gender"
          
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender" onChange={(e) => setgender(e.target.value)}>
            <Option icon={<ManOutlined />} value="male">cwk</Option>
            <Option icon={<WomanOutlined />} value="female">cwk</Option>
            <Option icon={<SmileOutlined />} value="other">blm tumbuh</Option>
          </Select>
        </Form.Item>

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
            I have read the <a href="-">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};