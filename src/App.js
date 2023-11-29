import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";

// Containers
const AppLayout = React.lazy(() => import("./AppLayout"));

// Pages
const Login = React.lazy(() => import("./views/Auth/Login"));

const loading = (
  <>
    <Spin />
  </>
);
const App = () => {
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route path="*" name="Home" element={<AppLayout />} />
      </Routes>
    </Suspense>
  );
};

export default App;
