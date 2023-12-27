import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { Button, DatePicker, Form, Input, Spin, message } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const CreateUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (params?.id !== "create") fetchUser();
  }, [params]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/users/${params?.id}`);
      setUser(response?.data?.user);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (values) => {
    setLoading(true);

    try {
      let response = await api.post(`/users/`, values);
      if (response?.status === 200) {
        message.success("User created!");
        navigate(`/users`);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (values) => {
    setLoading(true);
    try {
      let response = await api.put(`/users/${params?.id}`, values);
      if (response?.status === 200) {
        message.success("User updated!");
        navigate(`/account`);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const formItemLayout = {
    labelAlign: "left",
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Spin spinning={loading}>
      {params?.id !== "create" ? (
        <>
          {user && (
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={params?.id !== "create" ? editUser : createUser}
              initialValues={{
                ...user,
                // expiryDate: new Date(account?.expiryDate),
              }}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="User Name"
                rules={[
                  {
                    required: true,
                    message: "Please input User name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input email Type!",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Enter Password"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="account"
                label="Account Id "
                rules={[
                  {
                    required: true,
                    message: "Please input Account Id!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={() => navigate(`/users`)}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  {params?.id !== "create" ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      ) : (
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={params?.id !== "create" ? editUser : createUser}
          initialValues={user}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please input User name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input email Type!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Enter Password"
            rules={[
              {
                required: true,
                message: "Please input password!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="account"
            label="Account Id "
            rules={[
              {
                required: true,
                message: "Please input Account Id!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button onClick={() => navigate(`/users`)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "10px" }}
            >
              {params?.id !== "create" ? "Edit" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Spin>
  );
};

export default CreateUser;
