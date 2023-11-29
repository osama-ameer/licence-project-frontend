import React from "react";
import { Button, Layout, Menu } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../services/localStorage";
const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await clearLocalStorage();
    navigate(`/login`);
  };
  return (
    <Header className="app-header">
      <div className="demo-logo">Logo</div>
      <Button onClick={handleLogout}>Logout</Button>
    </Header>
  );
};
export default AppHeader;
