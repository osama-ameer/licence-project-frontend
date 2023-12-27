import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import PaymentSuccess from "./views/PaymentSuccess";

// Containers
const AppLayout = React.lazy(() => import("./AppLayout"));

// Pages
const Login = React.lazy(() => import("./views/Auth/Login"));
const Payment = React.lazy(() => import("./views/Payment"));
const loading = (
  <>
    <Spin />
  </>
);
const App = () => {
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/login" name="Login" element={<Login />} />
        <Route
          exact
          path="/payment"
          name="PaymentSuccess"
          element={<Payment />}
        />
        <Route
          exact
          path="/success"
          name="Payment"
          element={<PaymentSuccess />}
        />

        <Route path="*" name="Home" element={<AppLayout />} />
      </Routes>
    </Suspense>
  );
};

export default App;
