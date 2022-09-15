import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router";

const { Header, Content, Sider } = Layout;

// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

export const PageLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["2"]}
          // items={items1}
        >
          <Button style={{marginTop: 15, marginRight: 5}} onClick={()=>navigate('/dashboard')} type="primary">home</Button>
          <Button style={{marginTop: 15, marginRight: 5}} onClick={()=>navigate('/content1')} type="primary">profile</Button>
          <Button style={{marginTop: 15, marginRight: 5}} onClick={()=>navigate('/content2')} type="primary">about</Button>
          <Button style={{marginTop: 15}} onClick={() => logout()} type="primary" danger >log out</Button>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
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
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
