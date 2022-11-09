import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { userLogout } from "../service/AuthService";
import { Button, Layout, Menu, Switch } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";

const { Header, Content, Sider } = Layout;

const logoutbtn = {
  position: "absolute",
  right: "10px",
};

export const PageLayout = () => {
  const navigate = useNavigate();
  const logout = () => userLogout(navigate);
  const [current, setCurrent] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
        <div className="logo"><img src="mekkake.png" alt="logo"/></div>
        <Menu
          className="header-menu"
          theme={theme}
          mode="horizontal"
          onClick={onClick}
          selectedKeys={[current]}
          items={items1}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Switch
            checked={theme === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            style={{ margin: 10, marginLeft: 14, marginBottom: 5 }}
          />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ margin: 10, marginLeft: 14, marginTop: 5 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
          <Menu
            mode="inline"
            theme={theme}
            onClick={onClick}
            selectedKeys={[current]}
            openKeys={[current]}
            style={{
              height: "80vh",
              border: 0
            }}
            items={items2}
          />
        </Sider>
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
      <Footer style={{textAlign: 'center'}} >made by ayyub</Footer>
    </Layout>
  );
};
