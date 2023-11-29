import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { Button, Form, Input, Spin, message } from "antd";

const CreateAccount = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (params?.id !== "create") fetchAccount();
  }, [params]);

  const fetchAccount = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/account/${params?.id}`);
      setAccount(response?.data?.account);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (values) => {
    setLoading(true);

    try {
      let response = await api.post(`/account/`, values);
      if (response?.status === 200) {
        message.success("Account created!");
        navigate(`/account`);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const editAccount = async (values) => {
    setLoading(true);
    try {
      let response = await api.put(`/account/${params?.id}`, values);
      if (response?.status === 200) {
        message.success("Account updated!");
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
          {account && (
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={params?.id !== "create" ? editAccount : createAccount}
              initialValues={account}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Account Name"
                rules={[
                  {
                    required: true,
                    message: "Please input Account name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="softwareType"
                label="Software Tyoe"
                rules={[
                  {
                    required: true,
                    message: "Please input Software Type!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="licenceStatus"
                label="Licence Status"
                rules={[
                  {
                    required: true,
                    message: "Please input license status!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="company"
                label="Company "
                rules={[
                  {
                    required: true,
                    message: "Please input company!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please input Country!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="contactName"
                label="Contact Name"
                rules={[
                  {
                    required: true,
                    message: "Please input Contact name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="maxUsers"
                label="Max Users"
                rules={[
                  {
                    required: true,
                    message: "Please input max users!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="usageCounter"
                label="Usage Counter"
                rules={[
                  {
                    required: true,
                    message: "Please input Usage Counter!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Please select status!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={() => navigate(`/account`)}>Cancel</Button>
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
          onFinish={params?.id !== "create" ? editAccount : createAccount}
          initialValues={account}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Account Name"
            rules={[
              {
                required: true,
                message: "Please input Account name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="softwareType"
            label="Software Tyoe"
            rules={[
              {
                required: true,
                message: "Please input Software Type!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="licenceStatus"
            label="Licence Status"
            rules={[
              {
                required: true,
                message: "Please input license status!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company "
            rules={[
              {
                required: true,
                message: "Please input company!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please input Country!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contactName"
            label="Contact Name"
            rules={[
              {
                required: true,
                message: "Please input Contact name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maxUsers"
            label="Max Users"
            rules={[
              {
                required: true,
                message: "Please input max users!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="usageCounter"
            label="Usage Counter"
            rules={[
              {
                required: true,
                message: "Please input Usage Counter!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button onClick={() => navigate(`/account`)}>Cancel</Button>
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

export default CreateAccount;
