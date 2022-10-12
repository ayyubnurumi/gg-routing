import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { userLogout } from "../service/AuthService";
import { Button, Layout, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const logoutbtn = {
  position: "absolute",
  right: "10px",
};

export const PageLayout = () => {
  const navigate = useNavigate();
  const logout = () => userLogout(navigate);
  const [current, setCurrent] = useState("dashboard");

  const items1 = [
    { key: "dashboard", label: "dashboard", icon: <LaptopOutlined /> },
    { key: "profile", label: "profile", icon: <UserOutlined /> },
    { key: "about", label: "about", icon: <NotificationOutlined /> },
    {
      key: "logout",
      style: logoutbtn,
      label: (
        <Button
          onClick={() => logout(navigate)}
          type="primary"
          icon={<LogoutOutlined />}
          danger
        >
          logOut
        </Button>
      ),
    },
  ];

  const items2 = [
    { key: "dashboard", label: "dashboard", icon: <LaptopOutlined /> },
    { key: "profile", label: "profile", icon: <UserOutlined /> },
    { key: "about", label: "about", icon: <NotificationOutlined /> },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onClick}
          selectedKeys={[current]}
          items={items1}
        />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            onClick={onClick}
            selectedKeys={[current]}
            openKeys={[current]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              Height: 500,
              Width: 500,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
