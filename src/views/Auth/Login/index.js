import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import "./index.css";
import { api } from "../../../services/api";
import { storeInLocalStorage } from "../../../services/localStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const editUser = async (values) => {
    try {
      let response = await api.put(`/users/${values?.id}`, values);
      if (response?.status === 200) {
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      navigate("/dashboard");

      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let loginCred = {
        email: values.email,
        password: values.password,
      };
      let response = await api.post(`/auth`, loginCred);
      storeInLocalStorage("isLoggedIn", true);
      storeInLocalStorage("user", response?.data?.user);
      storeInLocalStorage("token", response?.data?.token);

      let valuesForEdit = {
        lastUsedDate: new Date(),
        id: response?.data?.user?._id,
        usageCounter: response?.data?.user?.usageCounter + 1,
      };
      editUser(valuesForEdit);
    } catch (error) {
      console.log("Error", error.message);
      message.error("Incorrect email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="login-cont">
        <h2>Login</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email",

                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
export default Login;
