import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Home", "/dashboard", <HomeOutlined />),
  getItem("Licenses", "/license", <DesktopOutlined />),
  getItem("Accounts", "/account", <DesktopOutlined />),
  getItem("Users", "/users", <UserOutlined />),
  getItem("Settings", "/settings", <SettingOutlined />),
];
const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    if (location?.pathname) setActiveKey(location?.pathname);
  }, [location?.pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["/dashboard"]}
        mode="inline"
        items={items}
        onClick={handleNavigate}
        selectedKeys={activeKey}
      />
    </Sider>
  );
};
export default AppSidebar;
