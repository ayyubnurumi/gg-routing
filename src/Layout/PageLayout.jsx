import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { userLogout } from "../service/AuthService";

const { Header, Content, Sider } = Layout;

const items1 = [
  { key: "dashboard", label: "dashboard", icon: <LaptopOutlined /> },
  { key: "profile", label: "profile", icon: <UserOutlined /> },
  { key: "about", label: "about", icon: <NotificationOutlined /> },
  {
    key: "logout",
    label: (
      <Button type="primary" danger>
        logOut
      </Button>
    ),
    style: ({marginRight: '5px'}),
    icon: <LogoutOutlined />,
  },
];

const items2 = [
  { key: "dashboard", label: "dashboard", icon: <LaptopOutlined /> },
  { key: "profile", label: "profile", icon: <UserOutlined /> },
  { key: "about", label: "about", icon: <NotificationOutlined /> },
];

const danger = [
  {
    key: "logout",
    label: (
      <Button type="primary" danger>
        logOut
      </Button>
    ),
    icon: <LogoutOutlined />,
  },
];

export const PageLayout = () => {
  const navigate = useNavigate();
  const logout = () => userLogout(navigate);
  const [current, setCurrent] = useState("dashboard");

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
          //items={items1}
        >
          <Menu.Item
            key= "logout"
            icon= {<LogoutOutlined />}
            style={styleLogout}
            >
              <Button type="primary" danger>
                logOut
              </Button>
          </Menu.Item>
        </Menu>
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
          <Menu
          theme="danger"
          mode="inline"
          onClick={() => logout()}
          style={{ float: "inline-end" }}
          items={danger}
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
              maxHeight: 500,
              maxWidth: 500,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styleLogout = {
  position: "absolute",
  right: "10px"
}