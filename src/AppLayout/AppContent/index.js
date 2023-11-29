import { Spin, Layout, theme } from "antd";
import { React, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../../routes/routes";
import "./index.css";
const { Content } = Layout;

const AppContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Suspense fallback={<Spin />}>
      <Content
        className="layout-content"
        style={{
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Routes>
          {routes?.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Content>
    </Suspense>
  );
};

export default AppContent;
