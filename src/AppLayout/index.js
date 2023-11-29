import React, { useEffect } from "react";
import { Layout } from "antd";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import "./index.css";
import { getItemFromLocalStorage } from "../services/localStorage";
import AppContent from "./AppContent";
import { useNavigate } from "react-router-dom";
import AppBreadCumbs from "./AppBreadCumbs";

const AppLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Layout style={{ height: "100vh" }}>
      <AppHeader />
      <Layout>
        <AppSidebar />
        <Layout
          style={{
            padding: "0 12px 12px",
          }}
        >
          <AppBreadCumbs />
          <AppContent />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
