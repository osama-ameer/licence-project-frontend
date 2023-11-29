import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { Button, Form, Input, Spin, message } from "antd";

const CreateLicense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (params?.id !== "create") fetchLicense();
  }, [params]);

  const fetchLicense = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/license/${params?.id}`);
      setLicense(response?.data?.license);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createLicense = async (values) => {
    setLoading(true);

    try {
      let response = await api.post(`/license/`, values);
      if (response?.status === 200) {
        message.success("License created!");
        navigate(`/license`);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const editLicense = async (values) => {
    setLoading(true);
    try {
      let response = await api.put(`/license/${params?.id}`, values);
      if (response?.status === 200) {
        message.success("License updated!");
        navigate(`/license`);
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
          {license && (
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={params?.id !== "create" ? editLicense : createLicense}
              initialValues={license}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="License Name"
                rules={[
                  {
                    required: true,
                    message: "Please input license name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="License Description"
                rules={[
                  {
                    required: true,
                    message: "Please input license description!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="cost"
                label="License Cost"
                rules={[
                  {
                    required: true,
                    message: "Please input license cost!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="durationType"
                label="Duration Type"
                rules={[
                  {
                    required: true,
                    message: "Please input duration type!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={() => navigate(`/license`)}>Cancel</Button>
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
          onFinish={params?.id !== "create" ? editLicense : createLicense}
          initialValues={license}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="License Name"
            rules={[
              {
                required: true,
                message: "Please input license name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="License Description"
            rules={[
              {
                required: true,
                message: "Please input license description!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="cost"
            label="License Cost"
            rules={[
              {
                required: true,
                message: "Please input license cost!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="durationType"
            label="Duration Type"
            rules={[
              {
                required: true,
                message: "Please input duration type!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button onClick={() => navigate(`/license`)}>Cancel</Button>
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

export default CreateLicense;
