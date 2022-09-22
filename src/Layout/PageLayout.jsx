import React from "react";
import { Outlet, useNavigate } from "react-router";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { userLogout } from "../service/AuthService";

const { Header, Content, Sider } = Layout;

// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);
//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   }
// );

export const PageLayout = () => {
  const navigate = useNavigate();
  const logout =()=> userLogout(navigate)
  
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
          <Menu.Item
            key={`home`}
            style={{ marginRight: 5 }}
            onClick={() => navigate("/dashboard")}
            type="primary"
          >
            home
          </Menu.Item>
          <Menu.Item
            key={`profile`}
            style={{ marginRight: 5 }}
            onClick={() => navigate("/content1")}
            type="primary"
          >
            profile
          </Menu.Item>
          <Menu.Item
            key={`about`}
            style={{ margin: "auto", marginLeft: 0 }}
            onClick={() => navigate("/content2")}
            type="primary"
          >
            about
          </Menu.Item>

          <Menu.Item>
            <Button
              icon={<LogoutOutlined />}
              onClick={() => logout()}
              style={{float: "inline-end"}}
              type="primary"
              danger
            >
              logOut
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            // items={items2}
          >
            <MenuItem
              icon={<LaptopOutlined />}
              style={{ marginTop: 15, marginRight: 5 }}
              onClick={() => navigate("/dashboard")}
              type="primary"
            >
              home
            </MenuItem>
            <MenuItem
              icon={<UserOutlined />}
              style={{ marginTop: 15, marginRight: 5 }}
              onClick={() => navigate("/content1")}
              type="primary"
            >
              profile
            </MenuItem>
            <MenuItem
              icon={<NotificationOutlined />}
              style={{ marginTop: 15, marginRight: 5 }}
              onClick={() => navigate("/content2")}
              type="primary"
            >
              about
            </MenuItem>
          </Menu>
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
              minHeight: 550,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};